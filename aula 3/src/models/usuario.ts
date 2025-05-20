export class Usuario {
    constructor(public id: number, public nome: string, public email: string) {}
  }
  
  export const usuarios: Usuario[] = []; // Simulando um "banco de dados" temporário