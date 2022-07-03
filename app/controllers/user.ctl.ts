import { model } from 'mongoose'
import { NextFunction, Request, Response } from 'express'
import { IUser } from '../../models/user'
import { IBook } from '../../models/book'
import HttpError from "../../modules/utils"

import UserService from '../../services/UserService';
import Repository from '../../core/Repository';
import StatConnector from '../../connectors/StatConnector'

const config = require('../../settings/config');
const Book = model<IBook>("Book");
const User = model<IUser>("User");

const userService = new UserService(new Repository(User), new Repository(Book), new StatConnector(config.getData().services.stats));

const list = (req: Request, res: Response, next: NextFunction) => {
    return userService
        .list(req.query)
        .then((data: Array<IUser>) => { return res.json(data) })
        .catch(next);
};

const get = (req: Request, res: Response, next: NextFunction) => {
   return userService
        .get(req.params.id)
        .then((data: IUser | null) => {res.json(data)}) //type null is not assignable to type User
        .catch(next);
};

const create = (req: Request, res: Response, next: NextFunction) => {
    console.log(req);
    if (req.body && !req.body.name) {
        return next(new HttpError('Invalid body'));
      }

    return userService
        .create(req.body)
        .then((data: IUser) => { return res.json(data) })
        .catch(next);
};

const remove = (req: Request, res: Response, next: NextFunction) => {
    return userService
        .delete(req.params.id)
        .then((data: IUser | null) => {res.json(data)}) 
        .catch(next);
};

const update = (req: Request, res: Response, next: NextFunction) => {
    if (!req.body) {
        return next(new HttpError('Invalid body'));
      }

    return userService
        .update(req.body.id, req.body)
        .then((data: IUser | null) => {res.json(data)}) 
        .catch(next);
};

//does not work
const updateBooks = (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body);
    if (!req.body) {
        return next(new HttpError('Invalid body'));
      }

    return userService
        .updateBooks(req.params.id, req.body.books)
        .then((data: IUser | null) => {res.json(data)}) 
        .catch(next);
};

const booksList = (req: Request, res: Response, next: NextFunction) => {
    return userService
        .bookList(req.params.id)
        .then((data: IUser | null) => {res.json(data)}) 
        .catch(next);
};

export default { list, get, create, remove, update, updateBooks, booksList }