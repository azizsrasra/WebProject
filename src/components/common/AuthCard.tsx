// src/components/common/AuthCard.tsx
import React from 'react'

interface AuthCardProps {
  title: string
  description?: string
  footer?: React.ReactNode
  children: React.ReactNode
}

export default function AuthCard({ title, description, footer, children }: AuthCardProps) {
  return (
    <div className="bg-card border border-border rounded-lg p-8 shadow-soft max-w-md mx-auto">
      {/* Title */}
      <h1 className="text-2xl font-bold mb-2">{title}</h1>

      {/* Optional description */}
      {description && (
        <p className="text-sm text-muted-foreground mb-4">
          {description}
        </p>
      )}

      {/* Children content (form) */}
      {children}

      {/* Optional footer */}
      {footer && <div className="mt-4">{footer}</div>}
    </div>
  )
}
