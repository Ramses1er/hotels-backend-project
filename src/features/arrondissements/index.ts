import { ArrondissementService } from "./domain/arrondissement.service";
import { ArrondissementDrizzle } from "./outbound/arrondissement.drizzle";
import { arrondissementController } from "./inbound/arrondissement.rest";

const repository = new ArrondissementDrizzle();
const service = new ArrondissementService(repository);
const controller = arrondissementController(service);

export default controller;
