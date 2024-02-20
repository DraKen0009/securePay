import express from "express";
import getBalance from "../controllers/accountControllers/balance.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import transferAmount from "../controllers/accountControllers/transfer.js";

const router = express.Router()

router.get('/balance',authMiddleware,getBalance)
router.post('/transfer',authMiddleware,transferAmount)

export default router