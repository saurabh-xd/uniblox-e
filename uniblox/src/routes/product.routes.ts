import { Router } from "express";
import { addProduct, getProduct } from "../controllers/product.controller.js";


const router = Router()

router.post("/add", addProduct)
router.get("/",  getProduct)
router.get("/:id")
router.put("/:id,")
router.delete("/:id")

export default router