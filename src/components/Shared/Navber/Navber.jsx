'use client'

import * as React from "react"
import Link from "next/link"
import { useState } from "react"
import {
  MenuIcon,
  XIcon,
  BellIcon,
  LogInIcon,
  CircleHelpIcon,
  CircleCheckIcon,
  CircleIcon
} from "lucide-react"

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

// 1. Define menu items
const menuItems = [
  { label: "আমাদের সম্পর্কে", href: "/" },
  { label: "কোর্স", href: "/components" },
  { label: "লাইভ ব্যাচ", href: "/docs" },
  { label: "প্রাইসিং", href: "/docs" },
  { label: "টিচার", href: "/docs" },
  { label: "ভর্তি ফর্ম", href: "/docs" },
  { label: "যোগাযোগ", href: "/docs" },
]

const tasksSubMenu = [
  { label: "Backlog", icon: <CircleHelpIcon className="h-4 w-4" />, href: "#" },
  { label: "To Do", icon: <CircleIcon className="h-4 w-4" />, href: "#" },
  { label: "Done", icon: <CircleCheckIcon className="h-4 w-4" />, href: "#" },
]

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="w-full px-4 py-3 shadow-sm border-b bg-white dark:bg-black">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="text-3xl font-extrabold text-primary">
          <Link href="/">MyLogo</Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center justify-center">
          <NavigationMenu viewport={false}>
            <NavigationMenuList className="gap-1">
              {menuItems.map((item, idx) => (
                <NavigationMenuItem key={idx}>
                  <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                    <Link href={item.href} className="font-bold text-lg">
                      {item.label}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}

              <NavigationMenuItem>
                <NavigationMenuTrigger >আরও</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[100px] gap-2 p-2">
                    {tasksSubMenu.map((task, idx) => (
                      <li key={idx}>
                        <NavigationMenuLink asChild>
                          <Link
                            href={task.href}
                            className="flex gap-2 p-2 rounded-md hover:bg-muted font-bold text-base"
                          >
                            
                            {task.label}
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/login"
              className="flex items-center gap-1 text-sm font-medium hover:text-primary transition-colors"
            >
              <LogInIcon className="h-5 w-5" />
              Login
            </Link>
            <button className="relative">
              <BellIcon className="h-5 w-5 hover:text-primary transition-colors" />
              <span className="absolute top-0 right-0 inline-block w-2 h-2 bg-red-500 rounded-full" />
            </button>
          </div>

          {/* Mobile hamburger */}
          <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden">
            {mobileOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden mt-2 space-y-2 px-4 pb-4">
          {menuItems.map((item, idx) => (
            <Link
              key={idx}
              href={item.href}
              className="block py-2 font-bold text-lg hover:text-primary"
            >
              {item.label}
            </Link>
          ))}

          {/* Mobile submenu items */}
          <div className="border-t pt-2">
            <p className="font-bold text-base mb-1">Tasks</p>
            {tasksSubMenu.map((task, idx) => (
              <Link
                key={idx}
                href={task.href}
                className="flex items-center gap-2 py-1 text-base font-medium hover:text-primary"
              >
                {task.icon}
                {task.label}
              </Link>
            ))}
          </div>

          {/* Login & Notifications */}
          <div className="border-t pt-2">
            <Link href="/login" className="flex items-center gap-2 text-base py-2 hover:text-primary">
              <LogInIcon className="h-4 w-4" />
              Login
            </Link>
            <div className="flex items-center gap-2 py-2">
              <BellIcon className="h-4 w-4" />
              Notifications
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
