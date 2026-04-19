import express from "express";
import cors from "cors";
import cartRoutes from "./routes/cart.routes.js";
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/cart", cartRoutes);

export { app };