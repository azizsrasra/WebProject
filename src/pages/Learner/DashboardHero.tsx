
import { Button } from '../../components/ui/button'
import SafeIcon from '../../components/common/SafeIcon'
import type { DashboardHeroModel } from '../../data/dashboard'

interface DashboardHeroProps {
  hero: DashboardHeroModel
}

export default function DashboardHero({ hero }: DashboardHeroProps) {
  return (
    <div className="relative overflow-hidden rounded-lg bg-gradient-to-r from-primary/10 via-primary/5 to-accent/10 border border-primary/20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center p-8 md:p-12">
        {/* Content */}
        <div className="space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground leading-tight">
            {hero.heading}
          </h2>
          <p className="text-muted-foreground text-lg">
            Access your courses, track progress, and achieve your learning goals with our comprehensive learning platform.
          </p>
          <Button 
            size="lg" 
            className="gap-2 w-full sm:w-auto"
          >
            <SafeIcon name="BookOpen" className="h-5 w-5" />
            {hero.ctaText}
          </Button>
        </div>

        {/* Image */}
        <div className="hidden md:flex items-center justify-center">
          <div className="relative w-full h-64 rounded-lg overflow-hidden bg-muted">
            <img 
              src={hero.imageUrl}
              alt={hero.heading}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
