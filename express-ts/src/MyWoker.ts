import Worker from 'rmq-client/Worker';
import { MsgType } from 'rmq-client/amqpclient.interface';
class MyWorker extends Worker {

    async notify(msg:MsgType) {
        console.log(`Received ${msg.fields?.routingKey}`);
        try {
            return super.notify(msg);
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = new MyWorker();