import express,{Application} from 'express'
import IApp from './app.interface'
import ErrorHandler from './middlewares/error.middleware';
import Controller from './utils/controller.interface'
import mongoose from 'mongoose';
export default class App implements IApp{
    private app:Application
    constructor(controllers: Controller[],private port:number){
        this.app=express();
        this.connectDb();
        this.setUpMiddleWares();
        this.intializeRoutes(controllers);
        this.setErrorHandler();
    }
    private async connectDb(): Promise<void> {
        mongoose.connect(`mongodb+srv://amarm130:meomanooz123@mongodb-cluster.6dxqaqj.mongodb.net/`)
    }
    private setUpMiddleWares(): void {
        this.app.use(express.json())
    }
    private intializeRoutes(controllers: Controller[]): void {
        controllers.forEach((controller)=>{
            this.app.use('/api',controller.router)
        })
    }
    private setErrorHandler(): void {
        this.app.use(ErrorHandler);
    }
    listen(){
        this.app.listen(this.port,()=>{
            console.log(`App listening on port ${this.port}`);
        });
    }
    
}