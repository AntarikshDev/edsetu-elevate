import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOnboarding } from '@/hooks/useOnboarding';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { 
  Check, 
  ChevronRight, 
  GraduationCap, 
  Code, 
  Brain, 
  TrendingUp, 
  Dumbbell, 
  DollarSign, 
  Music, 
  Palette,
  ChefHat,
  Heart,
  FileCheck,
  Briefcase,
  Youtube,
  Instagram,
  Linkedin,
  Twitter,
  Globe,
  Loader2,
  Sparkles
} from 'lucide-react';
import logo from '@/assets/logo.png';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  GraduationCap, Code, Brain, TrendingUp, Dumbbell, DollarSign, 
  Music, Palette, ChefHat, Heart, FileCheck, Briefcase
};

const steps = [
  { id: 1, name: 'Brand Setup', description: 'Your brand identity' },
  { id: 2, name: 'Expertise', description: 'Your field of teaching' },
  { id: 3, name: 'Connect', description: 'Your content sources' },
  { id: 4, name: 'Preferences', description: 'Customize your experience' },
];

export default function Onboarding() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { 
    expertiseFields, 
    isLoading, 
    saveBrand, 
    saveExpertise, 
    saveSocials, 
    savePreferences,
    completeOnboarding,
    skipOnboarding 
  } = useOnboarding();

  const [currentStep, setCurrentStep] = useState(1);
  const [brandName, setBrandName] = useState('');
  const [tagline, setTagline] = useState('');
  const [selectedFields, setSelectedFields] = useState<string[]>([]);
  const [socials, setSocials] = useState({
    youtube: '',
    instagram: '',
    linkedin: '',
    twitter: '',
    website: '',
  });
  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    language: 'en',
    timezone: 'Asia/Kolkata',
    analyticsOptIn: true,
  });

  const handleNextStep = async () => {
    if (currentStep === 1) {
      const result = await saveBrand({ brandName, tagline });
      if (result.success) {
        toast.success('Brand saved!');
        setCurrentStep(2);
      }
    } else if (currentStep === 2) {
      const result = await saveExpertise({ fields: selectedFields });
      if (result.success) {
        toast.success('Expertise saved!');
        setCurrentStep(3);
      }
    } else if (currentStep === 3) {
      const result = await saveSocials(socials);
      if (result.success) {
        toast.success('Social profiles linked!');
        setCurrentStep(4);
      }
    } else if (currentStep === 4) {
      const result = await savePreferences({
        notifications: {
          email: preferences.emailNotifications,
          push: preferences.pushNotifications,
          sms: preferences.smsNotifications,
        },
        language: preferences.language,
        timezone: preferences.timezone,
        analyticsOptIn: preferences.analyticsOptIn,
      });
      if (result.success) {
        await completeOnboarding();
        toast.success('Setup complete! Welcome to EdSetu 🎉');
        navigate('/app');
      }
    }
  };

  const handleSkip = async () => {
    await skipOnboarding();
    toast.info('You can complete setup later in settings');
    navigate('/app');
  };

  const toggleField = (fieldId: string) => {
    setSelectedFields(prev => 
      prev.includes(fieldId) 
        ? prev.filter(id => id !== fieldId)
        : [...prev, fieldId]
    );
  };

  const canProceed = () => {
    if (currentStep === 1) return brandName.trim().length >= 2;
    if (currentStep === 2) return selectedFields.length > 0;
    return true;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex">
      {/* Left Sidebar - Progress */}
      <div className="hidden lg:flex w-80 bg-card border-r border-border flex-col p-8">
        <div className="flex items-center gap-3 mb-12">
          <img src={logo} alt="EdSetu" className="w-10 h-10 rounded-xl" />
          <span className="font-heading text-xl font-bold">EdSetu</span>
        </div>

        <div className="flex-1">
          <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-6">
            Setup Progress
          </h2>
          <nav className="space-y-2">
            {steps.map((step, index) => {
              const isCompleted = currentStep > step.id;
              const isCurrent = currentStep === step.id;
              
              return (
                <div
                  key={step.id}
                  className={cn(
                    "flex items-center gap-4 p-3 rounded-xl transition-all",
                    isCurrent && "bg-primary/10",
                    isCompleted && "opacity-60"
                  )}
                >
                  <div className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all",
                    isCompleted && "bg-primary text-primary-foreground",
                    isCurrent && "bg-primary text-primary-foreground ring-4 ring-primary/20",
                    !isCompleted && !isCurrent && "bg-muted text-muted-foreground"
                  )}>
                    {isCompleted ? <Check className="w-5 h-5" /> : step.id}
                  </div>
                  <div>
                    <p className={cn(
                      "font-medium",
                      isCurrent && "text-foreground",
                      !isCurrent && "text-muted-foreground"
                    )}>
                      {step.name}
                    </p>
                    <p className="text-xs text-muted-foreground">{step.description}</p>
                  </div>
                </div>
              );
            })}
          </nav>
        </div>

        <Button variant="ghost" onClick={handleSkip} className="mt-auto">
          Skip for now
        </Button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Mobile Header */}
        <div className="lg:hidden flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center gap-2">
            <img src={logo} alt="EdSetu" className="w-8 h-8 rounded-lg" />
            <span className="font-heading font-bold">EdSetu</span>
          </div>
          <Button variant="ghost" size="sm" onClick={handleSkip}>Skip</Button>
        </div>

        {/* Step Progress Mobile */}
        <div className="lg:hidden flex items-center justify-center gap-2 p-4">
          {steps.map((step) => (
            <div
              key={step.id}
              className={cn(
                "h-2 rounded-full transition-all",
                step.id === currentStep ? "w-8 bg-primary" : "w-2 bg-muted",
                step.id < currentStep && "bg-primary/50"
              )}
            />
          ))}
        </div>

        {/* Content Area */}
        <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
          <div className="w-full max-w-2xl">
            {/* Step 1: Brand Setup */}
            {currentStep === 1 && (
              <div className="space-y-8 animate-fade-in">
                <div className="text-center lg:text-left">
                  <h1 className="text-3xl lg:text-4xl font-heading font-bold mb-3">
                    Welcome, {user?.name?.split(' ')[0] || 'Creator'}! 👋
                  </h1>
                  <p className="text-lg text-muted-foreground">
                    Let's set up your brand and get you ready to create amazing courses.
                  </p>
                </div>

                <div className="space-y-6 bg-card rounded-2xl p-6 lg:p-8 border border-border shadow-lg">
                  <div className="space-y-2">
                    <Label htmlFor="brandName" className="text-base">Brand Name *</Label>
                    <Input
                      id="brandName"
                      placeholder="e.g., Tech Academy, Sarah's Courses"
                      value={brandName}
                      onChange={(e) => setBrandName(e.target.value)}
                      className="h-12 text-base"
                    />
                    <p className="text-sm text-muted-foreground">
                      This will be shown to your students
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="tagline" className="text-base">Tagline (Optional)</Label>
                    <Input
                      id="tagline"
                      placeholder="e.g., Learn to code with confidence"
                      value={tagline}
                      onChange={(e) => setTagline(e.target.value)}
                      className="h-12 text-base"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Expertise */}
            {currentStep === 2 && (
              <div className="space-y-8 animate-fade-in">
                <div className="text-center lg:text-left">
                  <h1 className="text-3xl lg:text-4xl font-heading font-bold mb-3">
                    What do you teach? 📚
                  </h1>
                  <p className="text-lg text-muted-foreground">
                    Select your areas of expertise. You can always add more later.
                  </p>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                  {expertiseFields.map((field) => {
                    const IconComponent = iconMap[field.icon] || GraduationCap;
                    const isSelected = selectedFields.includes(field.id);
                    
                    return (
                      <button
                        key={field.id}
                        onClick={() => toggleField(field.id)}
                        className={cn(
                          "flex flex-col items-center gap-3 p-4 lg:p-6 rounded-2xl border-2 transition-all text-center",
                          isSelected 
                            ? "border-primary bg-primary/10 shadow-lg shadow-primary/20" 
                            : "border-border bg-card hover:border-primary/50 hover:bg-muted/50"
                        )}
                      >
                        <div className={cn(
                          "w-12 h-12 rounded-xl flex items-center justify-center transition-all",
                          isSelected ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                        )}>
                          <IconComponent className="w-6 h-6" />
                        </div>
                        <div>
                          <p className="font-medium text-sm lg:text-base">{field.name}</p>
                          <p className="text-xs text-muted-foreground mt-1 hidden lg:block">
                            {field.description}
                          </p>
                        </div>
                        {isSelected && (
                          <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                            <Check className="w-4 h-4 text-primary-foreground" />
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Step 3: Connect Socials */}
            {currentStep === 3 && (
              <div className="space-y-8 animate-fade-in">
                <div className="text-center lg:text-left">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
                    <Sparkles className="w-4 h-4" />
                    AI-Powered
                  </div>
                  <h1 className="text-3xl lg:text-4xl font-heading font-bold mb-3">
                    Connect your content 🔗
                  </h1>
                  <p className="text-lg text-muted-foreground">
                    Link your social profiles to help our AI understand your content style and audience.
                  </p>
                </div>

                <div className="space-y-4 bg-card rounded-2xl p-6 lg:p-8 border border-border shadow-lg">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center">
                      <Youtube className="w-6 h-6 text-red-500" />
                    </div>
                    <div className="flex-1">
                      <Label className="text-base">YouTube Channel</Label>
                      <Input
                        placeholder="youtube.com/c/yourchannel"
                        value={socials.youtube}
                        onChange={(e) => setSocials({ ...socials, youtube: e.target.value })}
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-pink-500/10 flex items-center justify-center">
                      <Instagram className="w-6 h-6 text-pink-500" />
                    </div>
                    <div className="flex-1">
                      <Label className="text-base">Instagram</Label>
                      <Input
                        placeholder="@yourhandle"
                        value={socials.instagram}
                        onChange={(e) => setSocials({ ...socials, instagram: e.target.value })}
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-600/10 flex items-center justify-center">
                      <Linkedin className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <Label className="text-base">LinkedIn</Label>
                      <Input
                        placeholder="linkedin.com/in/yourprofile"
                        value={socials.linkedin}
                        onChange={(e) => setSocials({ ...socials, linkedin: e.target.value })}
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-foreground/10 flex items-center justify-center">
                      <Twitter className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <Label className="text-base">X (Twitter)</Label>
                      <Input
                        placeholder="@yourhandle"
                        value={socials.twitter}
                        onChange={(e) => setSocials({ ...socials, twitter: e.target.value })}
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Globe className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <Label className="text-base">Website</Label>
                      <Input
                        placeholder="yourwebsite.com"
                        value={socials.website}
                        onChange={(e) => setSocials({ ...socials, website: e.target.value })}
                        className="mt-1"
                      />
                    </div>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground text-center">
                  All fields are optional. You can add these later in settings.
                </p>
              </div>
            )}

            {/* Step 4: Preferences */}
            {currentStep === 4 && (
              <div className="space-y-8 animate-fade-in">
                <div className="text-center lg:text-left">
                  <h1 className="text-3xl lg:text-4xl font-heading font-bold mb-3">
                    Almost there! ⚙️
                  </h1>
                  <p className="text-lg text-muted-foreground">
                    Customize your experience with these final preferences.
                  </p>
                </div>

                <div className="space-y-6 bg-card rounded-2xl p-6 lg:p-8 border border-border shadow-lg">
                  <h3 className="font-medium text-lg">Notifications</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Email Notifications</p>
                        <p className="text-sm text-muted-foreground">Receive updates via email</p>
                      </div>
                      <Switch
                        checked={preferences.emailNotifications}
                        onCheckedChange={(checked) => setPreferences({ ...preferences, emailNotifications: checked })}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Push Notifications</p>
                        <p className="text-sm text-muted-foreground">Browser push notifications</p>
                      </div>
                      <Switch
                        checked={preferences.pushNotifications}
                        onCheckedChange={(checked) => setPreferences({ ...preferences, pushNotifications: checked })}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">SMS Notifications</p>
                        <p className="text-sm text-muted-foreground">Important alerts via SMS</p>
                      </div>
                      <Switch
                        checked={preferences.smsNotifications}
                        onCheckedChange={(checked) => setPreferences({ ...preferences, smsNotifications: checked })}
                      />
                    </div>
                  </div>

                  <div className="h-px bg-border my-6" />

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Help us improve</p>
                      <p className="text-sm text-muted-foreground">Share anonymous usage data</p>
                    </div>
                    <Switch
                      checked={preferences.analyticsOptIn}
                      onCheckedChange={(checked) => setPreferences({ ...preferences, analyticsOptIn: checked })}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8">
              {currentStep > 1 ? (
                <Button
                  variant="outline"
                  onClick={() => setCurrentStep(currentStep - 1)}
                >
                  Back
                </Button>
              ) : (
                <div />
              )}

              <Button
                onClick={handleNextStep}
                disabled={!canProceed() || isLoading}
                className="min-w-[140px]"
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : currentStep === 4 ? (
                  'Complete Setup'
                ) : (
                  <>
                    Continue
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
