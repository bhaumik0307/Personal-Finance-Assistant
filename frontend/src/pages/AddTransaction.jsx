"use client"
import React from "react"
import { useState, useCallback } from "react"
import { Link, useNavigate } from "react-router-dom"
import useTransactionStore from "../store/transactionStore"
import PDFUploadSection from "../components/PDFUploadSection"
import ExtractedTransactionsSection from "../components/ExtractedTransactionsSection"
import TransactionTabNavigation from "../components/TransactionTabNavigation"
import TransactionFormFields from "../components/TransactionFormFields"
import TransactionFormActions from "../components/TransactionFormActions"
import SuccessMessage from "../components/SuccessMessage"
import ErrorAlert from "../components/ErrorAlert"
import { validateTransactionForm, formatTransactionData, getInitialFormData } from "../utils/transactionValidation"

const AddTransaction = () => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState("expense")
  const [formData, setFormData] = useState(getInitialFormData())

  const {
    loading,
    error,
    success,
    pdfUploading,
    extractedTransactions,
    showExtractedData,
    extractFromPdf,
    bulkUpload,
    addTransaction,
    resetExtracted,
    resetMessages,
  } = useTransactionStore()

  // PDF upload handler
  const handlePdfUpload = useCallback(
    (event) => {
      const file = event.target.files[0]
      if (file) {
        extractFromPdf(file)
      }
    },
    [extractFromPdf],
  )

  // Bulk upload handler
  const handleBulkUpload = useCallback(() => {
    bulkUpload(navigate)
  }, [bulkUpload, navigate])

  // Form input change handler
  const handleInputChange = useCallback((e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }, [])

  // Tab change handler
  const handleTabChange = useCallback(
    (tab) => {
      setActiveTab(tab)
      setFormData((prev) => ({ ...prev, category: "" }))
      resetMessages()
    },
    [resetMessages],
  )

  // Form submit handler
  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault()
      resetMessages()

      const validation = validateTransactionForm(formData)
      if (!validation.isValid) {
        useTransactionStore.setState({ error: validation.error })
        return
      }

      const transactionData = formatTransactionData(formData, activeTab)
      addTransaction(transactionData, activeTab, resetForm, navigate)
    },
    [formData, activeTab, addTransaction, navigate, resetMessages],
  )

  // Reset form handler
  const resetForm = useCallback(() => {
    setFormData(getInitialFormData())
    resetMessages()
  }, [resetMessages])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <Link to="/dashboard" className="text-gray-600 hover:text-gray-900 transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Add Transaction</h1>
                <p className="text-gray-600">Record your income or expense</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* PDF Upload Section */}
        <PDFUploadSection onUpload={handlePdfUpload} uploading={pdfUploading} />

        {/* Extracted Transactions Preview */}
        {showExtractedData && (
          <ExtractedTransactionsSection
            transactions={extractedTransactions}
            loading={loading}
            onBulkUpload={handleBulkUpload}
          />
        )}

        {/* Manual Transaction Form */}
        <div className="bg-white rounded-xl shadow-sm border">
          <div className="p-6 border-b">
            <h2 className="text-lg font-semibold text-gray-900">Manual Entry</h2>
            <p className="text-gray-600">Add individual transactions manually</p>
          </div>

          {/* Tab Navigation */}
          <TransactionTabNavigation activeTab={activeTab} onTabChange={handleTabChange} />

          {/* Success Message */}
          {success && <SuccessMessage message={success} />}

          {/* Error Message */}
          {error && (
            <div className="p-4 bg-red-50 border-b border-red-200">
              <ErrorAlert error={error} onClose={resetMessages} />
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6">
            <TransactionFormFields formData={formData} activeTab={activeTab} onChange={handleInputChange} />
            <TransactionFormActions
              activeTab={activeTab}
              loading={loading}
              onReset={resetForm}
              onSubmit={handleSubmit}
            />
          </form>
        </div>
      </main>
    </div>
  )
}

export default AddTransaction
