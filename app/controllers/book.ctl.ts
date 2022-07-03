import { NextFunction, Request, Response } from 'express'
import { IBook} from '../../models/book'
import bookModule from '../../modules/book';
import HttpError from "../../modules/utils"

const list = (req: Request, res: Response, next: NextFunction) => {
    bookModule
        .list(req.query)
        .then((data: Array<IBook>) => { return res.json(data) })
        .catch(next);
}

const create = (req: Request, res: Response, next: NextFunction) => {
    if (req.body && !req.body.title) {
        return next(new HttpError('Invalid body'));
    }

    bookModule
        .create(req.body)
        .then((data: IBook) => { return res.json(data) })
        .catch(next);
}


export default { list, create }