import type {
  EntityArrondissementInterface,
  EntityArrondissementRepository,
} from "@/features/arrondissements/domain/arrondissement.entity";
import db from "@/db";
import { eq } from "drizzle-orm";
import { arrondissements } from "@/db/schemas";

export class ArrondissementDrizzle implements EntityArrondissementRepository {
  // creation d'un arrondissement
  async create(
    arrondissement: EntityArrondissementInterface
  ): Promise<EntityArrondissementInterface> {
    const result = await db
      .insert(arrondissements)
      .values(arrondissement)
      .returning();

    return result[0]!;
  }

  // retourner tous les arrondissements
  async findAll(): Promise<EntityArrondissementInterface[]> {
    const result = await db.select().from(arrondissements);
    return result;
  }

  // update un arrondissement
  async update(
    arrondissement: EntityArrondissementInterface
  ): Promise<EntityArrondissementInterface> {
    const result = await db
      .update(arrondissements)
      .set(arrondissement)
      .where(eq(arrondissements.id, arrondissement.id))
      .returning();
    return result[0]!;
  }

  // delete un arrondissement
  async delete(id: string): Promise<void> {
    await db.delete(arrondissements).where(eq(arrondissements.id, id));
  }

  // retourner un arrondissement par son id
  async findById(id: string): Promise<EntityArrondissementInterface | null> {
    const result = await db
      .select()
      .from(arrondissements)
      .where(eq(arrondissements.id, id));
    return result[0]!;
  }

  // retourner un arrondissement par son nom
  async findByName(
    name: string
  ): Promise<EntityArrondissementInterface | null> {
    const result = await db
      .select()
      .from(arrondissements)
      .where(eq(arrondissements.name, name));
    return result[0]!;
  }
}
