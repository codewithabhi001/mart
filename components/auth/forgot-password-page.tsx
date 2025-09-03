'use client';

import React, { useState } from 'react';
import { ArrowLeft, Mail, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const router = useRouter();

  const handleResetPassword = async () => {
    if (!email.includes('@')) {
      toast.error('Please enter a valid email address');
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsEmailSent(true);
    setIsLoading(false);
    toast.success('Password reset link sent to your email');
  };

  if (isEmailSent) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto text-center space-y-6">
          <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          
          <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Check Your Email</h1>
            <p className="text-gray-600">
              We've sent a password reset link to <strong>{email}</strong>
            </p>
          </div>

          <div className="space-y-3">
            <Button
              variant="outline"
              className="w-full"
              onClick={() => setIsEmailSent(false)}
            >
              Try Different Email
            </Button>
            
            <Button
              className="w-full bg-primary hover:bg-primary/90"
              onClick={() => router.push('/login')}
            >
              Back to Login
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-md mx-auto">
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.push('/login')}
                className="p-0 h-auto"
              >
                <ArrowLeft className="w-4 h-4" />
              </Button>
              <CardTitle>Reset Password</CardTitle>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="text-center space-y-2">
              <Mail className="w-12 h-12 mx-auto text-primary" />
              <p className="text-gray-600">
                Enter your email address and we'll send you a link to reset your password.
              </p>
            </div>

            <div>
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="text-center text-lg h-12"
              />
            </div>

            <Button
              onClick={handleResetPassword}
              disabled={!email.includes('@') || isLoading}
              className="w-full bg-primary hover:bg-primary/90 h-12 text-lg"
            >
              {isLoading ? 'Sending...' : 'Send Reset Link'}
            </Button>

            <div className="text-center">
              <Button
                variant="ghost"
                onClick={() => router.push('/login')}
                className="text-sm"
              >
                Remember your password? Login
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}