export const getDateRange = (option) => {
    const now = new Date()
    let start, end
    switch (option) {
      case "thisMonth":
        start = new Date(now.getFullYear(), now.getMonth(), 1)
        end = new Date(now.getFullYear(), now.getMonth() + 1, 0)
        break
      case "lastMonth":
        start = new Date(now.getFullYear(), now.getMonth() - 1, 1)
        end = new Date(now.getFullYear(), now.getMonth(), 0)
        break
      case "thisYear":
        start = new Date(now.getFullYear(), 0, 1)
        end = new Date(now.getFullYear(), 11, 31)
        break
      default:
        start = null
        end = null
    }
    return {
      start: start ? start.toISOString().split("T")[0] : "",
      end: end ? end.toISOString().split("T")[0] : "",
    }
  }
  
  export const calculateStats = (transactions) => {
    const income = transactions.filter((t) => t.type === "income").reduce((sum, t) => sum + t.amount, 0)
    const expenses = transactions.filter((t) => t.type === "expense").reduce((sum, t) => sum + t.amount, 0)
    return {
      totalIncome: income,
      totalExpenses: expenses,
      balance: income - expenses,
      transactionCount: transactions.length,
      avgTransaction: transactions.length > 0 ? (income + expenses) / transactions.length : 0,
      savingsRate: income > 0 ? ((income - expenses) / income) * 100 : 0,
    }
  }
  
  export const getCategoryBreakdown = (transactions) => {
    const categoryTotals = {}
  
    transactions.forEach((transaction) => {
      if (!categoryTotals[transaction.category]) {
        categoryTotals[transaction.category] = {
          category: transaction.category,
          income: 0,
          expense: 0,
          total: 0,
        }
      }
  
      if (transaction.type === "income") {
        categoryTotals[transaction.category].income += transaction.amount
      } else {
        categoryTotals[transaction.category].expense += transaction.amount
      }
  
      categoryTotals[transaction.category].total += transaction.amount
    })
  
    return Object.values(categoryTotals)
      .sort((a, b) => b.total - a.total)
      .slice(0, 8) // Top 8 categories
  }
  
  export const getMonthlyTrends = (transactions) => {
    const monthlyData = {}
  
    transactions.forEach((transaction) => {
      const date = new Date(transaction.date)
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`
      const monthName = date.toLocaleDateString("en-US", { month: "short", year: "numeric" })
  
      if (!monthlyData[monthKey]) {
        monthlyData[monthKey] = {
          month: monthName,
          income: 0,
          expenses: 0,
          transactions: 0,
        }
      }
  
      if (transaction.type === "income") {
        monthlyData[monthKey].income += transaction.amount
      } else {
        monthlyData[monthKey].expenses += transaction.amount
      }
  
      monthlyData[monthKey].transactions += 1
    })
  
    return Object.values(monthlyData)
      .sort((a, b) => new Date(a.month) - new Date(b.month))
      .slice(-12) // Last 12 months
  }
  
  export const getDailyExpenses = (transactions) => {
    const currentMonth = new Date().getMonth()
    const currentYear = new Date().getFullYear()
  
    const dailyData = {}
  
    transactions
      .filter((t) => {
        const date = new Date(t.date)
        return date.getMonth() === currentMonth && date.getFullYear() === currentYear && t.type === "expense"
      })
      .forEach((transaction) => {
        const day = new Date(transaction.date).getDate()
        const dayKey = String(day).padStart(2, "0")
  
        if (!dailyData[dayKey]) {
          dailyData[dayKey] = {
            date: dayKey,
            amount: 0,
          }
        }
  
        dailyData[dayKey].amount += transaction.amount
      })
  
    return Object.values(dailyData).sort((a, b) => Number.parseInt(a.date) - Number.parseInt(b.date))
  }
  
  export const getExpensesByCategory = (transactions) => {
    const categoryTotals = {}
    const colors = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6", "#06B6D4", "#84CC16", "#F97316"]
  
    transactions
      .filter((t) => t.type === "expense")
      .forEach((transaction) => {
        if (!categoryTotals[transaction.category]) {
          categoryTotals[transaction.category] = {
            category: transaction.category,
            amount: 0,
            color: colors[Object.keys(categoryTotals).length % colors.length],
          }
        }
        categoryTotals[transaction.category].amount += transaction.amount
      })
  
    const total = Object.values(categoryTotals).reduce((sum, cat) => sum + cat.amount, 0)
  
    return Object.values(categoryTotals)
      .map((cat) => ({
        ...cat,
        percentage: total > 0 ? Math.round((cat.amount / total) * 100) : 0,
      }))
      .sort((a, b) => b.amount - a.amount)
      .slice(0, 6) // Top 6 categories
  }
  
  export const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(value)
  }
  