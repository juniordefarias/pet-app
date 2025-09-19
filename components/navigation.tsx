"use client"

import { Home, Calendar, User, Settings, ShoppingBag } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const navigationItems = [
  {
    name: "Pets",
    href: "/pets",
    icon: Home,
  },
  {
    name: "Calendário",
    href: "/calendar",
    icon: Calendar,
  },
  {
    name: "Loja",
    href: "/loja",
    icon: ShoppingBag,
  },
  {
    name: "Perfil",
    href: "/profile",
    icon: User,
  },
  {
    name: "Configurações",
    href: "/settings",
    icon: Settings,
  },
]

export function Navigation() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border/50 px-4 py-2 z-50">
      <div className="max-w-md mx-auto">
        <div className="flex items-center justify-around">
          {navigationItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href

            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex flex-col items-center gap-1 p-2 rounded-lg transition-colors",
                  isActive ? "text-white bg-primary" : "text-muted-foreground hover:text-foreground hover:bg-muted/50",
                )}
              >
                <Icon className="w-5 h-5" />
                <span className="text-xs font-medium">{item.name}</span>
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
