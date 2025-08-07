import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import TransactionTable from "../components/TransactionTable";
import Pagination from "../components/Pagination";
import TransactionSummaryCards from "../components/TransactionSummaryCards";
import axios from "../utils/axios";

const SharedTransactions = () => {
    const [user, setUser] = useState({});
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchParams] = useSearchParams();

    const [currentPage, setCurrentPage] = useState(1)
    

    useEffect(() => {
        const fetchSharedTransactions = async () => {
            const token = searchParams.get("token");
            if (!token) {
                setError("Invalid or missing token.");
                setLoading(false);
                return;
            }

            try {
                const response = await axios.get(`/api/transactions/shared?token=${token}`);
                setUser(response.data.user);
                setTransactions(response.data.transactions);
            } catch (err) {
                setError("Failed to fetch shared transactions.");
            } finally {
                setLoading(false);
            }
        };

        fetchSharedTransactions();
    }, [searchParams]);


    const itemsPerPage = 20
    const totalPages = Math.ceil(transactions.length / itemsPerPage)


    if (loading) return <div className="text-center mt-4">Loading...</div>;
    if (error) return <div className="text-center mt-4 text-red-500">{error}</div>;

    return (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Shared Transactions</h1>
              <p className="text-gray-600 mt-2">
                {user.name && `You are seeing ${user.name}'s transactions. `}
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

        <TransactionTable
          transactions={transactions}
          loading={loading}
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          totalTransactions={transactions?.length || 0}
          shared={true}
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
    );
};

export default SharedTransactions;