import express from "express";
import isLoggedIn from "../middleware/isLoggedIn.js";
import {
  getLatestTransactions,
  getTransactionsByUserAndDate,
  createTransaction,
  deleteTransaction
} from "../controllers/transaction-controllers.js";
import { upload } from "../config/multerConfig.js"
import { parsePDF } from "../controllers/pdfController.js"
import Token from "../models/Token.js";
import User from "../models/User.js";
import Transaction from "../models/Transaction.js";

const router = express.Router();


// GET /api/transactions - Get latest 100 transactions for logged-in user
// router.get("/", isLoggedIn, getLatestTransactions);

// GET /api/transactions/shared - Get shared transactions using token
router.get("/shared", async (req, res) => {
  const { token } = req.query;

  const tokenData = await Token.findOne({ token });
  if(!tokenData || tokenData.expiration < Date.now()){
    return res.status(401).json({ error: "Invalid or expired token." });
  }

  const transactions = await Transaction.find({ userId: tokenData.userId });
  
  if(!transactions || transactions.length === 0) {
    return res.status(404).json({ error: "No transactions found for this token." });
  }
  const user = await User.findById(tokenData.userId);
  if(!user) {
    return res.status(404).json({ error: "User not found." });
  }
  res.json({ user, transactions });
})

// GET /api/transactions/user/:userid?start=YYYY-MM-DD&end=YYYY-MM-DD
router.get("/user/:userid", isLoggedIn, getTransactionsByUserAndDate);

// POST /api/transactions - Create new transaction
router.post("/", isLoggedIn, createTransaction);

// POST /api/transactions/pdf/parse - Parse PDF and extract transactions
router.post("/pdf/parse", isLoggedIn, upload.single("pdf"), parsePDF);

// DELETE /api/transactions/:id - Delete transaction
router.delete("/:id", isLoggedIn, deleteTransaction);

export default router;
