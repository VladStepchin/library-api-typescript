import mongoose from "mongoose";

import bookScheme from '../models/book'
const Book = mongoose.model("Book",bookScheme);

const list = (query: any) => {
    return Book
        .find(query)
        .exec();
}

const create = ({ title }: {title: any}) => {
    return new Book({ title }).save();
}

export default {list, create}