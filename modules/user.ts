import { model } from "mongoose";
import { IBook } from '../models/book'
import { IUser } from '../models/user'

const Book = model<IBook>("Book");
const User = model<IUser>("Book");
const got = require("got");

const config = require('../settings/config');

const list = (query: any) => {
    return User
        .find(filterQuery(query))
        .exec();
};

const get = (id: string) => {
    return User
        .findById(id)
        .exec();
};

const create = ({ name, age }:{name:string, age:number}) => {
    return new User({ name, age }).save();
};

const remove = (id: string) => {
    return User.findByIdAndDelete(id);
};

const update = ({ id, name, age }:{id: any, name:any, age:number}) => {
    const newUser = { age, name };
    return User.findByIdAndUpdate(id, { $set: newUser }, { new: true });
};


// ask for a help
const updateBooks = async (id: string, books: Array<IBook>) => {
    debugger
    const { stats }: {stats: number} = await got.get(config.getData().services.stats).json();
    return User
      .findById(id)
      .populate('books')
      .exec()
      .then((user: any) => {
        const { books: oldBooks }:{books: any} = user;
        const booksSet = new Set(books);
        const returned = oldBooks.filter((item:any) => !booksSet.has(item._id.toString()));
        return Promise
          .all(returned.map((_:any) => Object.assign(_, { usage_count: _.usage_count + 1 }).save()))
          .then(() => Object.assign(user, { books, rate: user.rate + stats }).save());
      });
};

const booksList = (id: string) => {
    return User
        .findById(id).populate('books')
        .exec();
};

function filterQuery(query: any) {
    return query;
}

export default { list, get, create, remove, update, updateBooks, booksList }