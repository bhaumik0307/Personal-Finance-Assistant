import React, { useState } from "react";
import axios from "../utils/axios";

const ShareButton = () => {
    const [shareableLink, setShareableLink] = useState("");
    const [isCopied, setIsCopied] = useState(false);

    const generateShareableLink = async () => {
        try {
            const response = await axios.post("/generate-shareable-link");
            setShareableLink(response.data.shareableLink);
            setIsCopied(false); // Reset copy status
        } catch (error) {
            console.error("Error generating shareable link:", error);
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(shareableLink);
        setIsCopied(true);
    };

    return (
        <div className="mt-6 flex flex-col items-center gap-6 p-6 bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl border border-slate-200 shadow-sm max-w-md mx-auto">
            <button
                className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:shadow-lg transform hover:scale-[1.02] transition-all duration-300 ease-out focus:outline-none focus:ring-4 focus:ring-emerald-200 active:scale-[0.98]"
                onClick={generateShareableLink}
            >
                <span className="flex items-center justify-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                    </svg>
                    Share Transactions
                </span>
            </button>
            
            {shareableLink && (
                <div className="w-full space-y-3 animate-in slide-in-from-top-2 duration-300">
                    <div className="text-center">
                        <p className="text-sm font-medium text-slate-700 mb-1">Your shareable link is ready!</p>
                        <p className="text-xs text-slate-500">Copy and share with others to view your transactions</p>
                    </div>
                    
                    <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-slate-200 shadow-sm">
                        <input
                            type="text"
                            value={shareableLink}
                            readOnly
                            className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-md text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent selection:bg-emerald-100"
                        />
                        <button
                            className={`px-4 py-2 rounded-md font-medium text-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 min-w-[80px] ${
                                isCopied 
                                    ? "bg-emerald-500 hover:bg-emerald-600 text-white shadow-md focus:ring-emerald-500 transform scale-105" 
                                    : "bg-slate-600 hover:bg-slate-700 text-white shadow-sm hover:shadow-md focus:ring-slate-500 hover:scale-105"
                            }`}
                            onClick={copyToClipboard}
                        >
                            {isCopied ? (
                                <span className="flex items-center justify-center gap-1">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    Copied!
                                </span>
                            ) : (
                                <span className="flex items-center justify-center gap-1">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                    </svg>
                                    Copy
                                </span>
                            )}
                        </button>
                    </div>
                    
                    <div className="flex items-center justify-center gap-2 text-xs text-slate-500">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                        <span>Secure link • Expires in 24 hours</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ShareButton;