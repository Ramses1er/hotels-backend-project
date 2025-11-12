import type {
  EntityQuartierInterface,
  EntityQuartierRepository,
} from "./quartier.entity";

interface InputQuartier {
  name: string;
}

export class QuartierService {
  private repo: EntityQuartierRepository;

  constructor(repo: EntityQuartierRepository) {
    this.repo = repo;
  }

  // fonction pour creer un quartier
  async createQuartier(
    quartier: InputQuartier
  ): Promise<EntityQuartierInterface> {
    const existingQuartier = await this.repo.findByName(quartier.name);

    if (existingQuartier != null) {
      throw new Error("Quartier déjà existant");
    }

    const newQuartier: EntityQuartierInterface = {
      id: crypto.randomUUID(),
      name: quartier.name,
      createdAt: new Date(),
      updatedAt: null,
    };

    return newQuartier;
  }

  // fonction pour find un quartier by ID
  async findQuartierByID(id: string): Promise<EntityQuartierInterface | null> {
    const existQuartier = await this.repo.findById(id);
    if (!existQuartier) {
      throw new Error("Quartier introuvable");
    }
    return existQuartier;
  }

  // fonction pour find un quartier by name
  async findQuartierByName(
    name: string
  ): Promise<EntityQuartierInterface | null> {
    const existQuartier = await this.repo.findByName(name);
    if (!existQuartier) {
      throw new Error("Quartier introuvable");
    }
    return existQuartier;
  }

  // fonction pour find tous les quartiers
  async findAllQuartiers(): Promise<EntityQuartierInterface[]> {
    const allQuartiers = await this.repo.findAll();
    if (!allQuartiers) {
      throw new Error("Aucun quartier trouve");
    }
    return allQuartiers;
  }

  // fonction pour update un quartier
  async updateQuartier(
    quartier: EntityQuartierInterface
  ): Promise<EntityQuartierInterface> {
    const existQuartier = await this.repo.findById(quartier.id);
    if (!existQuartier) {
      throw new Error("Quartier introuvable");
    }
    const updatedQuartier: EntityQuartierInterface = {
      ...existQuartier,
      name: quartier.name,
      updatedAt: new Date(),
    };
    return updatedQuartier;
  }

  // fonction pour delete un quartier
  async deleteQuartier(id: string): Promise<void> {
    const existQuartier = await this.repo.findById(id);
    if (!existQuartier) {
      throw new Error("Quartier introuvable");
    }
    await this.repo.delete(id);
  }
}
