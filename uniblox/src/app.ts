import express from "express";
import cors from "cors";
import cartRoutes from "./routes/cart.routes.js";
import authRoutes from "./routes/auth.routes.js"
import productRoutes from "./routes/product.routes.js"
import cookieParser from "cookie-parser"
import { authMiddleware } from "./middlewares/auth.middleware.js";


const app = express();

//express middleware fun, runs on evry incoming req

app.use(cors());    //Used to enable Cross-Origin Resource Sharing (CORS) --> in this default allows from any origin
app.use(cookieParser())   //Parses cookies from incoming requests.,,  adds req.cookies
app.use(express.json());    //Parses JSON body ,, adds req.body

//mounting routes
app.use("/api/auth", authRoutes)
app.use("/api/cart", cartRoutes);
app.use("/api/products", productRoutes)

app.get("/me", authMiddleware, (req, res) => {
  return res.json({
    success: true,
    user: req.user,
    message: "nice"
  });
});


export { app };
