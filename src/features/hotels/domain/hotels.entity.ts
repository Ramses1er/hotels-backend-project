export interface EntityHotelInterface {
  id: string;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date | null;
}

export interface EntityHotelRepository {
  create(hotel: EntityHotelInterface): Promise<EntityHotelInterface>;
  findAll(): Promise<EntityHotelInterface[]>;
  findById(id: string): Promise<EntityHotelInterface | null>;
  update(hotel: EntityHotelInterface): Promise<EntityHotelInterface>;
  delete(id: string): Promise<void>;
  findByName(name: string): Promise<EntityHotelInterface | null>;
}
