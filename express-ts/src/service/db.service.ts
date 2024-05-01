import { Types,Model } from "mongoose";

type ID= Types.ObjectId | string
export default class BaseDBClass {
    constructor(protected model:any){}

    async get(id:ID) {
        try {
            return this.model.findOne({_id: id}).lean();
        } catch (error) {
            throw new Error('Error while finding document')
        }
      
    }

    async getAll() {
        try{
            return this.model.find();
        }
        catch(err){
            throw new Error('Error while finding documents')
        }
    }

    async create(body:object) {
        try{
            return this.model.create(body);
        }
        catch(err){
            throw new Error('Error while finding documents')
        }
    }
  
    async update(id: ID, update: object) {
      return this.model.updateOne({_id: id}, { $set: update }).exec();
    }

    async destroy(id:ID){
        return this.model.findByIdAndDelete({$where:{_id:id}});
    }
  }
