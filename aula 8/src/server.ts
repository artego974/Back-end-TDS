import express, { Application, Request, Response } from 'express';
import { AppDataSource } from './db/data-source';
import userRoutes from './routes/RoutesUser';
import productRoutes from './routes/RoutesProd';
import cors from "cors"
import path from 'path';

const app: Application = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(cors({
    // origin: ['http://localhost:3000', 'http://127.0.0.1:3000']
}));

// Routes
app.get('/', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, "../public/pages/login.html"));
    return;
});

AppDataSource.initialize()
    .then(() => {
        app.use(userRoutes);
        app.use( productRoutes);
        app.listen(3000, () => console.log('Server rodando na porta http://localhost:3000'));
    })
    .catch((error) => console.log(error));