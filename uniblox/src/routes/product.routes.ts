import { Router } from "express";
import { addProduct, deleteProduct, getOneProduct, getProduct, updateProduct } from "../controllers/product.controller.js";


const router = Router()

router.post("/add", addProduct)
router.get("/",  getProduct)
router.get("/:id", getOneProduct)
router.put("/:id,", updateProduct)
router.delete("/:id", deleteProduct)

export default router