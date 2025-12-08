import { useState, useEffect } from 'react';
import { useNavigate, useLocation, useSearchParams, Link } from 'react-router-dom';
import { useLoginMutation } from '@/store/apiSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setCredentials, selectIsAuthenticated } from '@/store/authSlice';
import { getDeviceInfo } from '@/utils/deviceInfo';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, Eye, EyeOff, Mail, X, Check } from 'lucide-react';
import { toast } from 'sonner';
import logo from '@/assets/logo.png';
import { cn } from '@/lib/utils';

export default function Auth() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const [login, { isLoading: isLoginLoading }] = useLoginMutation();
  
  const [isSignUp, setIsSignUp] = useState(searchParams.get('signup') === 'true');
  
  useEffect(() => {
    setIsSignUp(searchParams.get('signup') === 'true');
  }, [searchParams]);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      const from = (location.state as { from?: { pathname: string } })?.from?.pathname || '/app/dashboard';
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, location.state]);

  const handleClose = () => {
    navigate('/');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isSignUp) {
      // Sign up not implemented with real API yet
      toast.info('Registration coming soon!');
      return;
    }

    try {
      // Get device info for login request
      const deviceInfo = getDeviceInfo();

      const response = await login({
        email,
        password_hash: password,
        device_unique_id: deviceInfo.device_unique_id,
        device_name: deviceInfo.device_name,
        device_location: deviceInfo.device_location,
      }).unwrap();

      // Dispatch setCredentials with data from response
      dispatch(
        setCredentials({
          userData: response.userData,
          accessToken: response.accessToken,
          refreshToken: response.refreshToken,
        })
      );

      toast.success('Welcome back!');
      navigate('/app/dashboard');
    } catch (err) {
      const error = err as { data?: { message?: string }; status?: number | string };
      if (error.status === 'FETCH_ERROR') {
        toast.error('Unable to connect to server. Please check your connection.');
      } else {
        toast.error(error.data?.message || 'Login failed. Please try again.');
      }
    }
  };

  const handleSocialLogin = (provider: string) => {
    toast.info(`${provider} login coming soon!`);
  };

  const passwordStrength = password.length >= 8 ? "strong" : password.length >= 4 ? "medium" : "weak";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-foreground/50 backdrop-blur-sm animate-fade-in"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto bg-card rounded-3xl shadow-2xl animate-scale-in">
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-muted transition-colors z-10"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="px-8 pt-8 pb-6 text-center">
          <Link to="/">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-violet-600 flex items-center justify-center mx-auto mb-4 hover:opacity-90 transition-opacity overflow-hidden">
              <img src={logo} alt="EdSetu" className="w-full h-full object-cover" />
            </div>
          </Link>
          <h2 className="text-2xl font-bold text-foreground font-heading">
            {isSignUp ? 'Create your account' : 'Welcome back'}
          </h2>
          <p className="text-muted-foreground mt-1">
            {isSignUp ? 'Start your teaching journey with EdSetu' : 'Sign in to continue to EdSetu'}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-8 py-6 space-y-4">
          {isSignUp && (
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-12 rounded-xl"
                required
              />
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12 rounded-xl"
              required
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              {!isSignUp && (
                <button type="button" className="text-sm text-primary hover:text-primary/80">
                  Forgot password?
                </button>
              )}
            </div>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder={isSignUp ? "Create a strong password" : "Enter your password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-12 rounded-xl pr-12"
                required
                minLength={isSignUp ? 8 : undefined}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {isSignUp && password && (
              <div className="flex items-center gap-2 mt-2">
                <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
                  <div
                    className={cn(
                      "h-full transition-all duration-300",
                      passwordStrength === "weak" && "w-1/3 bg-destructive",
                      passwordStrength === "medium" && "w-2/3 bg-yellow-500",
                      passwordStrength === "strong" && "w-full bg-accent"
                    )}
                  />
                </div>
                <span
                  className={cn(
                    "text-xs font-medium capitalize",
                    passwordStrength === "weak" && "text-destructive",
                    passwordStrength === "medium" && "text-yellow-500",
                    passwordStrength === "strong" && "text-accent"
                  )}
                >
                  {passwordStrength}
                </span>
              </div>
            )}
          </div>

          {/* Terms checkbox for signup */}
          {isSignUp && (
            <div className="flex items-start gap-3">
              <button
                type="button"
                onClick={() => setAgreedToTerms(!agreedToTerms)}
                className={cn(
                  "w-5 h-5 rounded-md border-2 flex items-center justify-center transition-colors mt-0.5 flex-shrink-0",
                  agreedToTerms
                    ? "bg-primary border-primary"
                    : "border-border hover:border-primary/50"
                )}
              >
                {agreedToTerms && <Check className="w-3 h-3 text-primary-foreground" />}
              </button>
              <p className="text-sm text-muted-foreground">
                I agree to the{" "}
                <Link to="/terms" className="text-primary hover:underline">Terms of Service</Link>{" "}
                and{" "}
                <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
              </p>
            </div>
          )}

          <Button
            type="submit"
            variant="hero"
            size="lg"
            className="w-full"
            disabled={isLoginLoading || (isSignUp && !agreedToTerms)}
          >
            {isLoginLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : isSignUp ? 'Create Account' : 'Sign In'}
          </Button>
        </form>

        {/* Divider */}
        <div className="px-8">
          <div className="flex items-center gap-4">
            <div className="flex-1 h-px bg-border" />
            <span className="text-sm text-muted-foreground">or continue with</span>
            <div className="flex-1 h-px bg-border" />
          </div>
        </div>

        {/* Social Login */}
        <div className="px-8 py-6 grid grid-cols-2 gap-3">
          <Button variant="outline" className="h-12 rounded-xl" onClick={() => handleSocialLogin('Google')}>
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Google
          </Button>
          <Button variant="outline" className="h-12 rounded-xl" onClick={() => handleSocialLogin('Apple')}>
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
            </svg>
            Apple
          </Button>
        </div>

        {/* Footer */}
        <div className="px-8 pb-4 text-center">
          <p className="text-sm text-muted-foreground">
            {isSignUp ? (
              <>
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => setIsSignUp(false)}
                  className="font-semibold text-primary hover:text-primary/80 transition-colors"
                >
                  Sign in
                </button>
              </>
            ) : (
              <>
                Don't have an account?{' '}
                <button
                  type="button"
                  onClick={() => setIsSignUp(true)}
                  className="font-semibold text-primary hover:text-primary/80 transition-colors"
                >
                  Sign up free
                </button>
              </>
            )}
          </p>
        </div>

        {/* Demo Credentials */}
        {!isSignUp && (
          <div className="px-8 pb-8">
            <div className="p-4 bg-muted rounded-xl">
              <p className="text-xs font-semibold text-muted-foreground mb-3 uppercase tracking-wide">Demo Credentials</p>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => { setEmail('admin@edsetu.com'); setPassword('admin123'); }}
                  className="p-2 bg-card rounded-lg hover:bg-accent/10 transition-colors text-left"
                >
                  <span className="font-medium text-primary">Admin</span>
                  <p className="text-muted-foreground truncate">admin@edsetu.com</p>
                </button>
                <button
                  type="button"
                  onClick={() => { setEmail('subadmin@edsetu.com'); setPassword('subadmin123'); }}
                  className="p-2 bg-card rounded-lg hover:bg-accent/10 transition-colors text-left"
                >
                  <span className="font-medium text-primary">Sub Admin</span>
                  <p className="text-muted-foreground truncate">subadmin@edsetu.com</p>
                </button>
                <button
                  type="button"
                  onClick={() => { setEmail('instructor@edsetu.com'); setPassword('instructor123'); }}
                  className="p-2 bg-card rounded-lg hover:bg-accent/10 transition-colors text-left"
                >
                  <span className="font-medium text-primary">Instructor</span>
                  <p className="text-muted-foreground truncate">instructor@edsetu.com</p>
                </button>
                <button
                  type="button"
                  onClick={() => { setEmail('student@edsetu.com'); setPassword('student123'); }}
                  className="p-2 bg-card rounded-lg hover:bg-accent/10 transition-colors text-left"
                >
                  <span className="font-medium text-primary">Student</span>
                  <p className="text-muted-foreground truncate">student@edsetu.com</p>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
