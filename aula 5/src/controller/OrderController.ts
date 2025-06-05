import { Request, Response } from 'express';
import { AppDataSource } from '../database/data-source';
import { Order } from '../models/Order';

const userRepository = AppDataSource.getRepository(Order);

export class OrderController {
    // Listar todos os usuários
    async list(req: Request, res: Response) {
        const users = await userRepository.find();
        res.json(users);
        return
    }

    // Criar novo usuário
    async create(req: Request, res: Response) {
        const { status } = req.body;

        const user = userRepository.create({ status });
        await userRepository.save(user);

        res.status(201).json(user);
        return
    }

    // Buscar usuário por ID
    async show(req: Request, res: Response) {
        const { id } = req.params;

        const user = await userRepository.findOneBy({ id: Number(id) });

        if (!user) {
             res.status(404).json({ message: 'Usuário não encontrado' });
             return
        }

         res.json(user);
         return
    }

    // Atualizar usuário
    async update(req: Request, res: Response) {
        const { id } = req.params;
        const { status } = req.body;

        const user = await userRepository.findOneBy({ id: Number(id) });

        if (!user) {
             res.status(404).json({ message: 'Usuário não encontrado' });
             return
        }

        user.status;

        await userRepository.save(user);

        res.json(user);
        return
    }

    // Deletar usuário
    async delete(req: Request, res: Response) {
        const { id } = req.params;

        const user = await userRepository.findOneBy({ id: Number(id) });

        if (!user) {
             res.status(404).json({ message: 'Usuário não encontrado' });
             return
        }

        await userRepository.remove(user);

         res.status(204).send();
         return
    }
}