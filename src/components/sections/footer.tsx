import * as React from "react"
import { cn } from "@/lib/utils"
import { Twitter, Instagram, Youtube, Linkedin } from "lucide-react"

export interface FooterProps {
  className?: string
}

const footerLinks = [
  {
    title: "Use cases",
    links: [
      "UI design",
      "UX design",
      "Wireframing",
      "Diagramming",
      "Brainstorming",
      "Online whiteboard",
      "Team collaboration",
    ],
  },
  {
    title: "Explore",
    links: [
      "Design",
      "Prototyping",
      "Development features",
      "Design systems",
      "Collaboration features",
      "Design process",
      "FigJam",
    ],
  },
  {
    title: "Resources",
    links: [
      "Blog",
      "Best practices",
      "Colors",
      "Color wheel",
      "Support",
      "Developers",
      "Resource library",
    ],
  },
]

export function Footer({ className }: FooterProps) {
  return (
    <footer
      className={cn(
        "bg-background-default border-t border-border-default",
        "flex flex-col md:flex-row md:flex-wrap items-start w-full",
        "px-8 py-8 pb-40 md:gap-4 lg:gap-16",
        className
      )}
    >
      {/* Brand & Social */}
      <div className="flex flex-col gap-6 items-start w-full md:w-[262px] mb-12 md:mb-0">
        {/* Logo Placeholder */}
        <div className="w-10 h-9 bg-background-neutral-tertiary rounded-md flex items-center justify-center font-bold text-text-default">
          F
        </div>
        <div className="flex items-center gap-4 text-text-default">
          <a href="#" aria-label="Twitter">
            <Twitter className="w-6 h-6 hover:text-text-brand-onBrand transition-colors" />
          </a>
          <a href="#" aria-label="Instagram">
            <Instagram className="w-6 h-6 hover:text-text-brand-onBrand transition-colors" />
          </a>
          <a href="#" aria-label="YouTube">
            <Youtube className="w-6 h-6 hover:text-text-brand-onBrand transition-colors" />
          </a>
          <a href="#" aria-label="LinkedIn">
            <Linkedin className="w-6 h-6 hover:text-text-brand-onBrand transition-colors" />
          </a>
        </div>
      </div>

      {/* Link Columns */}
      {footerLinks.map((section) => (
        <div
          key={section.title}
          className="flex flex-col gap-3 items-start w-full md:w-[262px] mb-8 md:mb-0"
        >
          <div className="pb-4 w-full">
            <h3 className="font-semibold text-base text-text-default">
              {section.title}
            </h3>
          </div>
          {section.links.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase().replace(/ /g, "-")}`}
              className="text-base text-text-default hover:text-text-brand-onBrand transition-colors leading-[1.4]"
            >
              {link}
            </a>
          ))}
        </div>
      ))}
    </footer>
  )
}
