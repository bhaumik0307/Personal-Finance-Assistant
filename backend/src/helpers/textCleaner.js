/**
 * Cleans and formats transaction descriptions
 * @param {string} description - Raw transaction description
 * @returns {string} - Cleaned description
 */
export const cleanDescription = (description) => {
  let cleaned = description
    .replace(/\d{1,3}(?:,\d{3})*(?:\.\d{2})?/g, "") // Remove amounts
    .replace(/\d{12,}/g, "") // Remove long reference numbers
    .replace(/[A-Z]{4}\d+/g, "") // Remove bank codes
    .replace(/\b\d{6,}\b/g, "") // Remove 6+ digit numbers
    .replace(/-{2,}/g, "") // Remove multiple dashes
    .replace(/\s+/g, " ") // Replace multiple spaces with single space
    .trim()

  // Clean up UPI and bank-specific patterns
  cleaned = cleaned
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
  cleaned = cleaned
    .replace(/\s+/g, " ")
    .replace(/^[-\s]+|[-\s]+$/g, "")
    .substring(0, 100)

  return cleaned
}

/**
 * Checks if a line should be skipped during parsing
 * @param {string} line - Line to check
 * @returns {boolean} - True if line should be skipped
 */
export const shouldSkipLine = (line) => {
  if (!line || line.length < 8) return true

  const skipPatterns = [
    "Date",
    "Narration",
    "Page No",
    "HDFC BANK",
    "Account No",
    "Statement of account",
    "MRBHAUMIK CHAUHAN",
    "JOINT HOLDERS",
    "Closing Balance",
    "Withdrawal Amt",
    "Deposit Amt",
    "Value Dt",
    "Chq./Ref.No",
    "Generated On",
    "This is a computer",
    "STATEMENT SUMMARY",
    "Opening Balance",
  ]

  return skipPatterns.some((pattern) => line.includes(pattern))
}

/**
 * Checks if description is valid for a transaction
 * @param {string} description - Description to validate
 * @returns {boolean} - True if description is valid
 */
export const isValidDescription = (description) => {
  if (description.length < 3) return false
  if (/^[\d\s\-.@]+$/.test(description)) return false

  const invalidPatterns = ["page no", "statement", "generated"]
  return !invalidPatterns.some((pattern) => description.toLowerCase().includes(pattern))
}
