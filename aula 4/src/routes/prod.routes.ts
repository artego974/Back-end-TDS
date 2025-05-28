import { Router } from 'express';
import {ProdController} from '../controller/prodController';

const routes = Router();
const prodController = new ProdController();

routes.get('/prod', prodController.list);
routes.post('/prod', prodController.create);
routes.get('/prod/:id', prodController.show);
routes.put('/prod/:id', prodController.update);
routes.delete('/prod/:id', prodController.delete);

export default routes;