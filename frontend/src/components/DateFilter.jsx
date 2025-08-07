

import React from "react";

const DateFilter = ({ dateFilters, onDateFilterChange, onClearFilters, filteredCount }) => {
  // Format date
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border p-6 mb-8">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Filter by Date</h3>
        <button onClick={onClearFilters} className="text-blue-600 hover:text-blue-700 text-sm font-medium">
          Clear Filters
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Date From */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">From Date</label>
          <input
            type="date"
            value={dateFilters.dateFrom}
            onChange={(e) => onDateFilterChange("dateFrom", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Date To */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">To Date</label>
          <input
            type="date"
            value={dateFilters.dateTo}
            onChange={(e) => onDateFilterChange("dateTo", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      {/* Active Filters Display */}
      {(dateFilters.dateFrom || dateFilters.dateTo) && (
        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="text-sm text-blue-800">
              <span className="font-medium">Active Filters: </span>
              {dateFilters.dateFrom && <span>From {formatDate(dateFilters.dateFrom)} </span>}
              {dateFilters.dateTo && <span>To {formatDate(dateFilters.dateTo)}</span>}
            </div>
            <span className="text-sm text-blue-600">{filteredCount} transaction(s) found</span>
          </div>
        </div>
      )}
    </div>
  )
}

export default DateFilter
