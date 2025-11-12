import { type Request, type Response, Router } from "express";
import { QuartierService } from "../domain/quartier.service";
import { verifyJwtToken } from "../../../lib/auth";
import { z } from "zod";

const createQuartierInput = z.object({
  name: z.string(),
});

const updateQuartierInput = z.object({
  id: z.string(),
  name: z.string(),
  createdAt: z.date(),
  updatedAt: z.date().nullable(),
});

export function quartierController(service: QuartierService): Router {
  const router = Router();

  // router pour creer un quartier
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

    const input = createQuartierInput.safeParse(req.body);
    if (!input.success) {
      return res.status(400).json({ error: input.error.issues });
    }
    try {
      const quartier = await service.createQuartier(input.data);
      res.status(201).json(quartier);
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Erreur lors de la creation du quartier" });
    }
  });

  // router pour supprimer un quartier seulement par un admin => authentification
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
      return res.status(400).json({ error: "L'id du quartier est requis" });
    }
    try {
      await service.deleteQuartier(id);
      res.status(200).json({ message: "Quartier supprime avec succes" });
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Erreur lors de la suppression du quartier" });
    }
  });

  // router pour update un quartier
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

    const input = updateQuartierInput.safeParse(req.body);
    if (!input.success) {
      return res.status(400).json({ error: input.error.issues });
    }

    try {
      const quartier = await service.updateQuartier(input.data);
      res.status(200).json(quartier);
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Erreur lors de la modification du quartier" });
    }
  });

  // router pour retourner tous les quartiers
  router.get("/", async (req: Request, res: Response) => {
    try {
      const quartiers = await service.findAllQuartiers();
      res.status(200).json(quartiers);
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Erreur lors de la recuperation des quartiers" });
    }
  });

  return router;
}
