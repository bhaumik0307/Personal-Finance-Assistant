
import React from "react";
const UserAvatar = ({ user, size = "24" }) => (
  <div className={`w-${size} h-${size} mx-auto mb-4 relative`}>
    <img
      src={user.photo || `/placeholder.svg?height=${size * 4}&width=${size * 4}&query=user+avatar`}
      alt={`${user.name}'s avatar`}
      className="w-full h-full rounded-full object-cover border-4 border-blue-100"
      onError={(e) => {
        e.target.src = `/placeholder.svg?height=${size * 4}&width=${size * 4}`
      }}
    />
    <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-green-500 rounded-full border-4 border-white flex items-center justify-center">
      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
    </div>
  </div>
)

export default UserAvatar
