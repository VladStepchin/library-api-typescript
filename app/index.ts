import express from 'express';
import router from './routes'

const app = express();

app.use('/', router); // change to import

module.exports = app;