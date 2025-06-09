// src/repositories/UserRepository.ts
import { AppDataSource } from "../data-source";
import { User } from "../models/User";

export class UserRepository {
  private repo = AppDataSource.getRepository(User);

  async createUser(name: string, email: string, password: string, phone: string, role?: string) {
    const user = new User(name, email, password, phone);
    if (role) user.role = role;
    return await this.repo.save(user);
  }

  async findUserByEmail(email: string) {
    return await this.repo.findOne({ where: { email } });
  }

  async findUserById(id: number) {
    return await this.repo.findOne({ where: { id } });
  }

  async updateUser(id: number, fields: Partial<User>) {
    const user = await this.findUserById(id);
    if (!user) return null;

    // ⚠️ Guardar a senha antiga antes de atualizar
    user.setPreviousPassword(user.password);

    Object.assign(user, fields);
    return await this.repo.save(user);
  }

  async deleteUser(id: number) {
    const user = await this.findUserById(id);
    if (!user) return null;
    return await this.repo.remove(user);
  }

  async findAllUsers() {
    return await this.repo.find();
  }
}