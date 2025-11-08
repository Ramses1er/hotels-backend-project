export interface EntityQuartierInterface {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date | null;
}

export interface EntityQuartierRepository {
  create(quartier: EntityQuartierInterface): Promise<EntityQuartierInterface>;
  findById(id: string): Promise<EntityQuartierInterface | null>;
  findAll(): Promise<EntityQuartierInterface[]>;
  update(quartier: EntityQuartierInterface): Promise<EntityQuartierInterface>;
  delete(id: string): Promise<void>;
  findByName(name: string): Promise<EntityQuartierInterface | null>;
}