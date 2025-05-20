import express from "express";
import produtoRoutes from "./routes/produtoRoutes";

const app = express();
app.use(express.json());
app.use("/api", produtoRoutes);

app.listen(3000, () => console.log("🚀 Servidor rodando na porta 3000!"));