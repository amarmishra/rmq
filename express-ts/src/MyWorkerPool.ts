import path from 'path';
import WorkerPool from 'rmq-client/WorkerPool'
import { ExchangeQueueAndKey } from 'rmq-client/amqpclient.interface';
class MyWorkerPool extends WorkerPool {
    constructor(numThreads:number, workerFile:string, name:string, address:string, exchangeQueueAndKey:ExchangeQueueAndKey) {
        super(numThreads, workerFile, name, address, exchangeQueueAndKey);
    }
}

export default new MyWorkerPool(
    2,
    path.resolve(__dirname, 'MyWorker.js'),
    'express-ts',
    'amqp://rmq:5672',
    [
        {
            exchange: 'application-exchange',
            queue: 'myservice-events-queue',
            key: 'email.*',
        }
    ]
);
