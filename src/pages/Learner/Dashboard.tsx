'use client'

import { useEffect, useState } from 'react'
import { Button } from '../../components/ui/button'
import SafeIcon from '../../components/common/SafeIcon'
import DashboardHero from './DashboardHero'
import DashboardLinks from './DashboardLinks'
import { LEARNER_DASHBOARD_HERO, LEARNER_DASHBOARD_LINKS } from '../../data/dashboard'

// Define user roles
export type UserRole = "Learner" | "Instructor" | "Admin" | null

// Props for Dashboard
type DashboardProps = {
  role: UserRole
}

// Mock user data for SSG - will be replaced with actual auth context on client
const MOCK_USER = {
  id: '1',
  firstName: 'John',
  role: 'Learner' as const
}

export default function Dashboard({ role }: DashboardProps) {
  const [user, setUser] = useState(MOCK_USER)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // Simulate checking auth status
    const authToken = localStorage.getItem('authToken')
    if (!authToken) {
      if (typeof window !== 'undefined') {
        window.location.href = '/login'   // ✅ redirect to React Router login route
      }
      return
    }
    
    // Get user from localStorage or auth context
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (e) {
        console.error('Failed to parse user data')
      }
    }
    setIsLoading(false)
  }, [])

  const handleLogout = async () => {
    setIsLoading(true)
    try {
      // Clear auth data
      localStorage.removeItem('authToken')
      localStorage.removeItem('user')
      
      // Redirect to login
      if (typeof window !== 'undefined') {
        window.location.href = '/login'   // ✅ redirect to React Router login route
      }
    } catch (error) {
      console.error('Logout failed:', error)
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <SafeIcon name="GraduationCap" className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">LearnHub</span>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground">
              <SafeIcon name="User" className="h-4 w-4" />
              <span>{user.firstName} ({role ?? "Guest"})</span>
            </div>
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleLogout}
              disabled={isLoading}
              className="gap-2"
            >
              <SafeIcon name="LogOut" className="h-4 w-4" />
              <span className="hidden sm:inline">{isLoading ? 'Logging out...' : 'Logout'}</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-8">
        <div className="space-y-8">
          {/* Welcome Section */}
          <div className="space-y-2">
            <h1 className="text-4xl font-bold text-foreground">
              Welcome back, {user.firstName}! 👋
            </h1>
            <p className="text-lg text-muted-foreground">
              Continue your learning journey and explore new courses
            </p>
          </div>

          {/* Hero Section */}
          <DashboardHero hero={LEARNER_DASHBOARD_HERO} />

          {/* Dashboard Links */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">Quick Access</h2>
            <DashboardLinks links={LEARNER_DASHBOARD_LINKS} />
          </div>
        </div>
      </main>
    </div>
  )
}
