import { Router } from "express";
import {
  criarProduto,
  listarprodutos,
  buscarProdutoPorId,
  atualizarProduto,
  deletarProduto
} from "../controllers/produtoController";

const router = Router();

router.post("/produto", criarProduto);
router.get("/produto", listarprodutos);
router.get("/produto/:id", buscarProdutoPorId);
router.put("/produto/:id", atualizarProduto);
router.delete("/produto/:id", deletarProduto);

export default router;
