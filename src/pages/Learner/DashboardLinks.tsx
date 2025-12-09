
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { Button } from '../../components/ui/button'
import SafeIcon from '../../components/common/SafeIcon'
import type { DashboardLinkModel } from '../../data/dashboard'

interface DashboardLinksProps {
  links: DashboardLinkModel[]
}

export default function DashboardLinks({ links }: DashboardLinksProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {links.map((link) => (
        <Card 
          key={link.id}
          className="overflow-hidden hover:shadow-card transition-shadow duration-200 flex flex-col"
        >
          {/* Image */}
          {link.imageUrl && (
            <div className="relative w-full h-40 bg-muted overflow-hidden">
              <img 
                src={link.imageUrl}
                alt={link.title}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          )}

          {/* Content */}
          <CardHeader className="flex-1">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <SafeIcon 
                  name={link.iconName} 
                  className="h-5 w-5 text-primary"
                />
              </div>
              <div className="flex-1">
                <CardTitle className="text-lg">{link.title}</CardTitle>
                <CardDescription className="mt-1">
                  {link.description}
                </CardDescription>
              </div>
            </div>
          </CardHeader>

          {/* Action */}
          <CardContent className="pt-0">
            <Button 
              variant="outline" 
              className="w-full gap-2"
              asChild
            >
              <a href={link.url}>
                <span>Explore</span>
                <SafeIcon name="ArrowRight" className="h-4 w-4" />
              </a>
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
