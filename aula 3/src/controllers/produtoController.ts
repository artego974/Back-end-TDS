import { Request, Response } from "express";
import { Produto, produtos } from "../models/produto";

// Criar um novo usuário
export const criarProduto = (req: Request, res: Response): void => {
  const { id, nome, desc,preco } = req.body;

  if (!id || !nome || !desc || !preco) {
    res.status(400).json({ mensagem: "Dados incompletos. Forneça id, nome e email." });
    return;
  }

  const ProdutoExistente = produtos.find(u => u.id === id);
  if (ProdutoExistente) {
    res.status(409).json({ mensagem: "Usuário com este ID já existe." });
    return;
  }

  const novoProduto = new Produto(id, nome, desc,preco);
  produtos.push(novoProduto);
  res.status(201).json({ mensagem: "Usuário criado com sucesso!", Produto: novoProduto });
};

// Listar todos os usuários
export const listarprodutos = (_req: Request, res: Response): void => {
  res.status(200).json(produtos);
};

// Buscar um usuário por ID
export const buscarProdutoPorId = (req: Request, res: Response): void => {
  const id = Number(req.params.id);
  const Produto = produtos.find(u => u.id === id);

  if (!Produto) {
    res.status(404).json({ mensagem: "Usuário não encontrado" });
    return;
  }

  res.status(200).json(Produto);
};

// Atualizar um usuário
export const atualizarProduto = (req: Request, res: Response): void => {
  const id = Number(req.params.id);
  const { nome, desc } = req.body;
  const Produto = produtos.find(u => u.id === id);

  if (!Produto) {
    res.status(404).json({ mensagem: "Usuário não encontrado" });
    return;
  }

  if (nome) Produto.nome = nome;
  if (desc) Produto.desc = desc;

  res.status(200).json({ mensagem: "Usuário atualizado com sucesso!", Produto });
};

// Deletar um usuário
export const deletarProduto = (req: Request, res: Response): void => {
  const id = Number(req.params.id);
  const index = produtos.findIndex(u => u.id === id);

  if (index === -1) {
    res.status(404).json({ mensagem: "Usuário não encontrado" });
    return;
  }

  produtos.splice(index, 1);
  res.status(200).json({ mensagem: "Usuário deletado com sucesso!" });
};
