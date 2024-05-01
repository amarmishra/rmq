import RmqClient from "./amqpclient";

import { workerData,parentPort,threadId } from "worker_threads";

class Worker extends RmqClient{
    constructor(
        public parent=parentPort,
        public self=threadId
    ){
        super(workerData.name,workerData.address,workerData.exchangeQueueAndKey)
        this.connectToRmq()
    }

    public async send(exchange:string,key:string,message:string){
        super.publish(exchange,key,message);
    }

    private connectToRmq(){
        this.parent?.on('message',(task)=>{
            if(task.command==='initiate-connect')super.init();
        })
    }

}

export default Worker