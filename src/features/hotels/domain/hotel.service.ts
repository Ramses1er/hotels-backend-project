import type {
  EntityHotelRepository,
  EntityHotelInterface,
} from "./hotels.entity";

interface createHotelInput {
  name: string;
  description: string;
}

export class HotelService {
  private repo: EntityHotelRepository;

  constructor(repo: EntityHotelRepository) {
    this.repo = repo;
  }

  async createHotel(hotel: createHotelInput): Promise<EntityHotelInterface> {
    const existingHotel = await this.repo.findByName(hotel.name);

    if (existingHotel != null) {
      throw new Error("Hotel déjà existant");
    }

    const newHotel: EntityHotelInterface = {
      id: crypto.randomUUID(),
      name: hotel.name,
      description: hotel.description,
      createdAt: new Date(),
      updatedAt: null,
    };

    return newHotel;
  }
}
