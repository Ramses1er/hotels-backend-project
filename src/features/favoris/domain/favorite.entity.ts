export interface FavoriteEntityInterface {
  id: string;
  userId: string;
  hotelId: string;
  createdAt: Date;
  updatedAt: Date | null;
}

export interface FavoriteEntityRepository {
  create(favorite: FavoriteEntityInterface): Promise<FavoriteEntityInterface>;
  findById(id: string): Promise<FavoriteEntityInterface | null>;
  deleteFromFavorite(id: string): Promise<void>;
  findByUserIdAndHotelId(userId: string, hotelId: string): Promise<FavoriteEntityInterface | null>;
  findAllByUserId(userId: string): Promise<FavoriteEntityInterface[]>;
}
