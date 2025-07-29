import React from "react"
import { Link } from "react-router-dom"
import { Button } from "../components/ui/Button"

const Home = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold text-gray-900">Welcome to Personal expense Assistant</h1>
        <p className="text-xl text-gray-600">Get started by signing in or creating an account</p>
        <div className="flex gap-4 justify-center">
          <Link to="/login">
            <Button size="lg">Sign In</Button>
          </Link>
          <Link to="/signup">
            <Button variant="outline" size="lg">
              Sign Up
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Home
