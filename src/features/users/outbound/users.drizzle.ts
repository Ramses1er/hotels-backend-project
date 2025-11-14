import {
  type UserEntityRepository,
  type UserEntityInterface,
} from "../domain/user.entity";
import Router from "express";
import db from "@/db";
import { users } from "@/db/schemas/users";
import { eq } from "drizzle-orm";

export class UsersDrizzle implements UserEntityRepository {
  // creation d'un utilisateur
  async create(user: UserEntityInterface): Promise<UserEntityInterface> {
    const result = await db.insert(users).values(user).returning();
    if (result.length === 0) {
      throw new Error("Failed to create user");
    }
    return result[0]!;
  }

  // fonction pour retourner un utilisateur par son id
  async findById(id: string): Promise<UserEntityInterface | null> {
    const result = await db.select().from(users).where(eq(users.id, id));
    if (result.length === 0) {
      return null;
    }
    return result[0]!;
  }

  // fonction pour retourner tous les utilisateurs
  async findAll(): Promise<UserEntityInterface[]> {
    const result = await db.select().from(users);
    if (result.length === 0) {
      return [];
    }
    return result;
  }

  // fonction pour mettre à jour un utilisateur
  async update(user: UserEntityInterface): Promise<UserEntityInterface> {
    const result = await db
      .update(users)
      .set(user)
      .where(eq(users.id, user.id))
      .returning();
    return result[0]!;
  }

  // fonction pour supprimer un utilisateur
  async delete(id: string): Promise<void> {
    await db.delete(users).where(eq(users.id, id));
  }

  // fonction pour retourner un utilisateur par son email
  async findByEmail(email: string): Promise<UserEntityInterface | null> {
    const result = await db.select().from(users).where(eq(users.email, email));
    return result[0]!;
  }
}
