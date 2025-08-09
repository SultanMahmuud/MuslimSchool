import { UserIcon } from 'lucide-react'
import React from 'react'

const RelativeMenu = ({ user, handleLogout }) => {
  return (
    <div>
      <div className="relative group">
        {/* Trigger */}
        <button className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors">
          <UserIcon className="h-4 w-4" />
          {user.name}
        </button>

        {/* Dropdown menu */}
        <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
          <a
            href="/dashboard"
            className="block px-4 py-2 text-sm hover:bg-gray-100"
          >
            Dashboard
          </a>
          <a
            href="/profile"
            className="block px-4 py-2 text-sm hover:bg-gray-100"
          >
            Profile
          </a>
          <a
            href={`/dashboard/leader-board`}
            className="block px-4 py-2 text-sm hover:bg-gray-100"
          >
            Leaderboard
          </a>
          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
          >
            Logout
          </button>
        </div>
      </div>
 </div>
  )
}

export default RelativeMenu
