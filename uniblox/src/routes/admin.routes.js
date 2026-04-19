import express from "express";
import { generateDiscount, stats } from "../controllers/admin.controller.js";

const router = express.Router();

router.post("/generate-discount", generateDiscount);
router.get("/stats", stats);

export default router;