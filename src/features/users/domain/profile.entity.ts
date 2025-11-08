interface Profile{
  id: string;
  fullname:string;
  email:string;
  phone:string;
  address:string;
  city:string;
  state:string;
  zip:string;
  country:string;
  createdAt:Date;
  updatedAt:Date | null;
}

export interface UserProfileRepository {
  create(profile: Profile): Promise<Profile>;
  findById(id: string): Promise<Profile | null>;
  findAll(): Promise<Profile[]>;
  update(profile: Profile): Promise<Profile>;
  delete(id: string): Promise<void>;
}