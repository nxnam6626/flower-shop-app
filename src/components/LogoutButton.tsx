'use client'

import { signOut } from 'next-auth/react'
import { LogOut } from 'lucide-react'

export default function LogoutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: '/login' })}
      className="flex items-center gap-2 text-sm text-gray-600 hover:text-red-600 transition px-3 py-2 rounded-lg hover:bg-red-50"
    >
      <LogOut size={18} />
      <span className="hidden sm:inline">Đăng xuất</span>
    </button>
  )
}
