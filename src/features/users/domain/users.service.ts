import type { UserEntityRepository, UserEntityInterface } from "./user.entity";
import bcrypt from "bcrypt";

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
      password: hashedPassword,
      createdAt: new Date(),
    };

    return newUser;
  }
}
