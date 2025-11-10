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

  // fonction pour find un hotel by ID
  async findHotelByID(id: string): Promise<EntityHotelInterface | null> {
    const existHotel = await this.repo.findById(id);
    if (!existHotel) {
      throw new Error("Hotel introuvable");
    }
    return existHotel;
  }

  // fonction pour retourner tous les hotels
  async getAllHotels(): Promise<EntityHotelInterface[]> {
    const allHotels = await this.repo.findAll();
    if (!allHotels) {
      throw new Error("Aucun hotel trouve");
    }
    return allHotels;
  }

  // fonction pour update un hotel
  async updateHotel(
    hotel: EntityHotelInterface
  ): Promise<EntityHotelInterface> {
    const existHotel = await this.repo.findById(hotel.id);
    if (!existHotel) {
      throw new Error("Hotel introuvable");
    }
    const updatedHotel: EntityHotelInterface = {
      ...existHotel,
      name: hotel.name,
    };
    return updatedHotel;
  }

  // fonction pour delete un hotel
  async deleteHotel(id: string): Promise<void> {
    const existHotel = await this.repo.findById(id);
    if (!existHotel) {
      throw new Error("Hotel introuvable");
    }
    await this.repo.delete(id);
  }
}
