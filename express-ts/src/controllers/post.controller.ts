import Controller from "../utils/controller.interface";
import HttpError from "../utils/error/error.interface";
import { Router,Request,Response,NextFunction } from "express";
import PostService from "../service/post.service";
class PostController implements Controller{
    path= '/posts';
    router= Router();

    constructor(){
        this.initiateRoutes()
    }

    private initiateRoutes(){
        this.router.post(this.path,this.create);
    }

    private async create(req:Request,res:Response,next:NextFunction):Promise<Response| void>{
        try{
            const {title,description}=req.body;
            const post=await PostService.create({title,description})
        }
        catch(err){
            next(new HttpError(500, 'Erro while creating post'));
        }
        
    }
}

export default PostController