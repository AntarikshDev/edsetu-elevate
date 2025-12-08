import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLoginMutation } from '@/store/apiSlice';
import { useAppDispatch } from '@/store/hooks';
import { setUser } from '@/store/authSlice';
import { getDeviceInfo } from '@/utils/deviceInfo';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Mail, Lock, AlertCircle } from 'lucide-react';

interface FormErrors {
  email?: string;
  password?: string;
}

export const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [login, { isLoading, error }] = useLoginMutation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formErrors, setFormErrors] = useState<FormErrors>({});

  const validateForm = (): boolean => {
    const errors: FormErrors = {};

    if (!email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = 'Please enter a valid email';
    }

    if (!password) {
      errors.password = 'Password is required';
    } else if (password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

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

      // Dispatch setUser with user, token, and role
      dispatch(
        setUser({
          user: response.user,
          token: response.accessToken,
          role: response.userData.role,
        })
      );

      // Persist to localStorage
      localStorage.setItem('user', JSON.stringify(response.user));
      localStorage.setItem('token', response.accessToken);
      localStorage.setItem('role', response.userData.role);

      navigate('/dashboard');
    } catch (err) {
      // Error is handled by RTK Query and displayed below
      console.error('Login failed:', err);
    }
  };

  // Extract error message from RTK Query error
  const getErrorMessage = (): string | null => {
    if (!error) return null;
    
    if ('data' in error) {
      const data = error.data as { message?: string; error?: string };
      return data.message || data.error || 'Login failed. Please try again.';
    }
    
    if ('status' in error) {
      if (error.status === 'FETCH_ERROR') {
        return 'Unable to connect to server. Please check your connection.';
      }
      return `Error: ${error.status}`;
    }
    
    return 'An unexpected error occurred.';
  };

  const errorMessage = getErrorMessage();

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center">Welcome Back</CardTitle>
        <CardDescription className="text-center">
          Enter your credentials to access your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {errorMessage && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{errorMessage}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (formErrors.email) {
                    setFormErrors((prev) => ({ ...prev, email: undefined }));
                  }
                }}
                className={`pl-10 ${formErrors.email ? 'border-destructive' : ''}`}
                disabled={isLoading}
              />
            </div>
            {formErrors.email && (
              <p className="text-sm text-destructive">{formErrors.email}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (formErrors.password) {
                    setFormErrors((prev) => ({ ...prev, password: undefined }));
                  }
                }}
                className={`pl-10 ${formErrors.password ? 'border-destructive' : ''}`}
                disabled={isLoading}
              />
            </div>
            {formErrors.password && (
              <p className="text-sm text-destructive">{formErrors.password}</p>
            )}
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Signing in...
              </>
            ) : (
              'Sign In'
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default LoginForm;
