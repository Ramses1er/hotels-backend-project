import express from "express";
import userRouter from "@/features/users";
import hotelRouter from "@/features/hotels";
import favoriteRouter from "@/features/favoris";
import quartierRouter from "@/features/quartiers";
import arrondissementRouter from "@/features/arrondissements";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/users", userRouter);
app.use("/hotels", hotelRouter);
app.use("/favorites", favoriteRouter);
app.use("/quartiers", quartierRouter);
app.use("/arrondissements", arrondissementRouter);

export default app;
