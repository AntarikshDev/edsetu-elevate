import { useState } from 'react';
import { ChevronLeft, ChevronRight, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface QuickTipsProps {
  tips: string[];
}

export function QuickTips({ tips }: QuickTipsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (tips.length === 0) return null;

  const goToPrevious = () => {
    setCurrentIndex(prev => (prev === 0 ? tips.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex(prev => (prev === tips.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 rounded-2xl p-6 border border-primary/20">
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0">
          <Lightbulb className="w-5 h-5 text-primary" />
        </div>
        
        <div className="flex-1 min-w-0">
          <p className="text-foreground font-medium leading-relaxed">
            {tips[currentIndex]}
          </p>
        </div>

        <div className="flex items-center gap-1 flex-shrink-0">
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={goToPrevious}>
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <span className="text-xs text-muted-foreground min-w-[40px] text-center">
            {currentIndex + 1}/{tips.length}
          </span>
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={goToNext}>
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
