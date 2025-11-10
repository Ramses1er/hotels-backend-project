import type { UserProfileRepository } from "./profile.entity";
import type { UserProfileInterface } from "./profile.entity";

interface createProfileInput {
  fullname: string;
  phone: string;
  address: string;
  quartier: string;
}

export class ProfileService {
  private repo: UserProfileRepository;

  constructor(repo: UserProfileRepository) {
    this.repo = repo;
  }

  //fonction pour creer un profile
  async createProfile(
    profile: createProfileInput
  ): Promise<UserProfileInterface> {
    const newProfile: UserProfileInterface = {
      id: crypto.randomUUID(),
      fullname: profile.fullname,
      phone: profile.phone,
      address: profile.address,
      quartier: profile.quartier,
      createdAt: new Date(),
      updatedAt: null,
    };
    return newProfile;
  }

  // fonction pour retourner un profile par son id
  async getProfileById(id: string): Promise<UserProfileInterface | null> {
    const existProfile = await this.repo.findById(id);
    if (!existProfile) {
      throw new Error("Profile introuvable");
    }
    return existProfile;
  }

  // fonction pour retourner tous les profiles
  async getAllProfiles(): Promise<UserProfileInterface[]> {
    const allProfiles = await this.repo.findAll();
    if (!allProfiles) {
      throw new Error("Aucun profile trouve");
    }
    return allProfiles;
  }

  // fonction pour mettre a jour un profile
  async updateProfile(
    profile: UserProfileInterface
  ): Promise<UserProfileInterface> {
    return await this.repo.update(profile);
  }

  // fonction pour supprimer un profile
  async deleteProfile(id: string): Promise<void> {
    const existProfile = await this.repo.findById(id);
    if (!existProfile) {
      throw new Error("Profile introuvable");
    }
    await this.repo.delete(id);
  }
}
