import express from "express";

const router = express.Router();

import userCtl from '../controllers/user.ctl';
import bookCtl from '../controllers/book.ctl';

router
    .route('/users')
    .get(userCtl.list)
    .post(userCtl.create)
    .put(userCtl.update);

router
    .route('/users/:id')
    .get(userCtl.get)
    .delete(userCtl.remove);

router
    .route('/users/:id/books')
    .post(userCtl.updateBooks)
    .get(userCtl.booksList);

router
    .route('/books')
    .get(bookCtl.list)
    .post(bookCtl.create);

export default router