import type { UserEntityRepository, UserEntityInterface } from "./user.entity";
import bcrypt from "bcrypt";
import { verifyJwtToken } from "../../../lib/auth";
import type { LoginOutput } from "./user.entity";
import { createJwtToken } from "../../../lib/auth";

interface createUserInput {
  email: string;
  password: string;
}

export class UserService {
  private repo: UserEntityRepository;

  constructor(repo: UserEntityRepository) {
    this.repo = repo;
  }

  async createUser(user: createUserInput): Promise<UserEntityInterface> {
    const existingUser = await this.repo.findByEmail(user.email);

    if (existingUser != null) {
      throw new Error("Email déjà utilisée");
    }

    const hashedPassword = await bcrypt.hash(user.password, 10);

    const newUser: UserEntityInterface = {
      id: crypto.randomUUID(),
      email: user.email,
      role: null,
      password: hashedPassword,
      createdAt: new Date(),
      updatedAt: null,
    };

    return newUser;
  }

  verifyToken(token: string): UserEntityInterface | null {
    const decoded = verifyJwtToken(token);

    if (decoded == null) {
      return null;
    }

    return decoded as UserEntityInterface;
  }

  // fonction pour supprimer un utilsateur
  async deleteUser(id: string): Promise<void> {
    const existUser = await this.repo.findById(id);
    if (!existUser) {
      throw new Error("Utilisateur introuvable");
    }
    await this.repo.delete(id);
  }

  // fonction pour connecter un user
  async loginUser(
    email: string,
    password: string
  ): Promise<LoginOutput | null> {
    const user = await this.repo.findByEmail(email);

    if (!user) {
      return null;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
      const token = createJwtToken(user.id, user.email, user.role!);
      return { token };
    } else {
      return null;
    }
  }

  // function pour retourner tous les utilisateurs
  async getAllUsers(): Promise<UserEntityInterface[]> {
    const users = await this.repo.findAll();

    if (!users) {
      throw new Error("Aucun utilisateur trouve");
    }

    return users;
  }

  // function pour retourner un utilisateur par son id
  async getUserById(id: string): Promise<UserEntityInterface | null> {
    const user = await this.repo.findById(id);
    if (!user) {
      return null;
    }
    return user;
  }

  // function pour mettre a jour un utilisateur
  async updateUser(user: UserEntityInterface): Promise<UserEntityInterface> {
    const existingUser = await this.repo.findById(user.id);
    if (!existingUser) {
      throw new Error("Utilisateur introuvable");
    }
    return await this.repo.update(user);
  }

  // function pour trouver un utilisateur par son email
  async findByEmail(email: string): Promise<UserEntityInterface | null> {
    const user = await this.repo.findByEmail(email);
    if (!user) {
      return null;
    }
    return user;
  }
}
