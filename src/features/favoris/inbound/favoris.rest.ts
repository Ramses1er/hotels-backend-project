import { type Request, type Response, Router } from "express";
import { FavoriteService } from "../domain/favorite.service";
import { z } from "zod";

const createOrDeleteFavoriteInput = z.object({
  userId: z.string(),
  hotelId: z.string(),
});

export function favoriteController(service: FavoriteService): Router {
  const router = Router();

  // creation ou suppression d'un favorite
  router.post("/", async (req: Request, res: Response) => {
    const input = createOrDeleteFavoriteInput.safeParse(req.body);

    if (!input.success) {
      return res.status(400).json({ error: input.error.issues });
    }

    try {
      const favorite = await service.createOrDeleteFavorite(input.data);
      res.status(201).json(favorite);
    } catch (error) {
      return res.status(500).json({
        error: "Erreur lors de la creation ou suppression du favorite",
      });
    }
  });

  // suppression d'un favorite par son id
  router.delete("/:id", async (req: Request, res: Response) => {
    const { id } = (await req.params) as { id: string };
    if (!id) {
      return res.status(400).json({ error: "L'id du favorite est requis" });
    }
    try {
      await service.deleteFavorite(id);
      res.status(200).json({ message: "Favorite supprime avec succes" });
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Erreur lors de la suppression du favorite" });
    }
  });

  // router tous les favoris d'un utilisateurs
  router.get("/user/:userId", async (req: Request, res: Response) => {
    const { userId } = (await req.params) as { userId: string };
    if (!userId) {
      return res
        .status(400)
        .json({ error: "L'id de l'utilisateur est requis" });
    }
    try {
      const favorites = await service.getAllFavoritesByUserId(userId);
      res.status(200).json(favorites);
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Erreur lors de la recuperation des favoris" });
    }
  });

  return router;
}
