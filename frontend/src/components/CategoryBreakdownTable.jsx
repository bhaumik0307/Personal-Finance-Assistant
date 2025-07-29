"use client"

import React from "react"

const CategoryBreakdownTable = ({ data, stats, formatCurrency }) => {
  if (!data || data.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md border">
        <div className="p-6 border-b">
          <h3 className="text-lg font-semibold text-gray-900">Category Breakdown</h3>
        </div>
        <div className="p-6 text-center text-gray-500">No category data available</div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-md border">
      <div className="p-6 border-b">
        <h3 className="text-lg font-semibold text-gray-900">Category Breakdown</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Income</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Expenses
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Net Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Percentage
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((item) => (
              <tr key={item.category} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-blue-500 rounded-full mr-3"></div>
                    <span className="text-sm font-medium text-gray-900">{item.category}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">{formatCurrency(item.income)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600">{formatCurrency(item.expense)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <span className={item.income - item.expense >= 0 ? "text-green-600" : "text-red-600"}>
                    {formatCurrency(item.income - item.expense)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {((item.total / (stats.totalIncome + stats.totalExpenses)) * 100).toFixed(1)}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default CategoryBreakdownTable
