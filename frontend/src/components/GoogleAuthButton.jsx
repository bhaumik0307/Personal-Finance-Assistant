
import React from "react";
import { Button } from "../components/ui/Button"
import { GoogleIcon } from "../components/GoogleIcon"
import LoadingSpinner from "./LoadingSpinner"

const GoogleAuthButton = ({ onClick, loading, loadingText = "Please wait...", children, variant = "outline" }) => (
  <Button
    onClick={onClick}
    variant={variant}
    className="w-full h-12 text-base bg-transparent hover:bg-gray-50"
    disabled={loading}
  >
    {loading ? (
      <div className="flex items-center space-x-2">
        <LoadingSpinner size="5" color="blue" />
        <span>{loadingText}</span>
      </div>
    ) : (
      <>
        <GoogleIcon />
        {children}
      </>
    )}
  </Button>
)

export default GoogleAuthButton
