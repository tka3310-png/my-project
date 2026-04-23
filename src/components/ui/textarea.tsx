import * as React from "react"
import { cn } from "@/lib/utils"

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  description?: string
  error?: string
  hasError?: boolean
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    { className, label, description, error, hasError, disabled, ...props },
    ref
  ) => {
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
          <p className="leading-tight text-base text-text-secondary">
            {description}
          </p>
        )}

        {/* Textarea Wrapper */}
        <div
          className={cn(
            "flex w-full relative overflow-hidden rounded-lg border border-solid transition-colors",
            "px-4 py-3",
            !disabled && !hasError &&
              "bg-background-default border-border-default focus-within:border-border-brand",
            !disabled && hasError &&
              "bg-background-default border-border-danger",
            disabled && "bg-background-disabled border-border-disabled"
          )}
        >
          <textarea
            className={cn(
              "flex-1 bg-transparent w-full text-base leading-relaxed outline-none resize-none placeholder:text-text-tertiary",
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
              "leading-tight text-sm",
              hasError ? "text-text-danger-default" : "text-text-default"
            )}
          >
            {error}
          </p>
        )}
      </div>
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea }
