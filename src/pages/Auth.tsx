import { useState, useEffect } from 'react';
import { useNavigate, useLocation, useSearchParams, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, Eye, EyeOff, Mail, Phone } from 'lucide-react';
import { toast } from 'sonner';
import logo from '@/assets/logo.png';

export default function Auth() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const { login, register, sendOTP, verifyOTP, isAuthenticated } = useAuth();
  
  const [isSignUp, setIsSignUp] = useState(searchParams.get('signup') === 'true');
  
  // Update isSignUp when URL changes
  useEffect(() => {
    setIsSignUp(searchParams.get('signup') === 'true');
  }, [searchParams]);
  const [loginMethod, setLoginMethod] = useState<'email' | 'phone'>('email');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Redirect if already authenticated
  if (isAuthenticated) {
    const from = (location.state as any)?.from?.pathname || '/app';
    navigate(from, { replace: true });
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (loginMethod === 'phone') {
        const result = await verifyOTP(phone, otp, name);
        if (result.success) {
          toast.success('Welcome!');
          navigate('/onboarding');
        } else {
          toast.error(result.message || 'Invalid OTP');
        }
      } else if (isSignUp) {
        const result = await register(email, password, name);
        if (result.success) {
          toast.success('Account created!');
          navigate('/onboarding');
        } else {
          toast.error(result.message || 'Registration failed');
        }
      } else {
        const result = await login(email, password);
        if (result.success) {
          toast.success('Welcome back!');
          navigate('/app');
        } else {
          toast.error(result.message || 'Login failed');
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendOtp = async () => {
    if (!phone || phone.length < 10) {
      toast.error('Please enter a valid phone number');
      return;
    }
    setIsLoading(true);
    const result = await sendOTP(phone);
    setIsLoading(false);
    if (result.success) {
      setOtpSent(true);
      toast.success('OTP sent! (Use 123456 for demo)');
    } else {
      toast.error(result.message || 'Failed to send OTP');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-primary/5 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/">
            <img src={logo} alt="EdSetu" className="w-16 h-16 mx-auto rounded-2xl mb-4 hover:opacity-80 transition-opacity" />
          </Link>
          <h1 className="text-2xl font-heading font-bold">{isSignUp ? 'Create your account' : 'Welcome back'}</h1>
          <p className="text-muted-foreground mt-2">
            {isSignUp ? 'Start your teaching journey with EdSetu' : 'Sign in to continue to your dashboard'}
          </p>
        </div>

        <div className="bg-card rounded-2xl border border-border p-6 shadow-xl">
          <div className="flex gap-2 mb-6">
            <Button variant={loginMethod === 'email' ? 'default' : 'outline'} className="flex-1" onClick={() => setLoginMethod('email')}>
              <Mail className="w-4 h-4 mr-2" /> Email
            </Button>
            <Button variant={loginMethod === 'phone' ? 'default' : 'outline'} className="flex-1" onClick={() => { setLoginMethod('phone'); setOtpSent(false); }}>
              <Phone className="w-4 h-4 mr-2" /> Phone
            </Button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {(isSignUp || loginMethod === 'phone') && (
              <div>
                <Label>Full Name</Label>
                <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="John Doe" className="mt-1" required />
              </div>
            )}

            {loginMethod === 'email' ? (
              <>
                <div>
                  <Label>Email</Label>
                  <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className="mt-1" required />
                </div>
                <div>
                  <Label>Password</Label>
                  <div className="relative mt-1">
                    <Input type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required />
                    <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div>
                  <Label>Phone Number</Label>
                  <div className="flex gap-2 mt-1">
                    <Input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+91 98765 43210" className="flex-1" />
                    <Button type="button" variant="outline" onClick={handleSendOtp} disabled={isLoading || otpSent}>
                      {otpSent ? 'Resend' : 'Send OTP'}
                    </Button>
                  </div>
                </div>
                {otpSent && (
                  <div>
                    <Label>Enter OTP</Label>
                    <Input value={otp} onChange={(e) => setOtp(e.target.value)} placeholder="123456" className="mt-1" maxLength={6} required />
                  </div>
                )}
              </>
            )}

            <Button type="submit" className="w-full" disabled={isLoading || (loginMethod === 'phone' && !otpSent)}>
              {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : isSignUp ? 'Create Account' : 'Sign In'}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm">
            {isSignUp ? (
              <p className="text-muted-foreground">
                Already have an account?{' '}
                <button className="text-primary font-medium hover:underline" onClick={() => setIsSignUp(false)}>Sign in</button>
              </p>
            ) : (
              <p className="text-muted-foreground">
                Don't have an account?{' '}
                <button className="text-primary font-medium hover:underline" onClick={() => setIsSignUp(true)}>Sign up</button>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
