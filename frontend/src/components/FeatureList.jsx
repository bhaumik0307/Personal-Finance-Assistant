"use client"
import React from "react";
const FeatureItem = ({ children, iconColor = "text-green-500" }) => (
  <div className="flex items-center space-x-3 text-sm text-gray-600">
    <svg className={`w-5 h-5 ${iconColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
    <span>{children}</span>
  </div>
)

const FeatureList = ({ title, features, iconColor }) => (
  <div className="space-y-3">
    {title && <h3 className="text-sm font-medium text-gray-900 text-center">{title}</h3>}
    <div className="space-y-3">
      {features.map((feature, index) => (
        <FeatureItem key={index} iconColor={iconColor}>
          {feature}
        </FeatureItem>
      ))}
    </div>
  </div>
)

export default FeatureList
