import * as React from "react"
import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  description?: string
  error?: string
  hasError?: boolean
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, description, error, hasError, disabled, ...props }, ref) => {
    return (
      <div className={cn("flex flex-col gap-2 items-start relative w-full", className)}>
        {/* Label */}
        {label && (
          <label
            className={cn(
              "font-medium leading-tight text-base",
              disabled ? "text-text-disabled-default" : "text-text-default"
            )}
          >
            {label}
          </label>
        )}

        {/* Description */}
        {description && (
          <p
            className={cn(
              "leading-tight text-base",
              "text-text-secondary"
            )}
          >
            {description}
          </p>
        )}

        {/* Input Wrapper */}
        <div
          className={cn(
            "flex items-center w-full relative overflow-hidden rounded-lg border border-solid transition-colors",
            "px-4 py-3 min-w-[120px]",
            // 기본 상태
            !disabled && !hasError && "bg-background-default border-border-default focus-within:border-border-brand",
            // 에러 상태
            !disabled && hasError && "bg-background-default border-border-danger",
            // 비활성 상태
            disabled && "bg-background-disabled border-border-disabled"
          )}
        >
          <input
            type={type}
            className={cn(
              "flex-1 bg-transparent w-full text-base leading-none outline-none placeholder:text-text-tertiary",
              disabled ? "text-text-disabled-onDisabled" : "text-text-default"
            )}
            disabled={disabled}
            ref={ref}
            {...props}
          />
        </div>

        {/* Error Message */}
        {error && (
          <p
            className={cn(
              "leading-tight text-base whitespace-nowrap",
              hasError ? "text-text-danger-default" : "text-text-default",
              disabled && "text-text-default" // 비활성화시 에러 컬러 무시(기본 텍스트 색상)
            )}
          >
            {error}
          </p>
        )}
      </div>
    )
  }
)
Input.displayName = "Input"

export { Input }
