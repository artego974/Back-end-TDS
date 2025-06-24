import { Router } from 'express';
import {prodController} from '../controller/ProdController';

const routes = Router();
const userController = new prodController();

routes.get('/prod', userController.list);
routes.post('/prod', userController.create);
routes.get('/prod/:id', userController.show);
routes.put('/prod/:id', userController.update);
routes.delete('/prod/:id', userController.delete);

export default routes;