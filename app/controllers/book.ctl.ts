import { NextFunction, Request, Response } from 'express'
import bookModule from '../../modules/book';

const list = (req: Request, res: Response, next: NextFunction) => {
    bookModule
        .list(req.query)
        .then(data => res.json(data))
        .catch(next);
}

const create = (req: Request, res: Response, next: NextFunction) => {
    if (!req.body) return res.sendStatus(400);

    bookModule
        .create(req.body)
        .then(data => res.json(data))
        .catch(next);
}


export default { list, create }