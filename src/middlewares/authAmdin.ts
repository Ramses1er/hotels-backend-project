// src/middlewares/authAdmin.ts
import { type Request, type Response, type NextFunction } from "express";
import { verifyJwtToken } from "../lib/auth"; // adapte le chemin selon ton projet

export function authAdmin(req: Request, res: Response, next: NextFunction) {
  const authz = req.headers.authorization;

  // Vérifie si le header est présent
  if (!authz) {
    return res.status(401).json({
      error: "L'accès à cette ressource nécessite une authentification",
    });
  }

  // Supprime le "Bearer " du token
  const token = authz.startsWith("Bearer ") ? authz.split(" ")[1] : authz;

  // Vérifie le token
  const user = verifyJwtToken(token!, "admin");

  if (!user) {
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

  // Ajoute l'utilisateur à la requête (utile pour les prochaines étapes)
  (req as any).user = user;

  next(); // passe à la suite
}
