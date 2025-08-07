
import React from "react";
const ExtractedTransactionsTable = ({ transactions }) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(amount)
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-IN")
  }

  return (
    <div className="max-h-96 overflow-y-auto">
      <table className="w-full text-sm">
        <thead className="bg-gray-50 sticky top-0">
          <tr>
            <th className="px-4 py-2 text-left font-medium text-gray-700">Date</th>
            <th className="px-4 py-2 text-left font-medium text-gray-700">Description</th>
            <th className="px-4 py-2 text-left font-medium text-gray-700">Type</th>
            <th className="px-4 py-2 text-left font-medium text-gray-700">Category</th>
            <th className="px-4 py-2 text-right font-medium text-gray-700">Amount</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {transactions.map((transaction, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="px-4 py-2">{formatDate(transaction.date)}</td>
              <td className="px-4 py-2 max-w-xs truncate" title={transaction.description}>
                {transaction.description}
              </td>
              <td className="px-4 py-2">
                <span
                  className={`px-2 py-1 text-xs rounded-full ${
                    transaction.type === "income" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                  }`}
                >
                  {transaction.type}
                </span>
              </td>
              <td className="px-4 py-2">{transaction.category}</td>
              <td className="px-4 py-2 text-right font-medium">{formatCurrency(transaction.amount)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ExtractedTransactionsTable
