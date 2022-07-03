import { model } from 'mongoose'
import { NextFunction, Request, Response } from 'express'
import { IBook} from '../../models/book'
import HttpError from "../../modules/utils"
import BookService  from '../../services/BookService';
import Repository from '../../core/Repository';

// import bookModule from '../../modules/book';

const Book = model<IBook>("Book");
const bookService = new BookService(new Repository(Book));

const list = (req: Request, res: Response, next: NextFunction) => {
    bookService
        .list(req.query)
        .then((data: Array<IBook>) => { return res.json(data) })
        .catch(next);
}

const create = (req: Request, res: Response, next: NextFunction) => {
    if (req.body && !req.body.title) {
        return next(new HttpError('Invalid body'));
    }

    bookService
        .create(req.body)
        .then((data: IBook) => { return res.json(data) })
        .catch(next);
}


export default { list, create }