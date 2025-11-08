export interface UserEntityInterface {
  id: string;
  email: string;
  password: string;
  createdAt: Date;
}

export interface UserEntityRepository {
  create(user: UserEntityInterface): Promise<UserEntityInterface>;
  findById(id: string): Promise<UserEntityInterface | null>;
  findAll(): Promise<UserEntityInterface[]>;
  update(user: UserEntityInterface): Promise<UserEntityInterface>;
  delete(id: string): Promise<void>;
  findByEmail(email: string): Promise<UserEntityInterface | null>;
}
