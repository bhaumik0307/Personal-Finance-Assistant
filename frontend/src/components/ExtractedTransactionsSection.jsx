
import React from "react";
import ExtractedTransactionsTable from "./ExtractedTransactionsTable"
import LoadingSpinner from "./LoadingSpinner"

const ExtractedTransactionsSection = ({ transactions, loading, onBulkUpload }) => {
  if (!transactions || transactions.length === 0) return null

  return (
    <div className="bg-white rounded-xl shadow-sm border">
      <div className="p-6 border-b">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Extracted Transactions</h2>
            <p className="text-gray-600">Review and upload {transactions.length} transactions</p>
          </div>
          <button
            onClick={onBulkUpload}
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
          >
            {loading ? (
              <div className="flex items-center space-x-2">
                <LoadingSpinner color="white" />
                <span>Uploading...</span>
              </div>
            ) : (
              "Upload All Transactions"
            )}
          </button>
        </div>
      </div>
      <div className="p-6">
        <ExtractedTransactionsTable transactions={transactions} />
      </div>
    </div>
  )
}

export default ExtractedTransactionsSection
