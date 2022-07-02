import { Application, Request, Response, NextFunction } from 'express'
import express from 'express'

const app: Application = express();
const jsonParser = express.json();

app
    .use(jsonParser)
    .use('/', (req: Request, res: Response, next: NextFunction) => res.json({
        app: { port: 3000 },
        services: { stats: 'http://localhost:3020' },
        mongo: {
            uri: 'mongodb://localhost:27017/testService',
            options: {
                useUnifiedTopology: true,
                useNewUrlParser: true,
            },
        }
    }))
    .listen(3010, () => console.log('listening to config srvice'));