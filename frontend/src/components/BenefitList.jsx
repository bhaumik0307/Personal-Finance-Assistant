"use client"
import React from "react";
const BenefitItem = ({ children }) => (
  <div className="flex items-center space-x-3 text-sm text-gray-600">
    <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
      <svg className="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
    </div>
    <span>{children}</span>
  </div>
)

const BenefitList = ({ title, benefits }) => (
  <div className="space-y-3">
    {title && <h3 className="text-sm font-medium text-gray-900 text-center">{title}</h3>}
    <div className="space-y-3">
      {benefits.map((benefit, index) => (
        <BenefitItem key={index}>{benefit}</BenefitItem>
      ))}
    </div>
  </div>
)

export default BenefitList
