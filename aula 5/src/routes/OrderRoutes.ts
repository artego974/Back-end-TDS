import { Router } from "express";
import { OrderController } from "../controller/OrderController";

const router = Router();
const orderController = new OrderController();

router.post("/OrderRoutes", orderController.create);
router.get("/OrderRoutes", orderController.list);
router.get("/OrderRoutes/:id", orderController.show);
router.put("/OrderRoutes/:id", orderController.update);
router.delete("/OrderRoutes/:id", orderController.delete);

export default router;
