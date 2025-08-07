
import React from "react";
import LoadingSpinner from "./LoadingSpinner"

const PDFUploadBox = ({ onUpload, uploading }) => (
  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
    <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" stroke="currentColor" fill="none" viewBox="0 0 48 48">
      <path
        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
    <div className="mb-4">
      <label htmlFor="pdf-upload" className="cursor-pointer">
        <span className="text-blue-600 hover:text-blue-700 font-medium">Upload PDF file</span>
        <input id="pdf-upload" type="file" accept=".pdf" onChange={onUpload} className="hidden" disabled={uploading} />
      </label>
      <p className="text-gray-500 text-sm mt-1">or drag and drop</p>
    </div>
    <p className="text-xs text-gray-500">PDF up to 10MB</p>
    {uploading && (
      <div className="mt-4 flex items-center justify-center space-x-2">
        <LoadingSpinner color="blue" />
        <span className="text-blue-600">Processing PDF...</span>
      </div>
    )}
  </div>
)

export default PDFUploadBox
