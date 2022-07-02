import mongoose from "mongoose";
import userScheme from '../models/user'

const got = require("got");
const User = mongoose.model("User", userScheme);
const config = require('../settings/config');

const list = (query: any) => {
    return User
        .find(filterQuery(query))
        .exec();
};

const get = (id: any) => {
    return User
        .findById(id)
        .exec();
};

const create = ({ name, age }:{name:any, age:any}) => {
    return new User({ name, age }).save();
};

const remove = (id: any) => {
    return User.findByIdAndDelete(id);
};

const update = ({ id, name, age }:{id: any, name:any, age:any}) => {
    const newUser = { age, name };
    return User.findByIdAndUpdate(id, { $set: newUser }, { new: true });
};

const updateBooks = async (id: any, books: any) => {
    const { stats } = await got.get(config.getData().services.stats).json();
    return User
      .findById(id)
      .populate('books')
      .exec()
      .then((user: any ) => {
        const { books: oldBooks } = user;
        const booksSet = new Set(books);
        const returned = oldBooks.filter((item: any) => !booksSet.has(item._id.toString()));
        return Promise
          .all(returned.map((_:any) => Object.assign(_, { usage_count: _.usage_count + 1 }).save()))
          .then(() => Object.assign(user, { books, rate: user.rate + stats }).save());
      });
};

const booksList = (id:any) => {
    return User
        .findById(id)
        .populate('books')
        .exec();
};

function filterQuery(query: any) {
    return query;
}

export default { list, get, create, remove, update, updateBooks, booksList }