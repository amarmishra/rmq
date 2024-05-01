import { Channel } from "amqplib";
import IAMQPChannel from "./amqpchannel.inteface";
import { MsgType } from "./amqpclient.interface";
class AMQPChannel implements IAMQPChannel {

    constructor(public channel: Channel) { }


    /**
     *
     * Send a message to a fanout Exchange
     *
     * @param {*} exchange
     * @param {*} queue
     * @param {*} msg
     * @returns
     */
    publish(exchange: string, key: string, msg: string): false | undefined {
        if (!this.channel || exchange.length === 0) {
            return false;
        }

        this.channel.assertExchange(exchange, 'topic', {
            durable: true,
        });

        this.channel.publish(exchange, key, Buffer.from(msg), {
            persistent: true,
        });
    }

    subscribe(exchange: string, queue: string, key: string, callback: (msg: MsgType) => any): false | undefined {
        if (!this.channel || exchange.length === 0 || queue.length === 0) {
            return false;
        }

        this.channel.assertExchange(exchange, 'topic', {
            durable: true,
        });

        this.channel.assertQueue(queue, {
            durable: true,
        });

        this.channel.prefetch(1);
        this.channel.bindQueue(queue, exchange, key);

        this.channel.consume(
            queue,
            async (msg) => {
                if (msg) {
                    const res = await callback(msg)
                    this.channel.ack(msg);
                }
            },
            {
                noAck: false,
            }
        );
    }
}



export default AMQPChannel