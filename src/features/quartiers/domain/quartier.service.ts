import type {
  EntityQuartierInterface,
  EntityQuartierRepository,
} from "./quartier.entity";

export class QuartierService {
  private repo: EntityQuartierRepository;

  constructor(repo: EntityQuartierRepository) {
    this.repo = repo;
  }

  async createQuartier(
    quartier: EntityQuartierInterface
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
}
