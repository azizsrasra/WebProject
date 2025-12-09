'use client'
import '../../index.css'
import { useNavigate } from 'react-router-dom'
import { Button } from '../../components/ui/button'
import SafeIcon from '../../components/common/SafeIcon'
import { useEffect, useState } from 'react'

export default function AuthenticationFlow() {
  const navigate = useNavigate()
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const handleLoginClick = () => navigate('/login')
  const handleSignupClick = () => navigate('/signup')

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-accent/10 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-primary/10 rounded-full">
              <SafeIcon name="GraduationCap" className="h-12 w-12 text-primary" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Welcome to LearnHub
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Your gateway to quality education and skill development. Join thousands of learners and instructors on our platform.
          </p>
        </div>

        {/* Auth Options */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-card border border-border rounded-lg p-8 shadow-soft hover:shadow-card transition-shadow">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-primary/10 rounded-lg">
                <SafeIcon name="LogIn" className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-2xl font-bold">Login</h2>
            </div>
            <p className="text-muted-foreground mb-6">
              Already have an account? Sign in to access your courses, progress, and personalized learning experience.
            </p>
            <Button onClick={handleLoginClick} className="w-full gap-2" size="lg">
              <SafeIcon name="ArrowRight" className="h-4 w-4" />
              Go to Login
            </Button>
          </div>

          <div className="bg-card border border-border rounded-lg p-8 shadow-soft hover:shadow-card transition-shadow">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-accent/10 rounded-lg">
                <SafeIcon name="UserPlus" className="h-6 w-6 text-accent-foreground" />
              </div>
              <h2 className="text-2xl font-bold">Sign Up</h2>
            </div>
            <p className="text-muted-foreground mb-6">
              New to LearnHub? Create an account to start your learning journey and explore our comprehensive course catalog.
            </p>
            <Button onClick={handleSignupClick} variant="secondary" className="w-full gap-2" size="lg">
              <SafeIcon name="ArrowRight" className="h-4 w-4" />
              Create Account
            </Button>
          </div>
        </div>

        {/* Features */}
        <div className="bg-card border border-border rounded-lg p-8">
          <h3 className="text-lg font-semibold mb-6 text-center">Why Choose LearnHub?</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: 'BookOpen', title: 'Diverse Courses', desc: 'Access hundreds of courses across various subjects and skill levels.' },
              { icon: 'Users', title: 'Expert Instructors', desc: 'Learn from industry professionals and experienced educators.' },
              { icon: 'Award', title: 'Certifications', desc: 'Earn recognized certificates upon course completion.' }
            ].map((feature) => (
              <div key={feature.title} className="flex flex-col items-center text-center">
                <div className="p-3 bg-primary/10 rounded-full mb-3">
                  <SafeIcon name={feature.icon} className="h-6 w-6 text-primary" />
                </div>
                <h4 className="font-semibold mb-2">{feature.title}</h4>
                <p className="text-sm text-muted-foreground">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-muted-foreground">
          <p>© 2024 LearnHub. All rights reserved.</p>
        </div>
      </div>
    </div>
  )
}
