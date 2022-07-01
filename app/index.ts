import express from 'express';

const app = express();

app.use('/', require('./routes')); // change to import

export default app;
