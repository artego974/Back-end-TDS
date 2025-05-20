export class Produto {
    constructor(public id: number, public nome: string, public desc: string, public preco: number) {}
  }
  
  export const produtos: Produto[] = []; // Simulando um "banco de dados" temporário