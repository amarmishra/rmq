import BaseDBClass from "./db.service";
import { Model } from "mongoose";
import PostModel, { IPost } from "../models/post.model";
class PostService extends BaseDBClass{
    constructor(){
        super(PostModel);
    }
}

export default new PostService()