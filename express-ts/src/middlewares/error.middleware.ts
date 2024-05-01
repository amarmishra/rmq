import {Request,Response,NextFunction} from 'express'
import HttpError from '../utils/error/error.interface'
export default function ErrorHandler<T= any>(error: T ,req:Request,res:Response,next:NextFunction){
    if(error instanceof HttpError){
        return res.status(error.status).json({message:error.message})
    }
    return res.status(500).json({message:'Some error occured'})
}