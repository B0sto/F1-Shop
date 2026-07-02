import * as React from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"

export type ModalProps = {
  isOpen: boolean
  onClose: () => void
  title: React.ReactNode
  description?: React.ReactNode
  children: React.ReactNode
  footer?: React.ReactNode
  className?: string
  size?: "sm" | "md" | "lg" | "xl" | "full"
  showCloseButton?: boolean
}

const sizeClasses = {
  sm: "sm:max-w-sm",
  md: "sm:max-w-md",
  lg: "sm:max-w-lg",
  xl: "sm:max-w-xl",
  full: "sm:max-w-[95vw] sm:max-h-[95vh]",
}

export function Modal({
  isOpen,
  onClose,
  title,
  description,
  children,
  footer,
  className,
  size = "md",
  showCloseButton = true,
}: ModalProps) {
  // Handle open state changes from the Dialog primitive
  const handleOpenChange = (open: boolean) => {
    if (!open) {
      onClose()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent
        showCloseButton={showCloseButton}
        className={cn(
          "border border-white/10 bg-[#110D0D] font-akshar text-white shadow-2xl rounded-xl",
          sizeClasses[size],
          className
        )}
      >
        <DialogHeader className="space-y-1.5 text-left">
          <DialogTitle className="font-irish text-2xl tracking-wide text-[#F90301]">
            {title}
          </DialogTitle>
          {description && (
            <DialogDescription className="text-[15px] text-[#747474]">
              {description}
            </DialogDescription>
          )}
        </DialogHeader>

        <div className="py-2 text-[16px] leading-relaxed text-white/90">
          {children}
        </div>

        {footer && (
          <DialogFooter className="flex items-center gap-3 sm:justify-end mt-4">
            {footer}
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  )
}
