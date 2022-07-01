import { NextFunction, Request, Response } from 'express'
import userModule from '../../modules/user';

const list = (req: Request, res: Response, next: NextFunction) => {
    userModule
        .list(req.query)
        .then(data => res.json(data))
        .catch(next);
};

const get = (req: Request, res: Response, next: NextFunction) => {
    userModule
        .get(req.params.id)
        .then(data => res.json(data))
        .catch(next);
};

const create = (req: Request, res: Response, next: NextFunction) => {
    if (!req.body) return res.sendStatus(400);

console.log(`Request body of create method ${JSON.stringify(req.body)}`);

    userModule
        .create(req.body)
        .then(data => res.json(data))
        .catch(next);
};

const remove = (req: Request, res: Response, next: NextFunction) => {
    userModule
        .remove(req.params.id)
        .then(data => res.json(data))
        .catch(next);
};

const update = (req: Request, res: Response, next: NextFunction) => {
    if (!req.body) return res.sendStatus(400);

    userModule
        .update(req.body)
        .then(data => res.json(data))
        .catch(next);
};

const updateBooks = (req: Request, res: Response, next: NextFunction) => {
    if (!req.body) return res.sendStatus(400);

debugger
console.log(req.body);
console.log(req.params.id);


    userModule
        .updateBooks(req.params.id, req.body.books)
        .then(data => res.json(data))
        .catch(next);
};

const booksList = (req: Request, res: Response, next: NextFunction) => {
    userModule
        .booksList(req.params.id)
        .then(data => res.json(data))
        .catch(next);
};

export default { list, get, create, remove, update, updateBooks, booksList }