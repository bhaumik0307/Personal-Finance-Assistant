
import React from "react";
import { Link } from "react-router-dom"
import { Button } from "../components/ui/Button"

const QuickActionButton = ({ to, children, variant = "default" }) => (
  <Link to={to}>
    <Button
      variant={variant}
      className={variant === "outline" ? "w-full bg-transparent" : "w-full bg-blue-600 hover:bg-blue-700"}
    >
      {children}
    </Button>
  </Link>
)

export default QuickActionButton
