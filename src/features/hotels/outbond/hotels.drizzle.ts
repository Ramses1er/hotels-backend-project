import db from "@/db";
import {
  type EntityHotelRepository,
  type EntityHotelInterface,
} from "@/features/hotels/domain/hotels.entity";
import { hotels } from "@/db/schemas";
import { eq } from "drizzle-orm";
import res from "dev/lib/response";

export class HotelsDrizzle implements EntityHotelRepository {
  // creation d'un hotel
  async create(hotel: EntityHotelInterface): Promise<EntityHotelInterface> {
    const result = await db.insert(hotels).values(hotel).returning();
    return result[0]!;
  }

  // retourner tous les hotesls
  async findAll(): Promise<EntityHotelInterface[] | null> {
    const result = await db.select().from(hotels);
    if (result.length === 0) {
      return [];
    }
    return result;
  }

  // retourner un hotel par son id
  async findById(id: string): Promise<EntityHotelInterface | null> {
    const result = await db.select().from(hotels).where(eq(hotels.id, id));
    if (result.length === 0) {
      return null;
    }

    return result[0]!;
  }

  // update un hotel
  async update(hotel: EntityHotelInterface): Promise<EntityHotelInterface> {
    const result = await db
      .update(hotels)
      .set(hotel)
      .where(eq(hotels.id, hotel.id))
      .returning();

    return result[0]!;
  }

  // delete a hotel
  async delete(id: string): Promise<void> {
    const result = await db.delete(hotels).where(eq(hotels.id, id));
  }

  // findByName
  async findByName(name: string): Promise<EntityHotelInterface | null> {
    const result = await db.select().from(hotels).where(eq(hotels.name, name));
    if (result.length === 0) {
      return null;
    }
    return result[0]!;
  }
}
