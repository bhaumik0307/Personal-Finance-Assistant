"use client"

import React from "react"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const DailyExpensesChart = ({ data, formatCurrency }) => {
  if (!data || data.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md border p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Daily Expenses (Current Month)</h3>
        <div className="h-80 flex items-center justify-center text-gray-500">No daily expense data available</div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-md border p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Daily Expenses (Current Month)</h3>
      </div>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="date" stroke="#6b7280" />
            <YAxis stroke="#6b7280" tickFormatter={(value) => `₹${value}`} />
            <Tooltip
              formatter={(value) => [formatCurrency(value), "Amount"]}
              labelFormatter={(label) => `Day ${label}`}
            />
            <Area type="monotone" dataKey="amount" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.3} strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default DailyExpensesChart
