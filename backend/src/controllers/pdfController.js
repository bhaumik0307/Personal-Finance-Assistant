import { createRequire } from "module"
import { parseTransactionData } from "../helpers/transactionParser.js"
import { formatSuccessResponse, formatErrorResponse } from "../helpers/responseFormatter.js"

const require = createRequire(import.meta.url)
const pdf = require("pdf-parse")

/**
 * Parse PDF and extract transactions
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const parsePDF = async (req, res) => {
  try {
    // Check if file was uploaded
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No PDF file uploaded",
      })
    }

    // Extract text from PDF
    const data = await pdf(req.file.buffer)
    const fullText = data.text

    // Validate extracted text
    if (!fullText || fullText.length < 100) {
      return res.status(400).json({
        success: false,
        message: "Could not extract text from PDF. Please ensure it's a valid bank statement.",
      })
    }

    // Parse transactions from text
    const transactions = parseTransactionData(fullText)

    // Check if any transactions were found
    if (transactions.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No transactions found in the PDF. Please make sure it's a valid HDFC bank statement.",
        debug: {
          textLength: fullText.length,
          sampleText: fullText.substring(0, 500),
        },
      })
    }
    // Return successful response
    res.json(formatSuccessResponse(transactions))
  } catch (error) {

    const errorResponse = formatErrorResponse(error)
    const statusCode = error.code === "LIMIT_FILE_SIZE" || error.message === "Only PDF files are allowed" ? 400 : 500

    res.status(statusCode).json(errorResponse)
  }
}
