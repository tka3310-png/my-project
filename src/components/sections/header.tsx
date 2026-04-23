"use client"

import * as React from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export interface HeaderProps {
  className?: string
}

const navLinks = [
  "Products",
  "Solutions",
  "Community",
  "Resources",
  "Pricing",
  "Contact",
]

export function Header({ className }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)

  return (
    <header
      className={cn(
        "bg-background-default border-b border-border-default",
        "flex flex-col md:flex-row md:items-center md:justify-between",
        "w-full px-6 py-4 md:py-6 md:px-8",
        className
      )}
    >
      {/* Top bar (Logo & Mobile Toggle) */}
      <div className="flex items-center justify-between w-full md:w-auto">
        <div className="flex items-center gap-2">
          {/* Logo Placeholder (Figma Logo) */}
          <div className="w-10 h-9 bg-background-neutral-tertiary rounded-md flex items-center justify-center font-bold text-text-default">
            F
          </div>
        </div>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden p-2 rounded-full hover:bg-background-neutral-tertiary transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Navigation & Auth (Desktop and Mobile Open) */}
      <div
        className={cn(
          "flex-col md:flex-row w-full md:w-auto gap-6 mt-8 md:mt-0",
          isMobileMenuOpen ? "flex" : "hidden md:flex"
        )}
      >
        <nav className="flex flex-col md:flex-row items-center md:items-start gap-2 w-full md:w-auto">
          {navLinks.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className={cn(
                "w-full md:w-auto px-4 py-2 rounded-lg text-center md:text-left transition-colors",
                "text-text-default hover:bg-background-brand-tertiary"
              )}
            >
              {link}
            </a>
          ))}
        </nav>

        {/* Auth Buttons */}
        <div className="flex flex-row gap-3 w-full md:w-[178px]">
          <Button variant="neutral" className="flex-1" size="medium">
            Sign in
          </Button>
          <Button variant="primary" className="flex-1" size="medium">
            Register
          </Button>
        </div>
      </div>
    </header>
  )
}
