export interface UserEntityInterface {
  id: string;
  email: string;
  role: string | null;
  password: string;
  createdAt: Date;
  updatedAt: Date | null;
}

export interface LoginOutput {
  token: string;
}

export interface UserEntityRepository {
  create(user: UserEntityInterface): Promise<UserEntityInterface>;
  findById(id: string): Promise<UserEntityInterface | null>;
  findAll(): Promise<UserEntityInterface[]>;
  update(user: UserEntityInterface): Promise<UserEntityInterface>;
  delete(id: string): Promise<void>;
  findByEmail(email: string): Promise<UserEntityInterface | null>;
}
