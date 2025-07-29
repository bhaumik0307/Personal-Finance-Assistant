"use client"
import React from "react";
import PDFUploadBox from "./PDFUploadBox"

const PDFUploadSection = ({ onUpload, uploading }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border">
      <div className="p-6 border-b">
        <h2 className="text-lg font-semibold text-gray-900 mb-2">Upload Bank Statement</h2>
        <p className="text-gray-600">
          Upload a PDF bank statement to automatically extract and add multiple transactions
        </p>
      </div>
      <div className="p-6">
        <PDFUploadBox onUpload={onUpload} uploading={uploading} />
      </div>
    </div>
  )
}

export default PDFUploadSection
