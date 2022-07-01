import mongoose from "mongoose";

import userScheme from '../models/user'
const User = mongoose.model("User", userScheme);

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

const updateBooks = (id:any, books:any) => {

    console.log(books);
    console.log(id);

    return User.findByIdAndUpdate(id, { $set: { books } }, { new: true });
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