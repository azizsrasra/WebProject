
'use client'

import { useState } from 'react'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import { Label } from '../../components/ui/label'
import AuthCard from '../../components/common/AuthCard'
import SafeIcon from '../../components/common/SafeIcon'

interface SignupFormData {
  firstName: string
  lastName: string
  email: string
  password: string
  confirmPassword: string

}
interface SignupFormProps {
  goLogin?: () => void
}
interface SignupError {
  field?: string
  message: string
}

export default function SignupForm({ goLogin }: SignupFormProps) {
  const [formData, setFormData] = useState<SignupFormData>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  const [errors, setErrors] = useState<SignupError[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const validateForm = (): boolean => {
    const newErrors: SignupError[] = []

    if (!formData.firstName.trim()) {
      newErrors.push({ field: 'firstName', message: 'First name is required' })
    }

    if (!formData.lastName.trim()) {
      newErrors.push({ field: 'lastName', message: 'Last name is required' })
    }

    if (!formData.email.trim()) {
      newErrors.push({ field: 'email', message: 'Email is required' })
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.push({ field: 'email', message: 'Please enter a valid email address' })
    }

    if (!formData.password) {
      newErrors.push({ field: 'password', message: 'Password is required' })
    } else if (formData.password.length < 8) {
      newErrors.push({ field: 'password', message: 'Password must be at least 8 characters' })
    }

    if (!formData.confirmPassword) {
      newErrors.push({ field: 'confirmPassword', message: 'Please confirm your password' })
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.push({ field: 'confirmPassword', message: 'Passwords do not match' })
    }

    setErrors(newErrors)
    return newErrors.length === 0
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
    // Clear error for this field when user starts typing
    setErrors(prev => prev.filter(err => err.field !== name))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsLoading(true)

    try {
      // Simulate API call to signup endpoint
      // In production, this would call: POST /api/auth/signup
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        setErrors([{ message: errorData.message || 'Signup failed. Please try again.' }])
        return
      }

      const data = await response.json()

      // Store token and user info (in production, use AuthContext)
      if (data.token && data.user) {
        localStorage.setItem('authToken', data.token)
        localStorage.setItem('user', JSON.stringify(data.user))

        // Redirect to protected dashboard
        window.location.href = './protected-dashboard.html'
      }
    } catch (error) {
      setErrors([{ message: 'An error occurred. Please try again.' }])
      console.error('Signup error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const getFieldError = (fieldName: string): string | undefined => {
    return errors.find(err => err.field === fieldName)?.message
  }

  const generalError = errors.find(err => !err.field)

  return (
    <AuthCard
      title="Create Account"
      description="Join LearnHub and start learning today"
      footer={
        <div className="space-y-4">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-muted"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">Already have an account?</span>
            </div>
          </div>
           <Button
    type="button"
    variant="outline"
    className="w-full"
    onClick={() => {
      if (goLogin) goLogin()
      else window.location.href = './login-page.html'
    }}
  >
    Log In
  </Button>
        </div>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* General Error Message */}
        {generalError && (
          <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive flex items-start gap-2">
            <SafeIcon name="AlertCi rcle" className="h-4 w-4 mt-0.5 flex-shrink-0" />
            <span>{generalError.message}</span>
          </div>
        )}

        {/* First Name Field */}
        <div className="space-y-2">
          <Label htmlFor="firstName" className="text-sm font-medium">
            First Name
          </Label>
          <Input
            id="firstName"
            name="firstName"
            type="text"
            placeholder="John"
            value={formData.firstName}
            onChange={handleChange}
            disabled={isLoading}
            className={getFieldError('firstName') ? 'border-destructive' : ''}
            autoComplete="given-name"
          />
          {getFieldError('firstName') && (
            <p className="text-xs text-destructive flex items-center gap-1">
              <SafeIcon name="AlertCircle" className="h-3 w-3" />
              {getFieldError('firstName')}
            </p>
          )}
        </div>

        {/* Last Name Field */}
        <div className="space-y-2">
          <Label htmlFor="lastName" className="text-sm font-medium">
            Last Name
          </Label>
          <Input
            id="lastName"
            name="lastName"
            type="text"
            placeholder="Doe"
            value={formData.lastName}
            onChange={handleChange}
            disabled={isLoading}
            className={getFieldError('lastName') ? 'border-destructive' : ''}
            autoComplete="family-name"
          />
          {getFieldError('lastName') && (
            <p className="text-xs text-destructive flex items-center gap-1">
              <SafeIcon name="AlertCircle" className="h-3 w-3" />
              {getFieldError('lastName')}
            </p>
          )}
        </div>

        {/* Email Field */}
        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-medium">
            Email Address
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="john@example.com"
            value={formData.email}
            onChange={handleChange}
            disabled={isLoading}
            className={getFieldError('email') ? 'border-destructive' : ''}
            autoComplete="email"
          />
          {getFieldError('email') && (
            <p className="text-xs text-destructive flex items-center gap-1">
              <SafeIcon name="AlertCircle" className="h-3 w-3" />
              {getFieldError('email')}
            </p>
          )}
        </div>

        {/* Password Field */}
        <div className="space-y-2">
          <Label htmlFor="password" className="text-sm font-medium">
            Password
          </Label>
          <div className="relative">
            <Input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              disabled={isLoading}
              className={`pr-10 ${getFieldError('password') ? 'border-destructive' : ''}`}
              autoComplete="new-password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              disabled={isLoading}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground disabled:opacity-50"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              <SafeIcon
                name={showPassword ? 'EyeOff' : 'Eye'}
                className="h-4 w-4"
              />
            </button>
          </div>
          {getFieldError('password') && (
            <p className="text-xs text-destructive flex items-center gap-1">
              <SafeIcon name="AlertCircle" className="h-3 w-3" />
              {getFieldError('password')}
            </p>
          )}
          <p className="text-xs text-muted-foreground">
            Must be at least 8 characters long
          </p>
        </div>

        {/* Confirm Password Field */}
        <div className="space-y-2">
          <Label htmlFor="confirmPassword" className="text-sm font-medium">
            Confirm Password
          </Label>
          <div className="relative">
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="••••••••"
              value={formData.confirmPassword}
              onChange={handleChange}
              disabled={isLoading}
              className={`pr-10 ${getFieldError('confirmPassword') ? 'border-destructive' : ''}`}
              autoComplete="new-password"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              disabled={isLoading}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground disabled:opacity-50"
              aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
            >
              <SafeIcon
                name={showConfirmPassword ? 'EyeOff' : 'Eye'}
                className="h-4 w-4"
              />
            </button>
          </div>
          {getFieldError('confirmPassword') && (
            <p className="text-xs text-destructive flex items-center gap-1">
              <SafeIcon name="AlertCircle" className="h-3 w-3" />
              {getFieldError('confirmPassword')}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full"
          disabled={isLoading}
          size="lg"
        >
          {isLoading ? (
            <>
              <SafeIcon name="Loader2" className="mr-2 h-4 w-4 animate-spin" />
              Creating Account...
            </>
          ) : (
            <>
              <SafeIcon name="UserPlus" className="mr-2 h-4 w-4" />
              Sign Up
            </>
          )}
        </Button>

        {/* Terms and Privacy */}
        <p className="text-xs text-center text-muted-foreground">
          By signing up, you agree to our{' '}
          <a href="#" className="underline hover:text-foreground">
            Terms of Service
          </a>{' '}
          and{' '}
          <a href="#" className="underline hover:text-foreground">
            Privacy Policy
          </a>
        </p>
      </form>
    </AuthCard>
  )
}
