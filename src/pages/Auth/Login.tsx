// src/pages/Auth/Login.tsx
'use client'

import { useState } from 'react'
import AuthCard from '../../components/common/AuthCard'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import { Label } from '../../components/ui/label'
import SafeIcon from '../../components/common/SafeIcon'
import { toast } from 'sonner'

interface LoginFormData {
  email: string
  password: string
}

interface LoginResponse {
  token: string
  user: {
    id: string
    firstName: string
    role: 'Learner' | 'Instructor' | 'Admin'
  }
}

// ✅ Props interface for Login
interface LoginProps {
  onLogin?: (role: 'Learner' | 'Instructor' | 'Admin') => void
  goSignup?: () => void
}

export default function Login({ onLogin, goSignup }: LoginProps) {
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
  })
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<Partial<LoginFormData>>({})

  const validateForm = (): boolean => {
    const newErrors: Partial<LoginFormData> = {}

    if (!formData.email) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email'
    }

    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    if (errors[name as keyof LoginFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!validateForm()) return

    setIsLoading(true)

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Login failed')
      }

      const data: LoginResponse = await response.json()

      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(data.user))

      toast.success('Login successful! Redirecting...')

      // Call onLogin callback if provided
      if (onLogin) onLogin(data.user.role)
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Login failed. Please try again.'
      toast.error(errorMessage)
      setErrors({ email: errorMessage })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthCard
      title="Welcome Back"
      description="Sign in to your LearnHub account"
      footer={
        <div className="text-center text-sm text-muted-foreground">
          Don't have an account?{' '}
          <button
            type="button"
            onClick={goSignup}
            className="font-semibold text-primary hover:underline"
          >
            Sign up
          </button>
        </div>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email Field */}
        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-medium">
            Email Address
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="you@example.com"
            value={formData.email}
            onChange={handleChange}
            disabled={isLoading}
            className={errors.email ? 'border-destructive' : ''}
            autoComplete="email"
          />
          {errors.email && (
            <p className="text-xs text-destructive flex items-center gap-1">
              <SafeIcon name="AlertCircle" size={14} />
              {errors.email}
            </p>
          )}
        </div>

        {/* Password Field */}
        <div className="space-y-2">
          <Label htmlFor="password" className="text-sm font-medium">
            Password
          </Label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="••••••••"
            value={formData.password}
            onChange={handleChange}
            disabled={isLoading}
            className={errors.password ? 'border-destructive' : ''}
            autoComplete="current-password"
          />
          {errors.password && (
            <p className="text-xs text-destructive flex items-center gap-1">
              <SafeIcon name="AlertCircle" size={14} />
              {errors.password}
            </p>
          )}
        </div>

        {/* Forgot Password Link */}
        <div className="text-right">
          <a href="#" className="text-xs text-primary hover:underline">
            Forgot password?
          </a>
        </div>

        {/* Submit Button */}
        <Button type="submit" disabled={isLoading} className="w-full gap-2" size="lg">
          {isLoading ? (
            <>
              <SafeIcon name="Loader2" size={16} className="animate-spin" />
              Signing in...
            </>
          ) : (
            <>
              <SafeIcon name="LogIn" size={16} />
              Sign In
            </>
          )}
        </Button>

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
          </div>
        </div>

        {/* Social Login Buttons */}
        <div className="grid grid-cols-2 gap-2">
          <Button type="button" variant="outline" disabled={isLoading} className="gap-2">
            <SafeIcon name="Github" size={16} />
            <span className="hidden sm:inline">GitHub</span>
          </Button>
          <Button type="button" variant="outline" disabled={isLoading} className="gap-2">
            <SafeIcon name="Mail" size={16} />
            <span className="hidden sm:inline">Google</span>
          </Button>
        </div>
      </form>
    </AuthCard>
  )
}
