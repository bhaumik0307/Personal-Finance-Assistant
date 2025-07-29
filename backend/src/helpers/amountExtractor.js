/**
 * Extracts transaction amount from text
 * @param {string} text - Text containing amounts
 * @returns {number} - Extracted amount
 */
export const extractTransactionAmount = (text) => {
  const numberPattern = /(\d{1,3}(?:,\d{3})*(?:\.\d{2})?)/g
  const numbers = text.match(numberPattern) || []

  if (numbers.length === 0) return 0

  // Find the most likely transaction amount
  for (const numStr of numbers) {
    const amount = Number.parseFloat(numStr.replace(/,/g, ""))
    if (amount > 0 && amount < 1000000) {
      // Reasonable transaction limit
      return amount
    }
  }

  // If we couldn't find a reasonable amount, try the first number
  return Number.parseFloat(numbers[0].replace(/,/g, ""))
}
