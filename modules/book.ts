import { model } from "mongoose";

import { IBook } from '../models/book'

const Book = model<IBook>("Book");

const list = (query: any) => {
    return Book
        .find(query)
        .exec();
}

const create = ({ title }: {title: any}) => {
    return new Book({ title }).save();
}

export default {list, create}