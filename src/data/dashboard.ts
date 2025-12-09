
        
import { Role } from '../types/auth';

/**
 * Defines a model for dashboard navigation links or quick action cards.
 */
export interface DashboardLinkModel {
  id: string;
  title: string;
  description: string;
  iconName: string; // Lucide icon name
  targetRole: Role | 'All';
  url: string;
  imageUrl?: string;
}

export const LEARNER_DASHBOARD_LINKS: DashboardLinkModel[] = [
  {
    id: "link1",
    title: "My Courses",
    description: "Continue learning where you left off and view your course progress.",
    iconName: "BookOpen",
    targetRole: Role.Learner,
    url: "/learner/courses",
    imageUrl: "https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/12/7/0f295613-c9fb-4d2a-9c4e-31d3848b320a.png"
  },
  {
    id: "link2",
    title: "Learning Roadmap",
    description: "Explore personalized learning paths and recommended content.",
    iconName: "Route",
    targetRole: Role.Learner,
    url: "/learner/roadmap",
    imageUrl: "https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/12/7/7e756226-ac3b-4291-aa48-ebb90804947e.png"
  },
  {
    id: "link3",
    title: "View Profile",
    description: "Update your personal information and manage account settings.",
    iconName: "User",
    targetRole: Role.Learner,
    url: "/learner/profile",
    imageUrl: "https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/12/7/276c20c0-c5a9-4796-a4bc-98666bd4df63.png"
  }
];

export interface DashboardHeroModel {
  id: string;
  heading: string;
  imageUrl: string;
  ctaText: string;
}

export const LEARNER_DASHBOARD_HERO: DashboardHeroModel = {
  id: "hero1",
  heading: "Welcome to your Learning Hub",
  imageUrl: "https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/12/7/adcab02e-2336-4c61-be04-0ec79e5b91ff.png",
  ctaText: "Start Learning"
};
        
      