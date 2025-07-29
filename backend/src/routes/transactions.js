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

const router = express.Router();


// GET /api/transactions - Get latest 100 transactions for logged-in user
router.get("/", isLoggedIn, getLatestTransactions);

// GET /api/transactions/user/:userid?start=YYYY-MM-DD&end=YYYY-MM-DD
router.get("/user/:userid", isLoggedIn, getTransactionsByUserAndDate);

// POST /api/transactions - Create new transaction
router.post("/", isLoggedIn, createTransaction);

// POST /api/transactions/pdf/parse - Parse PDF and extract transactions
router.post("/pdf/parse", isLoggedIn, upload.single("pdf"), parsePDF);

// DELETE /api/transactions/:id - Delete transaction
router.delete("/:id", isLoggedIn, deleteTransaction);

export default router;
