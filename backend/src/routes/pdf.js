import express from "express";
import multer from "multer";
import isLoggedIn from "../middleware/isLoggedIn.js";
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const pdf = require('pdf-parse');

const router = express.Router();

// Configure multer for file upload
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "application/pdf") {
      cb(null, true);
    } else {
      cb(new Error("Only PDF files are allowed"), false);
    }
  },
});

// Function to categorize transactions based on description
const categorizeTransaction = (description) => {
  const desc = description.toLowerCase()

  // Food & Dining
  if (
    desc.includes("zomato") ||
    desc.includes("swiggy") ||
    desc.includes("food") ||
    desc.includes("restaurant") ||
    desc.includes("pizza") ||
    desc.includes("hotel") ||
    desc.includes("cafe") ||
    desc.includes("bakehouse") ||
    desc.includes("atta chakki") ||
    desc.includes("rominus") ||
    desc.includes("chaska") ||
    desc.includes("bake house") ||
    desc.includes("moti mahal") ||
    desc.includes("crystal hotel") ||
    desc.includes("prem sweets") ||
    desc.includes("holiday foods")
  ) {
    return "Food & Dining"
  }

  // Transportation
  if (
    desc.includes("irctc") ||
    desc.includes("uber") ||
    desc.includes("ola") ||
    desc.includes("petrol") ||
    desc.includes("fuel") ||
    desc.includes("transport") ||
    desc.includes("filling station") ||
    desc.includes("naini filling")
  ) {
    return "Transportation"
  }

  // Utilities
  if (
    desc.includes("jio") ||
    desc.includes("airtel") ||
    desc.includes("electricity") ||
    desc.includes("water") ||
    desc.includes("gas") ||
    desc.includes("recharge") ||
    desc.includes("reliance")
  ) {
    return "Utilities"
  }

  // Healthcare
  if (
    desc.includes("medical") ||
    desc.includes("hospital") ||
    desc.includes("pharmacy") ||
    desc.includes("doctor") ||
    desc.includes("health") ||
    desc.includes("starhealth") ||
    desc.includes("om medical") ||
    desc.includes("suvi eye") ||
    desc.includes("mahadev medical")
  ) {
    return "Healthcare"
  }

  // Entertainment
  if (
    desc.includes("amazon") ||
    desc.includes("netflix") ||
    desc.includes("prime") ||
    desc.includes("movie") ||
    desc.includes("game") ||
    desc.includes("nov digital") ||
    desc.includes("udemy")
  ) {
    return "Entertainment"
  }

  // Shopping
  if (
    desc.includes("store") ||
    desc.includes("shop") ||
    desc.includes("mart") ||
    desc.includes("bazaar") ||
    desc.includes("kirana") ||
    desc.includes("traders") ||
    desc.includes("enterprises") ||
    desc.includes("ankit traders") ||
    desc.includes("surabhi kirana") ||
    desc.includes("smart bazaar") ||
    desc.includes("shakun bartan") ||
    desc.includes("manish enterprises") ||
    desc.includes("new suman kirana")
  ) {
    return "Shopping"
  }

  return "Other"
}

// Enhanced function to parse HDFC bank statement format
const parseTransactionData = (text) => {
  const transactions = []
  const lines = text.split("\n")

  console.log("Total lines to process:", lines.length)

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim()

    // Skip empty lines, headers, and account info
    if (
      !line ||
      line.includes("Date") ||
      line.includes("Narration") ||
      line.includes("Page No") ||
      line.includes("HDFC BANK") ||
      line.includes("Account No") ||
      line.includes("Statement of account") ||
      line.includes("MRBHAUMIK CHAUHAN") ||
      line.includes("JOINT HOLDERS") ||
      line.includes("Closing Balance") ||
      line.includes("Withdrawal Amt") ||
      line.includes("Deposit Amt") ||
      line.includes("Value Dt") ||
      line.includes("Chq./Ref.No") ||
      line.includes("Generated On") ||
      line.includes("This is a computer") ||
      line.includes("STATEMENT SUMMARY") ||
      line.includes("Opening Balance") ||
      line.length < 8
    ) {
      continue
    }

    // Look for date pattern at the start (DD/MM/YY)
    const dateMatch = line.match(/^(\d{2}\/\d{2}\/\d{2})/)

    if (dateMatch) {
      try {
        // Extract date
        const dateStr = dateMatch[1]
        const [day, month, year] = dateStr.split("/")
        const fullYear = Number.parseInt(year) > 50 ? `19${year}` : `20${year}`
        const transactionDate = `${fullYear}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`

        // Get the rest of the line after the date
        let remainingLine = line.substring(dateMatch[0].length).trim()

        // Look for continuation lines
        let nextLineIndex = i + 1
        while (nextLineIndex < lines.length) {
          const nextLine = lines[nextLineIndex].trim()
          // If next line doesn't start with a date and isn't empty, it's likely a continuation
          if (nextLine && !nextLine.match(/^\d{2}\/\d{2}\/\d{2}/) && !nextLine.includes("Page No")) {
            remainingLine += " " + nextLine
            nextLineIndex++
          } else {
            break
          }
        }

        // Update the loop counter to skip processed lines
        i = nextLineIndex - 1

        // Extract all numbers that could be amounts
        const numberPattern = /(\d{1,3}(?:,\d{3})*(?:\.\d{2})?)/g
        const numbers = remainingLine.match(numberPattern) || []

        if (numbers.length >= 1) {
          // Find the transaction amount
          let transactionAmount = 0
          let isIncome = false

          // Check for income indicators in the description
          const incomeKeywords = [
            "imps",
            "neft cr",
            "interest paid",
            "salary",
            "credit",
            "deposit",
            "ravindra chauhan",
            "lic of india",
          ]

          const lowerLine = remainingLine.toLowerCase()
          isIncome = incomeKeywords.some((keyword) => lowerLine.includes(keyword))

          // For HDFC format, typically the transaction amount is one of the larger numbers
          // Try to find the most likely transaction amount
          for (const numStr of numbers) {
            const amount = Number.parseFloat(numStr.replace(/,/g, ""))
            if (amount > 0 && amount < 1000000) {
              // Reasonable transaction limit
              transactionAmount = amount
              break
            }
          }

          // If we couldn't find a reasonable amount, try the first number
          if (transactionAmount === 0 && numbers.length > 0) {
            transactionAmount = Number.parseFloat(numbers[0].replace(/,/g, ""))
          }

          // Extract and clean description
          let description = remainingLine
            .replace(/\d{1,3}(?:,\d{3})*(?:\.\d{2})?/g, "") // Remove amounts
            .replace(/\d{12,}/g, "") // Remove long reference numbers
            .replace(/[A-Z]{4}\d+/g, "") // Remove bank codes
            .replace(/\b\d{6,}\b/g, "") // Remove 6+ digit numbers
            .replace(/-{2,}/g, "") // Remove multiple dashes
            .replace(/\s+/g, " ") // Replace multiple spaces with single space
            .trim()

          // Clean up UPI and bank-specific patterns
          description = description
            .replace(/^UPI-/, "")
            .replace(/^IMPS-/, "")
            .replace(/^NEFT-/, "")
            .replace(/^ATW-/, "")
            .replace(/^DEBIT CARD/, "")
            .replace(/-$/, "")
            .replace(/PAYTM.*$/i, "")
            .replace(/@.*$/i, "")
            .replace(/HDFC.*$/i, "")
            .replace(/YESB.*$/i, "")
            .replace(/SBIN.*$/i, "")
            .replace(/ICIC.*$/i, "")
            .replace(/UTIB.*$/i, "")
            .replace(/PUNB.*$/i, "")
            .replace(/CNRB.*$/i, "")
            .replace(/BARB.*$/i, "")
            .replace(/IDIB.*$/i, "")
            .replace(/KKBK.*$/i, "")
            .replace(/IBKL.*$/i, "")
            .replace(/SENT.*$/i, "")
            .replace(/PAY.*$/i, "")
            .replace(/UPI.*$/i, "")
            .replace(/NA$/i, "")
            .replace(/PAYMENT FROM PHONE$/i, "")
            .replace(/SENT FROM PAYTM$/i, "")
            .replace(/SENT USING PAYTM.*$/i, "")
            .replace(/COLLECT TRANSACTIO$/i, "")
            .trim()

          // Further clean up common patterns
          description = description
            .replace(/\s+/g, " ")
            .replace(/^[-\s]+|[-\s]+$/g, "")
            .substring(0, 100)

          // Skip if description is too short or just symbols/numbers
          if (description.length < 3 || /^[\d\s\-.@]+$/.test(description)) {
            continue
          }

          // Skip duplicate or invalid entries
          if (
            description.toLowerCase().includes("page no") ||
            description.toLowerCase().includes("statement") ||
            description.toLowerCase().includes("generated")
          ) {
            continue
          }

          if (transactionAmount > 0 && description.length > 2) {
            const type = isIncome ? "income" : "expense"
            const category = type === "expense" ? categorizeTransaction(description) : "Salary"

            transactions.push({
              date: transactionDate,
              description: description,
              amount: transactionAmount,
              type: type,
              category: category,
              paymentMethod: "Bank Transfer",
            })

            console.log(`Extracted: ${transactionDate} - ${description} - ${type} - ₹${transactionAmount}`)
          }
        }
      } catch (error) {
        console.log("Error parsing line:", line, error)
      }
    }
  }

  console.log("Total extracted transactions:", transactions.length)
  return transactions.filter((t) => t.amount > 0 && t.description.length > 2)
}

// POST /api/pdf/parse - Parse PDF and extract transactions
router.post("/parse", isLoggedIn, upload.single("pdf"), async (req, res) => {
  try {
    console.log("PDF parse request received");

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No PDF file uploaded",
      });
    }

    console.log("File received:", {
      originalname: req.file.originalname,
      mimetype: req.file.mimetype,
      size: req.file.size,
    });

    const data = await pdf(req.file.buffer);
    const fullText = data.text;

    console.log("Extracted text length:", fullText.length);

    if (!fullText || fullText.length < 100) {
      return res.status(400).json({
        success: false,
        message: "Could not extract text from PDF. Please ensure it's a valid bank statement.",
      });
    }

    const transactions = parseTransactionData(fullText);

    if (transactions.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No transactions found in the PDF. Please make sure it's a valid HDFC bank statement.",
        debug: {
          textLength: fullText.length,
          sampleText: fullText.substring(0, 500),
        },
      });
    }

    console.log(`Successfully extracted ${transactions.length} transactions`);

    res.json({
      success: true,
      message: `Successfully extracted ${transactions.length} transactions from PDF`,
      data: {
        transactions: transactions,
        totalCount: transactions.length,
        summary: {
          income: transactions.filter((t) => t.type === "income").length,
          expenses: transactions.filter((t) => t.type === "expense").length,
          totalAmount: transactions.reduce((sum, t) => sum + t.amount, 0),
        },
      },
    });
  } catch (error) {
    console.error("PDF parsing error:", error);

    if (error.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({
        success: false,
        message: "File too large. Please upload a PDF smaller than 10MB.",
      });
    }

    if (error.message === "Only PDF files are allowed") {
      return res.status(400).json({
        success: false,
        message: "Only PDF files are allowed. Please upload a valid PDF file.",
      });
    }

    res.status(500).json({
      success: false,
      message: "Failed to parse PDF. Please ensure it's a valid bank statement and try again.",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
});

export default router;
