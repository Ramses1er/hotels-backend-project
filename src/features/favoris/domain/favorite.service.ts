import type {
  FavoriteEntityInterface,
  FavoriteEntityRepository,
} from "./favorite.entity";

interface InputFavorite {
  userId: string;
  hotelId: string;
}

export class FavoriteService {
  private repo: FavoriteEntityRepository;

  constructor(repo: FavoriteEntityRepository) {
    this.repo = repo;
  }

  // fonction pour create un favorite ou supprimer un favorite
  async createOrDeleteFavorite(
    favorite: InputFavorite
  ): Promise<FavoriteEntityInterface> {
    const existingFavorite = await this.repo.findByUserIdAndHotelId(
      favorite.userId,
      favorite.hotelId
    );
    if (existingFavorite) {
      await this.repo.deleteFromFavorite(existingFavorite.id);
    }
    const newFavorite: FavoriteEntityInterface = {
      ...favorite,
      id: crypto.randomUUID(),
      createdAt: new Date(),
      updatedAt: null,
    };
    return await this.repo.create(newFavorite);
  }

  // fonction pour delete un favorite
  async deleteFavorite(id: string): Promise<void> {
    const existingFavorite = await this.repo.findById(id);
    if (!existingFavorite) {
      throw new Error("Favorite introuvable");
    }
    await this.repo.deleteFromFavorite(id);
  }

  // fonction pour retourner tous les favoris d'un seul utilisateur
  async getAllFavoritesByUserId(
    userId: string
  ): Promise<FavoriteEntityInterface[]> {
    const favorites = await this.repo.findAllByUserId(userId);
    if (!favorites) {
      throw new Error("Aucun favorite trouve");
    }
    return favorites;
  }

}
