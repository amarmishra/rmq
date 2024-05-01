import amqp,{ Channel, Connection, ConsumeMessage } from "amqplib";
import IAMQPChannel from "./amqpchannel.inteface";
import IRmqClient, { ExchangeQueueAndKey, MsgType } from "./amqpclient.interface";
import { log } from "console";
import AMQPChannel from "./amqpchannel";

class RmqClient implements IRmqClient{
    connection: amqp.Connection | null;
    channel: IAMQPChannel | null;
    constructor(public name:string,public cluster:string, public exchangeQueueAndKey:ExchangeQueueAndKey,public  retry = true) {
        this.connection = null;
        this.channel = null;
    }
    async init() : Promise<void>{
        await this.connect(); //connection initilized
        this.channel = await this.getChannel();
        /**
         * Add bindings
         */
        for (const exchangeQueueAndKey of this.exchangeQueueAndKey) {
            await this.subscribe(
                exchangeQueueAndKey.exchange,
                exchangeQueueAndKey.queue, 
                exchangeQueueAndKey.key,
                (msg) => {
                     this.notify(msg);
                }
            );
        }
    };

    private connect = async () => {
        return new Promise((resolve, reject) => {
            if (!this.connection) {
                amqp.connect(this.cluster, (err:unknown, connection:Connection) => {
                    if (err) {
                        return reject(err);
                    }
                    connection.on('error', (err) => {
                        if ('message' in err && err.message !== 'Connection closing') {
                            throw new Error(`Error connecting ${err.message}`);
                        }
                    });
                    connection.on('close', () => {
                        log(`${this.name} closed`);
                        this.reconnect();
                    });
                    connection.on('blocked', () => {
                        log(`${this.name} blocked`);
                        this.reconnect();
                    });
                    connection.on('unblocked', () => {
                       log(`${this.name} unblocked`);
                        this.reconnect();
                    });
                    this.connection = connection;
                    resolve(true);
                });
            } else return resolve(true);
        });
    };

    private async getChannel(): Promise<any> {
            return new Promise(async (resolve, reject) => {
                if (!this.connection) {
                    return reject(false);
                }
                const channel=await this.connection.createChannel();
                try {
                    resolve(new AMQPChannel(channel))
                } catch (error) {
                    reject(false)
                }
            }); 
    }

    async subscribe(exchange: string, queue: string, key: string, callback: (msg:MsgType) => any) : Promise<void>{
        if(this.channel){
            this.channel?.subscribe(exchange,queue,key,callback)
        }
        
    };
    async publish(exchange: string, key: string, msg: string): Promise<void>{
        if(this.channel){
            this.channel?.publish(exchange,key,msg)
        }
    };
   
    reconnect = async () => {
        if (this.connection) {
            try {
                this.connection.close()
                this.init()
            } catch (error) {
                log(`Error closing connection...`);
            }
        } else {
            this.init();
        }
    };
    protected async notify(msg:MsgType): Promise<boolean | undefined> {
        log(
            `Message Acknowldgement => Routing Key : ${msg.fields?.routingKey} | Exchange : ${msg.fields?.exchange}`
        );
        return true;
    }
    
}

export default RmqClient