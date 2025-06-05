import { Request, Response } from "express";
import { AppDataSource } from "../database/data-source";
import { OrderItem } from "../models/OrderItem";
import { Order } from "../models/Order";
import { Dish } from "../models/Dish";

const userRepository = AppDataSource.getRepository(Order);
const dishRepository = AppDataSource.getRepository(Dish);

export class OrderItemController {

    async add(req: Request, res: Response) {
        const { quantity } = req.body;

        if (!quantity) {
             res.status(404).json({ message: "Order or Dish not found" });
             return;
        }

        const orderItem = new OrderItem(quantity);

        await AppDataSource.getRepository(OrderItem).save(orderItem);

        res.status(201).json(orderItem);
    }

    async listByOrder(req: Request, res: Response) {
        const { orderId } = req.params;
        const items = await AppDataSource.getRepository(OrderItem).find({
            where: { order: { id: +orderId } },
            relations: ["dish"],
        });
        res.json(items);
    }

    async delete(req: Request, res: Response) {
        const { id } = req.params;
        const items = await userRepository.findOneBy({ id: Number(id) });

        if (!items) {
            res.status(404).json({ message: 'Usuário não encontrado' });
            return
        }
        await userRepository.remove(items);

        res.status(204).send();
        return
    }
}
