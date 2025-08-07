"use client"

import React, { useState, useEffect, useMemo } from "react"
import useTransactionStore from "../store/transactionStore"
import TransactionSummaryCards from "../components/TransactionSummaryCards"
import DateFilter from "../components/DateFilter"
import TransactionTable from "../components/TransactionTable"
import Pagination from "../components/Pagination"
import DeleteModal from "../components/DeleteModal"
import ErrorAlert from "../components/ErrorAlert"
import useAuthStore from "../store/authStore"
import ShareButton from "../components/ShareButton"

const AllTransactions = () => {
  const { user, loading: userLoading, fetchCurrentUser } = useAuthStore()
  const [dateFilters, setDateFilters] = useState({
    dateFrom: "",
    dateTo: "",
  })
  const [sortBy, setSortBy] = useState("date")
  const [sortOrder, setSortOrder] = useState("desc")
  const [currentPage, setCurrentPage] = useState(1)
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  const {
    transactions,
    loading,
    error,
    selectedTransactions,
    deleteLoading,
    fetchUserTransactions,
    deleteTransactions,
    selectTransaction,
    selectAllTransactions,
    clearSelection,
    resetMessages,
  } = useTransactionStore()

  const itemsPerPage = 20

  // Fetch current user on component mount
  useEffect(() => {
    const loadUser = async () => {
      try {
        await fetchCurrentUser()
      } catch (error) {
        console.error("Failed to fetch user:", error)
      }
    }

    if (!user) {
      loadUser()
    }
  }, [fetchCurrentUser, user])

  // Fetch user transactions when user is available and filters change
  useEffect(() => {
    const loadTransactions = async () => {
      if (user?._id || user?.id) {
        const userId = user._id || user.id
        console.log("Fetching transactions for user:", userId)
        await fetchUserTransactions(userId, dateFilters.dateFrom, dateFilters.dateTo)
        console.log("Transactions loaded:", transactions)
      }
    }

    loadTransactions()
  }, [user, dateFilters.dateFrom, dateFilters.dateTo, fetchUserTransactions])

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [dateFilters, sortBy, sortOrder])

  // Handle date filter changes
  const handleDateFilterChange = (key, value) => {
    setDateFilters((prev) => ({ ...prev, [key]: value }))
  }

  // Handle delete transactions
  const handleDeleteTransactions = async () => {
    try {
      const result = await deleteTransactions(selectedTransactions)
      setShowDeleteModal(false)

      if (result.successCount > 0) {
        console.log(`Successfully deleted ${result.successCount} transaction(s)`)
      }
    } catch (error) {
      console.error("Failed to delete transactions:", error)
    }
  }

  // Clear date filters
  const clearDateFilters = () => {
    setDateFilters({
      dateFrom: "",
      dateTo: "",
    })
  }

  // Calculate pagination
  const totalPages = Math.ceil(transactions.length / itemsPerPage)

  // Show loading while user data is being fetched
  if (userLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading user data...</p>
        </div>
      </div>
    )
  }

  // Show message if no user is found
  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Please log in to view your transactions.</p>
          <button
            onClick={() => (window.location.href = "/login")}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go to Login
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">All Transactions</h1>
              <p className="text-gray-600 mt-2">
                {user.name && `Welcome back, ${user.name}! `}
                Showing {transactions.length} transactions
              </p>
            </div>
            {user.profilePicture && (
              <div className="flex items-center space-x-3">
                <img
                  src={user.profilePicture || "/placeholder.svg"}
                  alt={user.name || "User"}
                  className="w-10 h-10 rounded-full"
                />
                {user.email && <span className="text-sm text-gray-600">{user.email}</span>}
              </div>
            )}
          </div>
        </div>

        {/* Summary Cards */}
        <TransactionSummaryCards transactions={transactions} />

        {/* Date Filters */}
        <DateFilter
          dateFilters={dateFilters}
          onDateFilterChange={handleDateFilterChange}
          onClearFilters={clearDateFilters}
          filteredCount={transactions.length}
        />

        <ShareButton />

        {/* Error Message */}
        <ErrorAlert error={error} onClose={resetMessages} />

        {/* Transactions Table */}
        <TransactionTable
          transactions={transactions}
          loading={loading}
          selectedTransactions={selectedTransactions}
          onSelectTransaction={selectTransaction}
          onSelectAll={selectAllTransactions}
          onDeleteSelected={() => setShowDeleteModal(true)}
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          totalTransactions={transactions?.length || 0}
        />

        {/* Pagination */}
        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            itemsPerPage={itemsPerPage}
            totalItems={transactions.length}
            onPageChange={setCurrentPage}
          />
        )}
      </main>

      {/* Delete Confirmation Modal */}
      <DeleteModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDeleteTransactions}
        selectedCount={selectedTransactions.length}
        isLoading={deleteLoading}
      />
    </div>
  )
}

export default AllTransactions
