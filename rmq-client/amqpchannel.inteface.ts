import { Channel } from 'amqplib';
import { MsgType } from './amqpclient.interface';

export default IAMQPChannel;

interface IAMQPChannel {
    channel: Channel;
    publish(exchange: string, key: string, msg: string): false | undefined;
    subscribe(exchange: string, queue: string , key: string, callback: (msg:MsgType) => any): false | undefined;
}