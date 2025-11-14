import { HotelService } from "./domain/hotel.service";
import { HotelsDrizzle } from "./outbond/hotels.drizzle";
import { hotelController } from "./inbound/hotels.rest";

const repository = new HotelsDrizzle();
const service = new HotelService(repository);
const controller = hotelController(service);

export default controller;
