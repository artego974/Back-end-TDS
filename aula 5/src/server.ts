import express, { Application } from 'express';
import { AppDataSource } from './database/data-source';
import OrderItensroutes from './routes/OrderItemRoutes';
import OrderRoutes from './routes/OrderRoutes';

AppDataSource.initialize()
    .then(() => {
        const app: Application = express();
        app.use(express.json());

        app.use('/api', OrderItensroutes);
        app.use('/api', OrderRoutes)

        app.listen(3000, () => console.log('Server rodando na porta 3000'));
    })
    .catch((error) => console.log(error));