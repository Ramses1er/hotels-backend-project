import { type Request, type Response, Router } from "express";
import { HotelService } from "../domain/hotel.service";
import { z } from "zod";
import { verifyJwtToken } from "../../../lib/auth";

const createHotelInput = z.object({
  name: z.string(),
  description: z.string(),
});

const updateHotelInput = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  createdAt: z.date(),
  updatedAt: z.date().nullable(),
});

export function hotelController(service: HotelService): Router {
  const router = Router();

  // router pour creer un hotel
  router.post("/", async (req: Request, res: Response) => {
    // req.body
    const authz = req.headers.authorization;

    if (authz == null) {
      return res.status(401).json({
        error: "L'accès à cette ressource nécessite une authentification",
      });
    }

    // Bearer <token>
    const user = verifyJwtToken(authz, "admin");

    if (user == null) {
      return res.status(401).json({
        error: "L'accès à cette ressource nécessite une authentification",
      });
    }

    if (user.role !== "admin") {
      return res.status(403).json({
        error:
          "Vous n'avez pas les permissions nécessaires pour effectuer cette action",
      });
    }

    const input = createHotelInput.safeParse(req.body);
    if (!input.success) {
      return res.status(400).json({ error: input.error.issues });
    }
    try {
      const hotel = await service.createHotel(input.data);
      res.status(201).json(hotel);
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Erreur lors de la creation de l'hotel" });
    }
  });

  // router pour retourner tous les hotels
  router.get("/", async (req: Request, res: Response) => {
    try {
      const hotels = await service.getAllHotels();
      res.status(200).json(hotels);
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Erreur lors de la recuperation des hotels" });
    }
  });

  // router pour modifier un hotel
  router.put("/", async (req: Request, res: Response) => {
    // req.body
    const authz = req.headers.authorization;

    if (authz == null) {
      return res.status(401).json({
        error: "L'accès à cette ressource nécessite une authentification",
      });
    }

    // Bearer <token>
    const user = verifyJwtToken(authz, "admin");

    if (user == null) {
      return res.status(401).json({
        error: "L'accès à cette ressource nécessite une authentification",
      });
    }

    if (user.role !== "admin") {
      return res.status(403).json({
        error:
          "Vous n'avez pas les permissions nécessaires pour effectuer cette action",
      });
    }

    const input = updateHotelInput.safeParse(req.body);

    if (!input.success) {
      return res.status(400).json({ error: input.error.issues });
    }

    try {
      const hotel = await service.updateHotel(input.data);
      res.status(200).json(hotel);
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Erreur lors de la modification de l'hotel" });
    }
  });

  // router pour supprimer un hotel
  router.delete("/:id", async (req: Request, res: Response) => {
    // req.body
    const authz = req.headers.authorization;

    if (authz == null) {
      return res.status(401).json({
        error: "L'accès à cette ressource nécessite une authentification",
      });
    }

    // Bearer <token>
    const user = verifyJwtToken(authz, "admin");

    if (user == null) {
      return res.status(401).json({
        error: "L'accès à cette ressource nécessite une authentification",
      });
    }

    if (user.role !== "admin") {
      return res.status(403).json({
        error:
          "Vous n'avez pas les permissions nécessaires pour effectuer cette action",
      });
    }

    const { id } = (await req.params) as { id: string };
    if (!id) {
      return res.status(400).json({ error: "L'id de l'hotel est requis" });
    }
    try {
      await service.deleteHotel(id);
      res.status(200).json({ message: "Hotel supprime avec succes" });
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Erreur lors de la suppression de l'hotel" });
    }
  });

  return router;
}
