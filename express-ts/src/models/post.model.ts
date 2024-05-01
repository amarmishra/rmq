import { Document,model, Schema } from "mongoose";

export interface IPost extends Document{
    title: string,
    author: string,
    description: string,
}

const PostSchema= new Schema({
    title:{
        type: String,
        required: true
    },
    author:{
        model: [{
            type: Schema.Types.ObjectId,
            ref: 'User'
        }]
    },
    description:{
        type: String,
        required: true
    },
})

export default model<IPost>('Post',PostSchema)