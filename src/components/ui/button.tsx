import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  // 공통 스타일: Flex, 정렬, 둥근 모서리, 간격 등
  "content-stretch flex items-center justify-center overflow-clip relative transition-colors focus-visible:outline-none disabled:pointer-events-none font-[family-name:var(--body-font-family,'Inter',sans-serif)] font-medium leading-none whitespace-nowrap",
  {
    variants: {
      variant: {
        primary:
          "bg-background-brand text-text-brand-onBrand border border-border-brand hover:bg-background-brand-hover disabled:bg-background-disabled disabled:text-text-disabled-onDisabled disabled:border-border-disabled",
        neutral:
          "bg-background-neutral-tertiary text-text-neutral border border-border-neutral-secondary hover:bg-background-neutral-tertiaryHover disabled:bg-background-disabled disabled:text-text-disabled-onDisabled disabled:border-border-disabled",
        subtle:
          "bg-transparent text-text-neutral border border-transparent hover:border-border-default disabled:text-text-disabled-onDisabled disabled:border-transparent",
      },
      size: {
        medium: "p-3 gap-2 rounded-lg text-base",
        small: "p-2 gap-2 rounded-lg text-sm",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "medium",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /**
   * 버튼 왼쪽 아이콘
   */
  iconStart?: React.ReactNode
  /**
   * 버튼 오른쪽 아이콘
   */
  iconEnd?: React.ReactNode
  /**
   * 버튼 라벨을 children으로 받습니다.
   */
  children?: React.ReactNode
}

export function Button({
  className,
  variant,
  size,
  iconStart,
  iconEnd,
  children,
  ...props
}: ButtonProps) {
  return (
    <button className={cn(buttonVariants({ variant, size, className }))} {...props}>
      {iconStart && <span className="shrink-0 size-4">{iconStart}</span>}
      {children}
      {iconEnd && <span className="shrink-0 size-4">{iconEnd}</span>}
    </button>
  )
}
