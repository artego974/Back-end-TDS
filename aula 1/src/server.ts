import express, { Application, Request, Response } from 'express';

const app: Application = express();  // Tipando 'app' como 'Application'
const PORT: number = 3000;  // Tipagem da porta como número

// Middleware para permitir que o Express interprete JSON
app.use(express.json());

// Rota GET para a raiz
app.get('/', (req: Request, res: Response): void => {
  res.send(`<h1> Arthur na rota ${PORT}</h1>`);
});
app.get('/nome', (req: Request, res: Response): void => {
  res.send(`<h1> Arthur na rota nome ${PORT}</h1>`);
});

// Iniciando o servidor
app.listen(PORT, (): void => {
  console.log(`Arthur na rota ${PORT}`);
});