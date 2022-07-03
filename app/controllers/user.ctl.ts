import { NextFunction, Request, Response } from 'express'
import { IUser } from '../../models/user'

import userModule from '../../modules/user';
import HttpError from "../../modules/utils"

const list = (req: Request, res: Response, next: NextFunction) => {
    userModule
        .list(req.query)
        .then((data: Array<IUser>) => { return res.json(data) })
        .catch(next);
};

const get = (req: Request, res: Response, next: NextFunction) => {
   return userModule
        .get(req.params.id)
        .then((data: IUser | null) => {res.json(data)}) //type null is not assignable to type User
        .catch(next);
};

const create = (req: Request, res: Response, next: NextFunction) => {
    if (req.body && !req.body.name) {
        return next(new HttpError('Invalid body'));
      }

    return userModule
        .create(req.body)
        .then((data: IUser) => { return res.json(data) })
        .catch(next);
};

const remove = (req: Request, res: Response, next: NextFunction) => {
    return userModule
        .remove(req.params.id)
        .then((data: IUser | null) => {res.json(data)}) 
        .catch(next);
};

const update = (req: Request, res: Response, next: NextFunction) => {
    if (!req.body) {
        return next(new HttpError('Invalid body'));
      }

    return userModule
        .update(req.body)
        .then((data: IUser | null) => {res.json(data)}) 
        .catch(next);
};

const updateBooks = (req: Request, res: Response, next: NextFunction) => {
    if (!req.body) {
        return next(new HttpError('Invalid body'));
      }

    return userModule
        .updateBooks(req.params.id, req.body.books)
        .then((data: IUser | null) => {res.json(data)}) 
        .catch(next);
};

const booksList = (req: Request, res: Response, next: NextFunction) => {
    return userModule
        .booksList(req.params.id)
        .then((data: IUser | null) => {res.json(data)}) 
        .catch(next);
};

export default { list, get, create, remove, update, updateBooks, booksList }