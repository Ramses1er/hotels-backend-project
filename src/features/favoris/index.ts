import { FavoriteService } from "./domain/favorite.service";
import { FavoriteDrizzle } from "./outbound/favoris.drizzle";
import { favoriteController } from "./inbound/favoris.rest";

const repository = new FavoriteDrizzle();
const service = new FavoriteService(repository);
const controller = favoriteController(service);

export default controller;
