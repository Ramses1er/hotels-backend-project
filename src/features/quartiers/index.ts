import { QuartierService } from "./domain/quartier.service";
import { QuartierDrizzleRepository } from "./outbound/quartier.drizzle";
import { quartierController } from "./inbound/quartier.rest";

const repository = new QuartierDrizzleRepository();
const service = new QuartierService(repository);
const controller = quartierController(service);

export default controller;
