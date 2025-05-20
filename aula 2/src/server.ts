import express, { Application, NextFunction, Request, Response } from 'express';

const app: Application = express();
const PORT: number = 4000;

app.use(express.json());

// 🔸 Middleware
const porteiroMiddleware = (req: Request, res: Response, next: Function) => {
  console.log(`Requisição recebida em: ${req.method} ${req.url}`);
  next(); 
};

app.use(porteiroMiddleware);

const dataLog = (req:Request, res:Response, next:NextFunction)=>{
  let data: Date = new Date();
  console.log(`requisição feita com ${data}`)
  next();
}
app.use(dataLog);
// 🔹 Rota GET (Buscar dados)
app.get('/usuarios', (req: Request, res: Response): void => {
  res.status(200).json({ mensagem: 'Lista de usuários' });
});

// 🔹 Rota POST (Criar novo usuário)
app.post('/usuarios', (req: Request, res: Response): void => {
  const { nome } = req.body;

  if (!nome || typeof nome !== 'string') {
    res.status(400).json({ mensagem: 'Nome é obrigatório e deve ser uma string!' });
    return;
  }

  res.status(201).json({ mensagem: `Usuário ${nome} criado com sucesso!` });
});


app.get('/sobre', (req: Request, res: Response) => {
    res.json({
        nome: 'arthur',
        idade: 25,
        descricao: 'Sou um desenvolvedor apaixonado por tecnologia e aprendizado contínuo.'
      });
});

app.post('/comentarios', (req: Request, res: Response) => {
    const { texto } = req.body;
    if (!texto || typeof texto !== 'string') {
        res.status(400).json({ mensagem: 'Nome é obrigatório e deve ser uma string!' });
        return;
      }
  res.status(201).json({ mensagem: 'Comentário recebido!' });
});

app.delete('/comentarios/:id', (req: Request, res: Response) => {
  const id = req.params
  res.status(200).json({mensagem: "comentario excluido"});
});


// 🔸 Iniciar servidor
app.listen(PORT, (): void => {
  console.log(`🔥 Servidor rodando em http://localhost:${PORT}`);
});
