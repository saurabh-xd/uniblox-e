import express from "express";
import cors from "cors";
import cartRoutes from "./routes/cart.routes.js";
import orderRoutes from "./routes/order.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import authRoutes from "./routes/auth.routes.js"
import cookieParser from "cookie-parser"

const app = express();

app.use(cors());
app.use(cookieParser())
app.use(express.json());

app.use("/api/auth", authRoutes)
app.use("/api/cart", cartRoutes);
app.use("/api", orderRoutes);
app.use("/api/admin", adminRoutes);

export { app };
