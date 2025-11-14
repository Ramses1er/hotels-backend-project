import db from "@/db";
import { quartiers } from "@/db/schemas/quartiers";
import { eq } from "drizzle-orm";
import {
  type EntityQuartierInterface,
  type EntityQuartierRepository,
} from "@/features/quartiers/domain/quartier.entity";

export class QuartierDrizzleRepository implements EntityQuartierRepository {
  // creation d'un quartier
  async create(
    quartier: EntityQuartierInterface
  ): Promise<EntityQuartierInterface> {
    const result = await db.insert(quartiers).values(quartier).returning();
    return result[0]!;
  }

  // fonction pour retourner un quartier par son id
  async findById(id: string): Promise<EntityQuartierInterface | null> {
    const result = await db
      .select()
      .from(quartiers)
      .where(eq(quartiers.id, id));
    if (result.length === 0) {
      return null;
    }
    return result[0]!;
  }

  // fonction pour retourner tous les quartiers
  async findAll(): Promise<EntityQuartierInterface[]> {
    const result = await db.select().from(quartiers);
    if (result.length === 0) {
      return [];
    }
    return result;
  }

  // fonction pour mettre à jour un quartier
  async update(
    quartier: EntityQuartierInterface
  ): Promise<EntityQuartierInterface> {
    const result = await db
      .update(quartiers)
      .set(quartier)
      .where(eq(quartiers.id, quartier.id))
      .returning();
    return result[0]!;
  }

  // fonction pour supprimer un quartier
  async delete(id: string): Promise<void> {
    await db.delete(quartiers).where(eq(quartiers.id, id));
  }

  // foncition pour findbyname
  async findByName(name: string): Promise<EntityQuartierInterface | null> {
    const result = await db
      .select()
      .from(quartiers)
      .where(eq(quartiers.name, name));
    if (result.length === 0) {
      return null;
    }
    return result[0]!;
  }
}
