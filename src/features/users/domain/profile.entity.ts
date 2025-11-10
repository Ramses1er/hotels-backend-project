export interface UserProfileInterface {
  id: string;
  fullname: string;
  phone: string;
  address: string;
  quartier: string;
  createdAt: Date;
  updatedAt: Date | null;
}

export interface UserProfileRepository {
  create(profile: UserProfileInterface): Promise<UserProfileInterface>;
  findById(id: string): Promise<UserProfileInterface | null>;
  findAll(): Promise<UserProfileInterface[]>;
  update(profile: UserProfileInterface): Promise<UserProfileInterface>;
  delete(id: string): Promise<void>;
}
