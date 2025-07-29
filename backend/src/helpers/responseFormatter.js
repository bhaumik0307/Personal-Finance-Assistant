/**
 * Formats successful PDF parsing response
 * @param {Array} transactions - Parsed transactions
 * @returns {Object} - Formatted response object
 */
export const formatSuccessResponse = (transactions) => {
  return {
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
  }
}

/**
 * Formats error response based on error type
 * @param {Error} error - Error object
 * @returns {Object} - Formatted error response
 */
export const formatErrorResponse = (error) => {
  if (error.code === "LIMIT_FILE_SIZE") {
    return {
      success: false,
      message: "File too large. Please upload a PDF smaller than 10MB.",
    }
  }

  if (error.message === "Only PDF files are allowed") {
    return {
      success: false,
      message: "Only PDF files are allowed. Please upload a valid PDF file.",
    }
  }

  return {
    success: false,
    message: "Failed to parse PDF. Please ensure it's a valid bank statement and try again.",
    error: process.env.NODE_ENV === "development" ? error.message : undefined,
  }
}
