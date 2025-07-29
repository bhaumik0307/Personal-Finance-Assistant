import { categorizeTransaction } from "./transactionCategorizer.js"
import { cleanDescription, shouldSkipLine, isValidDescription } from "./textCleaner.js"
import { formatTransactionDate } from "./dateFormatter.js"
import { isIncomeTransaction } from "./incomeDetector.js"
import { extractTransactionAmount } from "./amountExtractor.js"

/**
 * Parses transaction data from PDF text
 * @param {string} text - Raw PDF text
 * @returns {Array} - Array of parsed transactions
 */
export const parseTransactionData = (text) => {
  const transactions = []
  const lines = text.split("\n")

  console.log("Total lines to process:", lines.length)

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim()

    // Skip unwanted lines
    if (shouldSkipLine(line)) {
      continue
    }

    // Look for date pattern at the start (DD/MM/YY)
    const dateMatch = line.match(/^(\d{2}\/\d{2}\/\d{2})/)

    if (dateMatch) {
      try {
        // Extract and format date
        const dateStr = dateMatch[1]
        const transactionDate = formatTransactionDate(dateStr)

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

        // Extract transaction amount
        const transactionAmount = extractTransactionAmount(remainingLine)

        if (transactionAmount === 0) continue

        // Determine if transaction is income
        const isIncome = isIncomeTransaction(remainingLine)

        // Clean and validate description
        const description = cleanDescription(remainingLine)

        if (!isValidDescription(description)) continue

        // Create transaction object
        const type = isIncome ? "income" : "expense"
        const category = type === "expense" ? categorizeTransaction(description) : "Salary"

        const transaction = {
          date: transactionDate,
          description: description,
          amount: transactionAmount,
          type: type,
          category: category,
          paymentMethod: "Bank Transfer",
        }

        transactions.push(transaction)

        console.log(`Extracted: ${transactionDate} - ${description} - ${type} - ₹${transactionAmount}`)
      } catch (error) {
        console.log("Error parsing line:", line, error)
      }
    }
  }

  console.log("Total extracted transactions:", transactions.length)
  return transactions.filter((t) => t.amount > 0 && t.description.length > 2)
}
