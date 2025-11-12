import { type Request, type Response, Router } from "express";
import { UserService } from "../domain/users.service";
import { z } from "zod";
import { verifyJwtToken } from "../../../lib/auth";

// schema de creation d'un utilisateur
const createUserInput = z.object({
  email: z.email(),
  password: z.string().min(8),
});

// schema de login d'un utilisateur
const loginInput = z.object({
  email: z.email(),
  password: z.string(),
});

// schema de modification d'un utilisateur
const updateUserInput = z.object({
  id: z.string(),
  email: z.email(),
  role: z.string(),
  password: z.string().min(8),
  createdAt: z.date(),
  updatedAt: z.date(),
});

// schema de trouver un utilisateur par son email
const getUserByEmailInput = z.object({
  email: z.email(),
});

export function userController(service: UserService): Router {
  const router = Router();

  // creation d'un utilisateur pas de verification de token
  router.post("/", async (req: Request, res: Response) => {
    const input = createUserInput.safeParse(req.body);
    if (!input.success) {
      return res.status(400).json({ error: input.error.issues });
    }
    try {
      const user = await service.createUser(input.data);
      res.status(201).json(user);
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Erreur lors de la creation de l'utilisateur" });
    }
  });

  // login d'un utilisateur pas de verification de token
  router.post("/login", async (req: Request, res: Response) => {
    const input = loginInput.safeParse(req.body);
    if (!input.success) {
      return res.status(400).json({ error: input.error.issues });
    }
    try {
      const user = await service.loginUser(
        input.data.email,
        input.data.password
      );
      res.status(200).json(user);
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Erreur lors de la connexion de l'utilisateur" });
    }
  });

  // retour de tous les utilisateurs il faut verification de token
  router.get("/", async (req: Request, res: Response) => {
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

    // On a bien vérifié que l'utilisateur connecté est admin
    try {
      const users = await service.getAllUsers();
      res.status(200).json(users);
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Erreur lors de la recuperation des utilisateurs" });
    }
  });

  // retour d'un utilisateur par son id il faut verification de token
  router.get("/:id", async (req: Request, res: Response) => {
    const { id } = (await req.params) as { id: string };

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

    if (!id) {
      return res
        .status(400)
        .json({ error: "L'id de l'utilisateur est requis" });
    }

    try {
      const user = await service.getUserById(id);
      res.status(200).json(user);
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Erreur lors de la recuperation de l'utilisateur" });
    }
  });

  // suppression d'un utilisateur il faut verification de token
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

    await service.deleteUser(req.params.id!);
    return res.status(204).send();
  });

  // modification d'un utilisateur soit par l'admin soit par l'utilisateur lui-meme
  router.put("/", async (req: Request, res: Response) => {
    const input = updateUserInput.safeParse(req.body);

    if (!input.success) {
      return res.status(400).json({ error: input.error.issues });
    }

    try {
      const user = await service.updateUser(input.data);
      res.status(200).json(user);
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Erreur lors de la modification de l'utilisateur" });
    }
  });

  // trouver un utilisateur par son email
  router.get("/email/:email", async (req: Request, res: Response) => {
    const { email } = (await req.params) as { email: string };

    if (!email) {
      return res
        .status(400)
        .json({ error: "L'email de l'utilisateur est requis" });
    }

    try {
      const user = await service.findByEmail(email);
      res.status(200).json(user);
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Erreur lors de la recuperation de l'utilisateur" });
    }
  });

  // retour du router
  return router;
}
