import express, {Request, Response, NextFunction} from 'express';
const app = express();
const jsonParser = express.json();

app
  .use(jsonParser)
  .use('/', (req:Request, res: Response, next: NextFunction) => {
    const stats = Math.round(Math.random() * 100);
    if (stats < 20) {
      res.status(400);
    }
    return res.json({ stats });
  })
  .listen(3020,  () => console.log('listening to stats service'));
