import { useAppSelector } from '@/store/hooks';
import { selectCurrentUser } from '@/store/authSlice';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

interface WelcomeBannerProps {
  checklistProgress: number;
}

export function WelcomeBanner({ checklistProgress }: WelcomeBannerProps) {
  const user = useAppSelector(selectCurrentUser);
  const firstName = user?.name?.split(' ')[0] || 'Creator';
  const isNewUser = checklistProgress < 40;

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary via-primary to-violet-600 p-6 lg:p-8 text-primary-foreground">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />
      
      <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5" />
            <span className="text-sm font-medium opacity-90">
              {isNewUser ? 'Getting Started' : 'Welcome back'}
            </span>
          </div>
          
          <h1 className="text-2xl lg:text-3xl font-heading font-bold">
            {isNewUser 
              ? `Welcome to EdSetu, ${firstName}! 🎉`
              : `Good to see you, ${firstName}!`
            }
          </h1>
          
          <p className="text-primary-foreground/80 max-w-md">
            {isNewUser 
              ? "Let's get your academy set up. Complete the checklist below to start creating courses."
              : "Here's an overview of your academy. Keep up the great work!"
            }
          </p>

          {isNewUser && (
            <div className="space-y-2 max-w-sm">
              <div className="flex items-center justify-between text-sm">
                <span>Setup progress</span>
                <span className="font-medium">{checklistProgress}%</span>
              </div>
              <Progress value={checklistProgress} className="h-2 bg-white/20" />
            </div>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          {isNewUser ? (
            <Button 
              asChild
              variant="secondary" 
              className="bg-white text-primary hover:bg-white/90"
            >
              <Link to="/app/courses/new">
                Create Your First Course
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          ) : (
            <>
              <Button 
                asChild
                variant="secondary" 
                className="bg-white text-primary hover:bg-white/90"
              >
                <Link to="/app/courses">
                  View Courses
                </Link>
              </Button>
              <Button 
                asChild
                variant="ghost" 
                className="text-white border-white/30 hover:bg-white/10"
              >
                <Link to="/app/live-class">
                  Schedule Class
                </Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
