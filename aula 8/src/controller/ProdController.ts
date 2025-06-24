import { Request, Response } from 'express';
import { AppDataSource } from '../db/data-source';
import { Prod } from '../models/Prod';

const prodRepository = AppDataSource.getRepository(Prod);

export class prodController {

    // Listar todos os produtos
    async list(req: Request, res: Response) {
        const prods = await prodRepository.find();
        res.json(prods);
        return
    }

    // Criar novo produto
    async create(req: Request, res: Response) {
        const { name, preco, qtnd} = req.body;

        if(!name || !preco || !qtnd) {
            res.status(400).json({ message: "Todos os campos são necessários!" })
            return
        }

        const prod = new Prod(name, preco, qtnd)
        const newprod = await prodRepository.create(prod)
        await prodRepository.save(newprod)

        res.status(201).json({ message: "produto criado com sucesso", prod: newprod })
        return

    }

    // Buscar produto por ID
    async show(req: Request, res: Response) {
        const { id } = req.params;

        const prod = await prodRepository.findOneBy({ id: Number(id) });

        if (!prod) {
             res.status(404).json({ message: 'produto não encontrado' });
             return
        }

         res.json(prod);
         return
    }

    // Atualizar produto
    async update(req: Request, res: Response) {
        const { id } = req.params;
        const { name, preco, qtnd } = req.body;

        const prod = await prodRepository.findOneBy({ id: Number(id) });

        if (!prod) {
             res.status(404).json({ message: 'produto não encontrado' });
             return
        }

        prod.name = name;
        prod.preco = preco;
        prod.qtnd = qtnd;

        await prodRepository.save(prod);

        res.json(prod);
        return
    }

    // Deletar produto
    async delete(req: Request, res: Response) {
        const { id } = req.params;

        const prod = await prodRepository.findOneBy({ id: Number(id) });

        if (!prod) {
             res.status(404).json({ message: 'produto não encontrado' });
             return
        }

        await prodRepository.remove(prod);

         res.status(204).send();
         return
    }
}