"use client"
import React from "react";
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import useAuthStore from "../store/authStore"
import AuthLoadingScreen from "../components/AuthLoadingScreen"
import AuthCard from "../components/AuthCard"
import GoogleAuthButton from "../components/GoogleAuthButton"
import AuthDivider from "../components/AuthDivider"
import BenefitList from "../components/BenefitList"
import AuthNavigation from "../components/AuthNavigation"
import TermsAndPrivacy from "../components/TermsAndPrivacy"
import ErrorAlert from "../components/ErrorAlert"

const Signup = () => {
  const navigate = useNavigate()
  const { loading, authLoading, error, checkAuth, loginWithGoogle, clearError } = useAuthStore()

  useEffect(() => {
    checkAuth(() => navigate("/dashboard"))
  }, [navigate, checkAuth])

  if (loading) {
    return <AuthLoadingScreen />
  }

  const signupIcon = (
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
      />
    </svg>
  )

  const benefits = [
    "Complete expense and income tracking",
    "Beautiful charts and financial reports",
    "Budget management and goal setting",
    "Secure data with Google authentication",
  ]

  return (
    <AuthCard
      icon={signupIcon}
      iconBgColor="bg-green-100"
      iconColor="text-green-600"
      title="Create Account"
      description="Join Personal Finance Assistant and start managing your money"
    >
      {/* Google Signup Button */}
      <GoogleAuthButton onClick={loginWithGoogle} loading={authLoading} loadingText="Creating account...">
        Sign up with Google
      </GoogleAuthButton>

      {/* Error Message */}
      {error && <ErrorAlert error={error} onClose={clearError} />}

      {/* Divider */}
      <AuthDivider text="Get Started Today" />

      {/* Benefits */}
      <BenefitList title="What you'll get:" benefits={benefits} />

      {/* Terms and Privacy */}
      <TermsAndPrivacy />

      {/* Navigation Links */}
      <AuthNavigation primaryText="Already have an account?" primaryLink="/login" primaryLinkText="Sign in here" />
    </AuthCard>
  )
}

export default Signup
