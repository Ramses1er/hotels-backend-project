import type {
  EntityArrondissementInterface,
  EntityArrondissementRepository,
} from "./arrondissement.entity";

interface createArrondissementInput {
  name: string;
}

export class ArrondissementService {
  private repo: EntityArrondissementRepository;

  constructor(repo: EntityArrondissementRepository) {
    this.repo = repo;
  }

  async createArrondissement(
    arrondissement: createArrondissementInput
  ): Promise<EntityArrondissementInterface> {
    const existingArrondissement = await this.repo.findByName(
      arrondissement.name
    );

    if (existingArrondissement != null) {
      throw new Error("Arrondissement déjà existant");
    }

    const newArrondissement: EntityArrondissementInterface = {
      id: crypto.randomUUID(),
      name: arrondissement.name,
      createdAt: new Date(),
      updatedAt: null,
    };

    return newArrondissement;
  }
}
