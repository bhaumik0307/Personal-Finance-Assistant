import { create } from "zustand"
import axios from "../utils/axios"

const useTransactionStore = create((set, get) => ({
  loading: false,
  error: "",
  success: "",
  pdfUploading: false,
  extractedTransactions: [],
  showExtractedData: false,
  transactions: [],
  selectedTransactions: [],
  deleteLoading: false,

  // Fetch transactions for a user, with optional date filtering
  fetchUserTransactions: async (userId, start, end) => {
    set({ loading: true, error: "" })
    try {
      const params = {
        limit: 1000,
        sortBy: "date",
        sortOrder: "desc",
      }
      if (start) params.start = start
      if (end) params.end = end
      const response = await axios.get(`/api/transactions/user/${userId}`, { params })
      if (response.data.success) {
        set({ transactions: response.data.data })
      } else {
        set({ error: "Failed to fetch transactions" })
      }
    } catch (error) {
      set({ error: "Failed to load transaction data" })
    } finally {
      set({ loading: false })
    }
  },


  // Delete transactions
  deleteTransactions: async (transactionIds) => {
    set({ deleteLoading: true, error: "" })
    try {
      const deletePromises = transactionIds.map(async (id) => {
        try {
          await axios.delete(`/api/transactions/${id}`)
          return { success: true, id }
        } catch (error) {
          return { success: false, id, error }
        }
      })

      const results = await Promise.all(deletePromises)
      const successfulDeletes = results.filter((r) => r.success).map((r) => r.id)
      const failedDeletes = results.filter((r) => !r.success)

      if (failedDeletes.length > 0) {
        set({ error: `Failed to delete ${failedDeletes.length} transaction(s)` })
      }

      // Remove successfully deleted transactions from local state
      if (successfulDeletes.length > 0) {
        set((state) => ({
          transactions: state.transactions.filter((t) => !successfulDeletes.includes(t._id)),
          selectedTransactions: [],
        }))
      }

      return { successCount: successfulDeletes.length, failedCount: failedDeletes.length }
    } catch (error) {
      set({ error: "Failed to delete transactions" })
      return { successCount: 0, failedCount: transactionIds.length }
    } finally {
      set({ deleteLoading: false })
    }
  },

  // Selection management
  setSelectedTransactions: (transactions) => set({ selectedTransactions: transactions }),

  selectTransaction: (transactionId) => {
    set((state) => ({
      selectedTransactions: state.selectedTransactions.includes(transactionId)
        ? state.selectedTransactions.filter((id) => id !== transactionId)
        : [...state.selectedTransactions, transactionId],
    }))
  },

  selectAllTransactions: (transactionIds) => {
    set((state) => ({
      selectedTransactions: state.selectedTransactions.length === transactionIds.length ? [] : transactionIds,
    }))
  },

  clearSelection: () => set({ selectedTransactions: [] }),

  // Extract transactions from PDF
  extractFromPdf: async (file) => {
    if (!file || file.type !== "application/pdf") {
      set({ error: "Please select a valid PDF file" })
      return
    }
    set({ pdfUploading: true, error: "", success: "" })
    try {
      const formData = new FormData()
      formData.append("pdf", file)
      const response = await axios.post("/api/transactions/pdf/parse", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        timeout: 30000,
      })
      if (response.data.success) {
        const { transactions, totalCount, summary } = response.data.data
        set({
          extractedTransactions: transactions,
          showExtractedData: true,
          success: `Successfully extracted ${totalCount} transactions from PDF! (${summary.income} income, ${summary.expenses} expenses)`,
        })
      } else {
        set({ error: response.data.message || "Failed to parse PDF" })
      }
    } catch (error) {
      if (error.response?.status === 413) {
        set({ error: "File too large. Please upload a PDF smaller than 10MB." })
      } else if (error.response?.data?.message) {
        set({ error: error.response.data.message })
      } else if (error.code === "ECONNABORTED") {
        set({ error: "Upload timeout. Please try with a smaller PDF file." })
      } else {
        set({ error: "Failed to upload and parse PDF. Please try again." })
      }
    } finally {
      set({ pdfUploading: false })
    }
  },

  // Bulk upload extracted transactions
  bulkUpload: async (navigate) => {
    const { extractedTransactions } = get()
    if (extractedTransactions.length === 0) return
    set({ loading: true, error: "", success: "" })
    try {
      const batchSize = 10
      let successCount = 0
      for (let i = 0; i < extractedTransactions.length; i += batchSize) {
        const batch = extractedTransactions.slice(i, i + batchSize)
        const promises = batch.map((transaction) => axios.post("/api/transactions", transaction))
        const results = await Promise.allSettled(promises)
        successCount += results.filter((result) => result.status === "fulfilled").length
      }
      set({
        success: `Successfully uploaded ${successCount} out of ${extractedTransactions.length} transactions!`,
        extractedTransactions: [],
        showExtractedData: false,
      })
      setTimeout(() => {
        if (navigate) navigate("/all-transactions")
      }, 2000)
    } catch (error) {
      set({ error: "Failed to upload some transactions. Please try again." })
    } finally {
      set({ loading: false })
    }
  },

  // Add a single transaction
  addTransaction: async (transactionData, activeTab, resetForm, navigate) => {
    set({ loading: true, error: "", success: "" })
    try {
      const response = await axios.post("/api/transactions", transactionData)
      if (response.data.success) {
        set({
          success: `${activeTab === "income" ? "Income" : "Expense"} added successfully!`,
        })
        if (resetForm) resetForm()
        setTimeout(() => {
          if (navigate) navigate("/all-transactions")
        }, 2000)
      }
    } catch (error) {
      set({ error: error.response?.data?.message || `Failed to add ${activeTab}. Please try again.` })
    } finally {
      set({ loading: false })
    }
  },

  // Reset extracted data
  resetExtracted: () => set({ extractedTransactions: [], showExtractedData: false, success: "", error: "" }),
  // Reset all messages
  resetMessages: () => set({ error: "", success: "" }),
}))

export default useTransactionStore
