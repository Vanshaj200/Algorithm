"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { 
  Home, 
  Database, 
  Brain, 
  BarChart3, 
  Settings,
  Star
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const navigation = [
  { name: "Home", href: "/", icon: Home },
  { name: "Data Hub", href: "/data-hub", icon: Database },
  { name: "AI Analysis", href: "/ai-analysis", icon: Brain },
  { name: "Visualization", href: "/visualization", icon: BarChart3 },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="flex h-full w-64 flex-col bg-white border-r border-gray-200 shadow-sm">
      <div className="flex h-16 items-center px-6 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <Star className="h-8 w-8 text-blue-600" />
          <span className="text-xl font-bold text-gray-900">Celestial AI</span>
        </div>
      </div>
      
      <nav className="flex-1 space-y-1 px-3 py-6">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link key={item.name} href={item.href}>
              <Button
                variant={isActive ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start text-gray-700 hover:text-gray-900 hover:bg-gray-100",
                  isActive && "bg-blue-50 text-blue-700 hover:bg-blue-100 hover:text-blue-800"
                )}
              >
                <item.icon className="mr-3 h-4 w-4" />
                {item.name}
              </Button>
            </Link>
          )
        })}
      </nav>
      
      <div className="border-t border-gray-200 p-3">
        <Button variant="ghost" className="w-full justify-start text-gray-700 hover:text-gray-900 hover:bg-gray-100">
          <Settings className="mr-3 h-4 w-4" />
          Settings
        </Button>
      </div>
    </div>
  )
}
