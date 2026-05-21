import express from "express";
import { addCart, getCart } from "../controllers/cart.controller.js";

const router = express.Router();

router.post("/add", addCart);
router.get("/", getCart);

export default router;