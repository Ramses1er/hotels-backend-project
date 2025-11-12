import { Router, type Request, type Response } from "express";
import { ArrondissementService } from "../domain/arrondissement.service";
import { z } from "zod";
import { verifyJwtToken } from "../../../lib/auth";

const createArrondissementInput = z.object({
  name: z.string(),
});

const updateArrondissementInput = z.object({
  id: z.string(),
  name: z.string(),
  createdAt: z.date(),
  updatedAt: z.date().nullable(),
});

export function arrondissementController(
  service: ArrondissementService
): Router {
  const router = Router();

  // creation d'un arrondissement
  router.post("/", async (req: Request, res: Response) => {
    const input = createArrondissementInput.safeParse(req.body);
    if (!input.success) {
      return res.status(400).json({ error: input.error.issues });
    }
    try {
      const arrondissement = await service.createArrondissement(input.data);
      res.status(201).json(arrondissement);
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Erreur lors de la creation de l'arrondissement" });
    }
  });

  // retour de tous les arrondissements
  router.get("/", async (req: Request, res: Response) => {
    try {
      const arrondissements = await service.getAllArrondissement();
      res.status(200).json(arrondissements);
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Erreur lors de la recuperation des arrondissements" });
    }
  });

  // retour d'un arrondissement par son id
  router.get("/:id", async (req: Request, res: Response) => {
    const { id } = (await req.params) as { id: string };
    if (!id) {
      return res
        .status(400)
        .json({ error: "L'id de l'arrondissement est requis" });
    }
    try {
      const arrondissement = await service.findArrondissementByID(id);
      res.status(200).json(arrondissement);
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Erreur lors de la recuperation de l'arrondissement" });
    }
  });

  // modification d'un arrondissement
  router.put("/", async (req: Request, res: Response) => {
    const input = updateArrondissementInput.safeParse(req.body);
    if (!input.success) {
      return res.status(400).json({ error: input.error.issues });
    }
    try {
      const arrondissement = await service.updateArrondissement(input.data);
      res.status(200).json(arrondissement);
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Erreur lors de la modification de l'arrondissement" });
    }
  });

  // suppression d'un arrondissement seulement par un admin => authentification
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
      return res
        .status(400)
        .json({ error: "L'id de l'arrondissement est requis" });
    }

    try {
      await service.deleteArrondissement(id);
      res.status(200).json({ message: "Arrondissement supprime avec succes" });
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Erreur lors de la suppression de l'arrondissement" });
    }
  });

  // retourer un arrondissement par son nom
  router.get("/name/:name", async (req: Request, res: Response) => {
    const { name } = (await req.params) as { name: string };
    if (!name) {
      return res
        .status(400)
        .json({ error: "Le nom de l'arrondissement est requis" });
    }
    try {
      const arrondissement = await service.findArrondissementByName(name);
      res.status(200).json(arrondissement);
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Erreur lors de la recuperation de l'arrondissement" });
    }
  });

  return router;
}
