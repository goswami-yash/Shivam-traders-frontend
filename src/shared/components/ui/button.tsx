import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  // Base: Focus on high-end typography and micro-interactions
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-semibold ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 active:scale-[0.97]",
  {
    variants: {
      variant: {
        // PRIMARY: Uses a subtle top-to-bottom gradient with an inner white "shine" line
        default:
          "bg-gradient-to-b from-primary/90 to-primary text-primary-foreground shadow-[inset_0_1px_0_0_rgba(255,255,255,0.2),0_1px_2px_0_rgba(0,0,0,0.05)] hover:from-primary hover:to-primary/90 hover:shadow-[0_8px_16px_-6px_rgba(var(--primary),0.35)]",
        
        // SECONDARY: Soft glass-like appearance using the secondary theme color
        secondary:
          "bg-gradient-to-b from-secondary/80 to-secondary text-secondary-foreground border border-secondary shadow-sm hover:from-secondary hover:to-secondary/90",
        
        // DESTRUCTIVE: Sophisticated Red
        destructive:
          "bg-gradient-to-b from-destructive/90 to-destructive text-destructive-foreground shadow-[inset_0_1px_0_0_rgba(255,255,255,0.2)] hover:from-destructive hover:to-destructive/90 hover:shadow-[0_8px_16px_-6px_rgba(var(--destructive),0.35)]",
        
        // OUTLINE: Minimalist
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        
        // GHOST: Clean navigation
        ghost: 
          "hover:bg-accent hover:text-accent-foreground",
        
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-5 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-lg px-8 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }