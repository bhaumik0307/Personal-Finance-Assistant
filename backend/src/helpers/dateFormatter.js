/**
 * Formats date from DD/MM/YY to YYYY-MM-DD
 * @param {string} dateStr - Date string in DD/MM/YY format
 * @returns {string} - Formatted date string
 */
export const formatTransactionDate = (dateStr) => {
  const [day, month, year] = dateStr.split("/")
  const fullYear = Number.parseInt(year) > 50 ? `19${year}` : `20${year}`
  return `${fullYear}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`
}
