import { Document,model, Schema } from "mongoose";
import {IPost} from '@/models/post.model'
export interface IUser extends Document{
    name: string,
    password: string,
    description: string,
    getFriendsList():IUser[];
    getSelfPosts():IPost[];
    friendsPost():IPost[];
    relatedPost():IPost[]
}