"use client"

import React from "react"

const ReportsDateFilter = ({
  dateRange,
  setDateRange,
  customStart,
  setCustomStart,
  customEnd,
  setCustomEnd,
  onRefresh,
}) => {
  return (
    <div className="flex space-x-4">
      <select
        value={dateRange}
        onChange={(e) => setDateRange(e.target.value)}
        className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      >
        <option value="thisMonth">This Month</option>
        <option value="lastMonth">Last Month</option>
        <option value="thisYear">This Year</option>
        <option value="custom">Custom Range</option>
      </select>
      {dateRange === "custom" && (
        <>
          <input
            type="date"
            value={customStart}
            onChange={(e) => setCustomStart(e.target.value)}
            className="px-2 py-2 border border-gray-300 rounded-md"
            placeholder="Start date"
          />
          <input
            type="date"
            value={customEnd}
            onChange={(e) => setCustomEnd(e.target.value)}
            className="px-2 py-2 border border-gray-300 rounded-md"
            placeholder="End date"
          />
        </>
      )}
      <button
        onClick={onRefresh}
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
      >
        Refresh
      </button>
    </div>
  )
}

export default ReportsDateFilter
