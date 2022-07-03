import { Model } from "mongoose";

class Repository<T> {
    public Model: Model<T>;

    constructor(Model: Model<T>) {
      this.Model = Model;
    }
  
    list(query: any) {
      return this.Model.find(query).exec();
    }
  
    create(params: Model<T>) {
      return new this.Model(params).save();
    }
  
    get(id: string, populate = '') {
      return this.Model.findById(id).populate(populate).exec();
    }
  
    delete(id: string) {
      return this.Model.findByIdAndDelete(id);
    }
  
    update(id:string, data: any) {
      return this.Model.findByIdAndUpdate(id, { $set: data }, { new: true });
    }
  }
  
  export default Repository
  