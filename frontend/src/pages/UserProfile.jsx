
import React from "react"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "../components/ui/Button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/Card"
import useAuthStore from "../store/authStore"
import AuthLoadingScreen from "../components/AuthLoadingScreen"
import UserAvatar from "../components/UserAvatar"
import AccountInfoItem from "../components/AccountInfoItem"
import QuickActionButton from "../components/QuickActionButton"
import ErrorAlert from "../components/ErrorAlert"
import LoadingSpinner from "../components/LoadingSpinner"

const UserProfile = () => {
  const navigate = useNavigate()
  const { user, loading, error, logout, fetchCurrentUser, clearError } = useAuthStore()
  const [authLoading, setAuthLoading] = useState(false)

  useEffect(() => {
    const loadUserProfile = async () => {
      try {
        // Don't redirect on profile page, just fetch user data
        await fetchCurrentUser()
      } catch (error) {
        console.error("Failed to load user profile:", error)
        // Redirect to login if user fetch fails
        navigate("/login")
      }
    }

    // Only fetch if we don't have user data
    if (!user) {
      loadUserProfile()
    }
  }, [fetchCurrentUser, user, navigate])

  const handleLogout = async () => {
    try {
      setAuthLoading(true)
      await logout()
      navigate("/login")
    } catch (error) {
      console.error("Logout failed:", error)
      alert("Failed to logout. Please try again.")
    } finally {
      setAuthLoading(false)
    }
  }

  // Show loading while fetching user data
  if (loading) {
    return <AuthLoadingScreen text="Loading your profile..." />
  }

  // Redirect to login if no user after loading
  if (!loading && !user) {
    navigate("/login")
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="w-full max-w-2xl mx-auto">
          <CardHeader className="text-center">
            <UserAvatar user={user} />
            <CardTitle className="text-2xl font-bold text-gray-900">Welcome, {user.name}!</CardTitle>
            <CardDescription>Account verified and active</CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* User Information */}
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-3">Account Information</h3>
                <div className="space-y-2">
                  <AccountInfoItem label="Name:" value={user.name} />
                  {user.email && <AccountInfoItem label="Email:" value={user.email} />}
                  <AccountInfoItem
                    label="Account Type:"
                    value={<span className="font-medium text-green-600">Google Account</span>}
                  />
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="space-y-4">
              <h3 className="font-medium text-gray-900">Quick Actions</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <QuickActionButton to="/all-transactions">Go to All Transactions</QuickActionButton>
                <QuickActionButton to="/reports" variant="outline">
                  View Reports
                </QuickActionButton>
              </div>
            </div>

            {/* Error Message */}
            {error && <ErrorAlert error={error} onClose={clearError} />}

            {/* Logout Section */}
            <div className="pt-6 border-t border-gray-200">
              <Button
                onClick={handleLogout}
                variant="outline"
                className="w-full text-red-600 border-red-300 hover:bg-red-50 hover:border-red-400 bg-transparent"
                disabled={authLoading}
              >
                {authLoading ? (
                  <div className="flex items-center space-x-2">
                    <LoadingSpinner size="4" color="red" />
                    <span>Logging out...</span>
                  </div>
                ) : (
                  <>
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                      />
                    </svg>
                    Sign Out
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

export default UserProfile
