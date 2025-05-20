import express from "express";
import usuarioRoutes from "./routes/usuarioRoutes";

const app = express();
app.use(express.json());
app.use("/api", usuarioRoutes);

app.listen(3000, () => console.log("🚀 Servidor rodando na porta 3000!"));