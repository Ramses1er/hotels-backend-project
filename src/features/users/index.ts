import { UserService } from "./domain/users.service";
import { UsersDrizzle } from "./outbound/users.drizzle";
import { userController } from "./inbound/user.rest";

const repository = new UsersDrizzle();
const service = new UserService(repository);
const controller = userController(service);

export default controller;
