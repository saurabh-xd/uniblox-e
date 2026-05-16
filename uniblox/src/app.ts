import express from "express";
import cors from "cors";
import cartRoutes from "./routes/cart.routes.js";
import orderRoutes from "./routes/order.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import authRoutes from "./routes/auth.routes.js"
import cookieParser from "cookie-parser"
import productRoutes from "./routes/product.routes.js"

const app = express();

//express middleware fun, runs on evry incoming req

app.use(cors());    //Used to enable Cross-Origin Resource Sharing (CORS) --> in this default allows from any origin
app.use(cookieParser())   //Parses cookies from incoming requests.,,  adds req.cookies
app.use(express.json());    //Parses JSON body ,, adds req.body

app.use("/api/auth", authRoutes)
app.use("/api/cart", cartRoutes);
app.use("/api", orderRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/product", productRoutes)

export { app };
