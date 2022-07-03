import { Model } from "mongoose";
import { IBook } from '../models/book'
import Repository from '../core/Repository'

class BookService {

    public repository: Repository<IBook>;

    constructor(repository: Repository<IBook>) {
      this.repository = repository;
    }
  
    list(query: any) {
      return this.repository.list(query);
    }
  
    create(params: Model<IBook>) {
      return this.repository.create(params);
    }
  }
  
  export default BookService;
  