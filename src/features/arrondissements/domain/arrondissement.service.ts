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

  // fonction pour findAll les arrondissement
  async getAllArrondissement(): Promise<EntityArrondissementInterface[]> {
    const existArrondissement = await this.repo.findAll();
    if (!existArrondissement) {
      throw new Error("Aucun arrondissement trouve");
    }
    return existArrondissement;
  }

  // fonction pour find un arrondissement by ID
  async findArrondissementByID(
    id: string
  ): Promise<EntityArrondissementInterface | null> {
    const existArrondissement = await this.repo.findById(id);
    if (!existArrondissement) {
      throw new Error("Arrondissement introuvable");
    }
    return existArrondissement;
  }

  // fonction pour find un arrondissement by name
  async findArrondissementByName(
    name: string
  ): Promise<EntityArrondissementInterface | null> {
    const existArrondissement = await this.repo.findByName(name);
    if (!existArrondissement) {
      throw new Error("Arrondissement introuvable");
    }
    return existArrondissement;
  }

  // fonction pour update un arrondissement
  async updateArrondissement(
    arrondissement: EntityArrondissementInterface
  ): Promise<EntityArrondissementInterface> {
    const existArrondissement = await this.repo.findById(arrondissement.id);
    if (!existArrondissement) {
      throw new Error("Arrondissement introuvable");
    }
    const updatedArrondissement: EntityArrondissementInterface = {
      ...existArrondissement,
      name: arrondissement.name,
    };

    return updatedArrondissement;
  }

  // fonction pour delete un arrondissement
  async deleteArrondissement(id: string): Promise<void> {
    const existArrondissement = await this.repo.findById(id);
    if (!existArrondissement) {
      throw new Error("Arrondissement introuvable");
    }
    await this.repo.delete(id);
  }
}
