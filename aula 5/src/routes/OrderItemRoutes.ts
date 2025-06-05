import { Router } from "express";
import { OrderItemController } from "../controller/OrderItemController";

const router = Router();
const orderItem = new OrderItemController();

router.post("/OrderItem", orderItem.add);
router.delete("/OrderItem/:id", orderItem.delete);
router.get("/OrderItem/:id", orderItem.listByOrder)

export default router;
