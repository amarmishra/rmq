import { EventEmitter } from "stream";
import { ExchangeQueueAndKey } from "./amqpclient.interface";
import {Worker, parentPort} from "worker_threads";
import path from 'path'
class WorkerPool extends EventEmitter{
    workers: Worker[]
    freeWorkers:Worker[]
    constructor(
        private numOfThreads:number,
        public workerFile:string,
        public serviceName:string,
        public ampqServer:string,
        public exchangeQueueAndKey: ExchangeQueueAndKey
    ){ 
        super()
        this.workers = [];
        this.freeWorkers =[];
    }

    start(){
        for(let i=0;i< this.numOfThreads;i++){
            this.addWorkers()
        }
    }

    private addWorkers(){
        const worker=new Worker(path.resolve(__dirname,this.workerFile),{
           workerData:{
            serviceName:this.serviceName,
            amqpServer:this.ampqServer,
            exchangeQueueAndKey: this.exchangeQueueAndKey
           }
        })

        worker.on('message',(result)=>{})

        worker.on('error',(err)=>{})

        //send message to workers to make connection to rmq-server
        worker.postMessage({ command:'initiate-connect'});

    }
    


}

export default WorkerPool