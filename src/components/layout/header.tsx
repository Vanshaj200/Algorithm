"use client"

import { Button } from "@/components/ui/button"
import { Bell, User, Search } from "lucide-react"

export function Header() {
  return (
    <header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-6">
      <div className="flex items-center space-x-4">
        <h1 className="text-2xl font-semibold">Celestial AI – Space Data Dashboard</h1>
      </div>
      
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon">
          <Search className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon">
          <User className="h-5 w-5" />
        </Button>
      </div>
    </header>
  )
}
