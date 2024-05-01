"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const WorkerPool_1 = __importDefault(require("rmq-client/WorkerPool"));
class MyWorkerPool extends WorkerPool_1.default {
    constructor(numThreads, workerFile, name, address, exchangeQueueAndKey) {
        super(numThreads, workerFile, name, address, exchangeQueueAndKey);
    }
}
exports.default = new MyWorkerPool(2, path_1.default.resolve(__dirname, 'MyWorker.js'), 'express-ts', 'amqp://rmq:5672', [
    {
        exchange: 'application-exchange',
        queue: 'myservice-events-queue',
        key: 'email.*',
    }
]);
