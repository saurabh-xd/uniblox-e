import { Router } from "express";
import { allProducts, product, productByCategory } from "../controllers/product.controller.js";



const router = Router()

router.get("/", allProducts)
router.get("/:id", product)
router.get("/categories/:id", productByCategory)

export default router