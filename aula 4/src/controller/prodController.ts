import { Request, Response } from 'express';
import { AppDataSource } from '../db/data-source';
import { Prod } from '../models/prod';

const prodRepository = AppDataSource.getRepository(Prod);

export class ProdController {
    // Listar todos os usuários
    async list(req: Request, res: Response) {
        const prods = await prodRepository.find();
        res.json(prods);
        return
    }

    // Criar novo usuário
    async create(req: Request, res: Response) {
        const { name, price, description } = req.body;

        const prod = prodRepository.create({ name, price, description });
        await prodRepository.save(prod);

        res.status(201).json(prod);
        return
    }

    // Buscar usuário por ID
    async show(req: Request, res: Response) {
        const { id } = req.params;

        const prod = await prodRepository.findOneBy({ id: Number(id) });

        if (!prod) {
             res.status(404).json({ message: 'Usuário não encontrado' });
             return
        }

         res.json(prod);
         return
    }

    // Atualizar usuário
    async update(req: Request, res: Response) {
        const { id } = req.params;
        const { name, price, description } = req.body;

        const prod = await prodRepository.findOneBy({ id: Number(id) });

        if (!prod) {
             res.status(404).json({ message: 'Usuário não encontrado' });
             return
        }

        prod.name = name;
        prod.price = price;
        prod.description = description;

        await prodRepository.save(prod);

        res.json(prod);
        return
    }

    // Deletar usuário
    async delete(req: Request, res: Response) {
        const { id } = req.params;

        const prod = await prodRepository.findOneBy({ id: Number(id) });

        if (!prod) {
             res.status(404).json({ message: 'Usuário não encontrado' });
             return
        }

        await prodRepository.remove(prod);

         res.status(204).send();
         return
    }
}