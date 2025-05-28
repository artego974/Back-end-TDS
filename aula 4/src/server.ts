import express, { Application } from 'express';
import { AppDataSource } from './db/data-source';
import routes from './routes/prod.routes';

AppDataSource.initialize()
    .then(() => {
        const app: Application = express();
        app.use(express.json());

        app.use('/api', routes);

        app.listen(3000, () => console.log('Server rodando na porta 3000'));
    })
    .catch((error) => console.log(error));