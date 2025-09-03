'use client';

import React, { useState } from 'react';
import { ArrowLeft, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/lib/context/auth-context';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function AuthPage() {
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { sendOtp, login } = useAuth();
  const router = useRouter();

  const handleSendOtp = async () => {
    if (phone.length !== 10) {
      toast.error('Please enter a valid 10-digit mobile number');
      return;
    }

    setIsLoading(true);
    try {
      await sendOtp(phone);
      setStep('otp');
      toast.success('OTP sent to your mobile number. Use 1234 for demo.');
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
      const success = await login(phone, otp);
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

  return (
    <div className="min-h-screen gradient-primary flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center">
              <ShoppingCart className="w-6 h-6 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-white">GroceryMart</h1>
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
                  onClick={() => setStep('phone')}
                  className="p-0 h-auto"
                >
                  <ArrowLeft className="w-4 h-4" />
                </Button>
              )}
              <CardTitle>
                {step === 'phone' ? 'Enter Mobile Number' : 'Verify OTP'}
              </CardTitle>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {step === 'phone' ? (
              <>
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

                <Button
                  onClick={handleSendOtp}
                  disabled={phone.length !== 10 || isLoading}
                  className="w-full bg-primary hover:bg-primary/90 h-12 text-lg"
                >
                  {isLoading ? 'Sending...' : 'Send OTP'}
                </Button>
              </>
            ) : (
              <>
                <div>
                  <p className="text-sm text-gray-600 mb-4 text-center">
                    OTP sent to +91 {phone}
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
                  className="w-full bg-primary hover:bg-primary/90 h-12 text-lg"
                >
                  {isLoading ? 'Verifying...' : 'Verify & Login'}
                </Button>

                <Button
                  variant="ghost"
                  onClick={handleSendOtp}
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