/**
 * Determines if a transaction is income based on description
 * @param {string} description - Transaction description
 * @returns {boolean} - True if transaction is income
 */
export const isIncomeTransaction = (description) => {
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

  const lowerDescription = description.toLowerCase()
  return incomeKeywords.some((keyword) => lowerDescription.includes(keyword))
}
