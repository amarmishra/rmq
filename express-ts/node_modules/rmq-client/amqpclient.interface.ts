import IAMQPChannel from "./amqpchannel.inteface"
import { Connection, ConsumeMessage } from "amqplib"

export type ExchangeQueueAndKey ={
    exchange: string;
    queue: string;
    key: string;
}[];

export type MsgType = {
    content: unknown;
    fields?: {
        routingKey?: unknown;
        exchange?: unknown;
    };
};

export default interface IRmqClient{
    name: string
    cluster: string
    connection: Connection | null
    channel:IAMQPChannel | null
    exchangeQueueAndKey: ExchangeQueueAndKey | []
    retry: boolean
    init(): Promise<void>;
    subscribe(exchange: string, queue: string, key: string, callback: (msg:MsgType) => any): Promise<void>;
    publish(exchange: string, key: string, msg: string):Promise<void>;
    reconnect():Promise<void>;
}