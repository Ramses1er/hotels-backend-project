import express from "express";
import type { Request, Response } from "express";

const app = express();

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});

app.use("/users", (req: Request, res: Response) => {
  res.send("Users");
});

app.listen(3000);
