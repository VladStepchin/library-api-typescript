import express, { Application, Request, Response, NextFunction } from 'express'
import bodyParser from 'body-parser'
const app: Application = express();
const jsonParser = express.json();

const config = require('./settings/config');
import "./models"

config
.init('http://localhost:3010')
.then(() => require('./settings/db')(config.getData().mongo))
.then(() => {
    app
        .use(jsonParser)
        .use((bodyParser.urlencoded({ extended: false })))
        .use(bodyParser.json())
        .use(require('./app'))
        .use(errorHandler)
        .listen(config.getData().app.port, () => console.log("Сервер ожидает подключения..."));
})

function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
    console.log(err);
    res.status(err.statusCode).json({ message: err.message });
}