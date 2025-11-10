export interface EntityArrondissementInterface {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date | null;
}

export interface EntityArrondissementRepository {
  create(arrondissement: EntityArrondissementInterface): Promise<EntityArrondissementInterface>;
  findAll(): Promise<EntityArrondissementInterface[]>;
  update(arrondissement: EntityArrondissementInterface): Promise<EntityArrondissementInterface>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<EntityArrondissementInterface | null>;
  findByName(name: string): Promise<EntityArrondissementInterface | null>;
}