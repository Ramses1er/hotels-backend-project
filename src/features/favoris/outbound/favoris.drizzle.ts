import type {
  FavoriteEntityInterface,
  FavoriteEntityRepository,
} from "@/features/favoris/domain/favorite.entity";
import db from "@/db";
import { favorites } from "@/db/schemas";
import { eq, and } from "drizzle-orm";

export class FavoriteDrizzle implements FavoriteEntityRepository {
  // creation d'un favoris
  async create(
    favoris: FavoriteEntityInterface
  ): Promise<FavoriteEntityInterface> {
    const result = await db.insert(favorites).values(favoris).returning();
    return result[0]!;
  }

  // retourner un favoris par son id
  async findById(id: string): Promise<FavoriteEntityInterface | null> {
    const result = await db
      .select()
      .from(favorites)
      .where(eq(favorites.id, id));
    return result[0]!;
  }

  // delete un favoris
  async deleteFromFavorite(id: string): Promise<void> {
    await db.delete(favorites).where(eq(favorites.id, id));
  }

  // retourner un favoris par l'id de l'utilisateur et l'id de l'hotel
  async findByUserIdAndHotelId(
    userId: string,
    hotelId: string
  ): Promise<FavoriteEntityInterface | null> {
    const result = await db
      .select()
      .from(favorites)
      .where(and(eq(favorites.userId, userId), eq(favorites.hotelId, hotelId)));
    return result[0]!;
  }

  // retourner tous les favoris par l'id de l'utilisateur
  async findAllByUserId(userId: string): Promise<FavoriteEntityInterface[]> {
    const result = await db
      .select()
      .from(favorites)
      .where(eq(favorites.userId, userId));
    return result;
  }
}
