import express, { Application, Request, Response } from 'express'
import bodyParser from 'body-parser'
import mongoose from "mongoose"
import dotenv from "dotenv"
import routes from "./app/routes"
import DbConnection from "./settings/DbConnection"

const app: Application = express();
const jsonParser = express.json();

const mongodb = DbConnection.getInstance()

const connectionString: string|undefined = dotenv.config().parsed?.DB_CONNECTION

// import "./models"

app
.use(jsonParser)
.use(bodyParser.urlencoded({ extended: true }))
.use('/', routes);

try {
    mongodb.connect(mongoose, connectionString).then(() => {
        app.listen(dotenv.config().parsed?.PORT,
            () => console.log("Server has been listening on port " + dotenv.config().parsed?.PORT));
    })
}
catch (e: any) {
    throw new Error(e)
}  