'use client';

import React, { useState } from 'react';
import { ArrowLeft, ShoppingCart, Mail, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/lib/context/auth-context';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function AuthPage() {
  const [authType, setAuthType] = useState<'phone' | 'email'>('phone');
  const [step, setStep] = useState<'input' | 'otp'>('input');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [isSignup, setIsSignup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { sendOtp, login } = useAuth();
  const router = useRouter();

  const handleSendOtp = async (type: 'phone' | 'email') => {
    if (type === 'phone' && phone.length !== 10) {
      toast.error('Please enter a valid 10-digit mobile number');
      return;
    }
    if (type === 'email' && !email.includes('@')) {
      toast.error('Please enter a valid email address');
      return;
    }

    setIsLoading(true);
    try {
      await sendOtp(type === 'phone' ? phone : email);
      setStep('otp');
      toast.success(`OTP sent to your ${type}. Use 1234 for demo.`);
    } catch (error) {
      toast.error('Failed to send OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (otp.length !== 4) {
      toast.error('Please enter a valid 4-digit OTP');
      return;
    }

    setIsLoading(true);
    try {
      const success = await login(authType === 'phone' ? phone : email, otp);
      if (success) {
        toast.success('Login successful!');
        router.push('/');
      } else {
        toast.error('Invalid OTP. Please try again.');
      }
    } catch (error) {
      toast.error('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    toast.success('Google login would be implemented here');
  };

  const handleGuestBrowsing = () => {
    router.push('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-green-600 to-emerald-400">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center">
              <ShoppingCart className="w-6 h-6 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-white">ILB MART</h1>
          </div>
          <p className="text-cream-medium">Fresh groceries delivered in minutes</p>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              {step === 'otp' && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setStep('input')}
                  className="p-0 h-auto"
                >
                  <ArrowLeft className="w-4 h-4" />
                </Button>
              )}
              <CardTitle>
                {step === 'input' ? (isSignup ? 'Create Account' : 'Welcome Back') : 'Verify OTP'}
              </CardTitle>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {step === 'input' ? (
              <>
                <Tabs value={authType} onValueChange={(value) => setAuthType(value as 'phone' | 'email')}>
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="phone" className="flex items-center space-x-2">
                      <Phone className="w-4 h-4" />
                      <span>Phone</span>
                    </TabsTrigger>
                    <TabsTrigger value="email" className="flex items-center space-x-2">
                      <Mail className="w-4 h-4" />
                      <span>Email</span>
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="phone" className="space-y-4">
                    <div>
                      <Input
                        type="tel"
                        placeholder="Enter your mobile number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                        maxLength={10}
                        className="text-center text-lg h-12"
                      />
                      <p className="text-xs text-gray-500 mt-2 text-center">
                        We'll send you an OTP for verification
                      </p>
                    </div>
                  </TabsContent>

                  <TabsContent value="email" className="space-y-4">
                    <div>
                      <Input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="text-center text-lg h-12"
                      />
                      {isSignup && (
                        <Input
                          type="password"
                          placeholder="Create password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="text-center text-lg h-12 mt-3"
                        />
                      )}
                      <p className="text-xs text-gray-500 mt-2 text-center">
                        {isSignup ? 'Create your account' : 'We\'ll send you an OTP'}
                      </p>
                    </div>
                  </TabsContent>
                </Tabs>

                <Button
                  onClick={() => handleSendOtp(authType)}
                  disabled={(authType === 'phone' ? phone.length !== 10 : !email.includes('@')) || isLoading}
                  className="w-full bg-primary-green hover:bg-primary-green/90 h-12 text-lg text-white"
                >
                  {isLoading ? 'Sending...' : (isSignup ? 'Create Account' : 'Send OTP')}
                </Button>

                <div className="space-y-4">
                  <div className="relative">
                    <Separator />
                    <span className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-2 text-xs text-gray-500">
                      OR
                    </span>
                  </div>

                  <Button
                    variant="outline"
                    className="w-full h-12"
                    onClick={handleGoogleLogin}
                  >
                    <img src="https://developers.google.com/identity/images/g-logo.png" alt="Google" className="w-5 h-5 mr-2" />
                    Continue with Google
                  </Button>

                  <Button
                    variant="ghost"
                    className="w-full"
                    onClick={handleGuestBrowsing}
                  >
                    Continue as Guest
                  </Button>
                </div>

                <div className="text-center">
                  <Button
                    variant="ghost"
                    onClick={() => setIsSignup(!isSignup)}
                    className="text-sm"
                  >
                    {isSignup ? 'Already have an account? Login' : 'New user? Create account'}
                  </Button>
                </div>
              </>
            ) : (
              <>
                <div>
                  <p className="text-sm text-gray-600 mb-4 text-center">
                    OTP sent to {authType === 'phone' ? `+91 ${phone}` : email}
                  </p>
                  <Input
                    type="text"
                    placeholder="Enter 4-digit OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 4))}
                    maxLength={4}
                    className="text-center text-lg h-12 tracking-widest"
                  />
                  <p className="text-xs text-gray-500 mt-2 text-center">
                    Demo OTP: <strong>1234</strong>
                  </p>
                </div>

                <Button
                  onClick={handleVerifyOtp}
                  disabled={otp.length !== 4 || isLoading}
                  className="w-full bg-primary-green hover:bg-primary-green/90 h-12 text-lg text-white"
                >
                  {isLoading ? 'Verifying...' : 'Verify & Login'}
                </Button>

                <Button
                  variant="ghost"
                  onClick={() => handleSendOtp(authType)}
                  disabled={isLoading}
                  className="w-full"
                >
                  Resend OTP
                </Button>
              </>
            )}
          </CardContent>
        </Card>

        <p className="text-xs text-cream-medium text-center mt-6">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
}
