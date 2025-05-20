import { Request, Response } from "express";
import { Usuario, usuarios } from "../models/usuario";

// Criar um novo usuário
export const criarUsuario = (req: Request, res: Response): void => {
  const { id, nome, email } = req.body;

  if (!id || !nome || !email) {
    res.status(400).json({ mensagem: "Dados incompletos. Forneça id, nome e email." });
    return;
  }

  const usuarioExistente = usuarios.find(u => u.id === id);
  if (usuarioExistente) {
    res.status(409).json({ mensagem: "Usuário com este ID já existe." });
    return;
  }

  const novoUsuario = new Usuario(id, nome, email);
  usuarios.push(novoUsuario);
  res.status(201).json({ mensagem: "Usuário criado com sucesso!", usuario: novoUsuario });
};

// Listar todos os usuários
export const listarUsuarios = (_req: Request, res: Response): void => {
  res.status(200).json(usuarios);
};

// Buscar um usuário por ID
export const buscarUsuarioPorId = (req: Request, res: Response): void => {
  const id = Number(req.params.id);
  const usuario = usuarios.find(u => u.id === id);

  if (!usuario) {
    res.status(404).json({ mensagem: "Usuário não encontrado" });
    return;
  }

  res.status(200).json(usuario);
};

// Atualizar um usuário
export const atualizarUsuario = (req: Request, res: Response): void => {
  const id = Number(req.params.id);
  const { nome, email } = req.body;
  const usuario = usuarios.find(u => u.id === id);

  if (!usuario) {
    res.status(404).json({ mensagem: "Usuário não encontrado" });
    return;
  }

  if (nome) usuario.nome = nome;
  if (email) usuario.email = email;

  res.status(200).json({ mensagem: "Usuário atualizado com sucesso!", usuario });
};

// Deletar um usuário
export const deletarUsuario = (req: Request, res: Response): void => {
  const id = Number(req.params.id);
  const index = usuarios.findIndex(u => u.id === id);

  if (index === -1) {
    res.status(404).json({ mensagem: "Usuário não encontrado" });
    return;
  }

  usuarios.splice(index, 1);
  res.status(200).json({ mensagem: "Usuário deletado com sucesso!" });
};
