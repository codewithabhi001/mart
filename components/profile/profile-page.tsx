'use client';

import React, { useState } from 'react';
import { Edit2, MapPin, Phone, Mail, Trash2, Plus, CreditCard, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/lib/context/auth-context';
import { toast } from 'sonner';
import AddressForm from './address-form';
import { useTheme } from 'next-themes';

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState<string | null>(null);
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const isDark = mounted ? theme === 'dark' : false;

  if (!user) return null;

  const handleDeleteAccount = () => {
    toast.success('Account deletion request submitted. You will receive a confirmation email within 24 hours.');
    logout();
  };

  const handleSaveAddress = (address: any) => {
    // Persist to local storage demo (update user)
    try {
      const saved = JSON.parse(localStorage.getItem('grocery-user') || 'null');
      if (saved) {
        const existing = saved.addresses || [];
        const idx = existing.findIndex((a: any) => a.id === address.id);
        if (idx >= 0) existing[idx] = address;
        else existing.push(address);
        saved.addresses = existing;
        localStorage.setItem('grocery-user', JSON.stringify(saved));
        // Update context by reloading page (simple demo)
        toast.success('Address saved');
        window.location.reload();
      }
    } catch (err) {
      toast.error('Failed to save address');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-3 gap-8">
        <aside className="space-y-6">
          <Card>
            <CardContent className="space-y-4 p-6 text-center">
              <div className={`w-24 h-24 mx-auto rounded-full flex items-center justify-center text-3xl font-bold ${theme === 'dark' ? 'bg-white/8 text-white' : 'bg-primary-green text-white'}`}>
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <h2 className="text-xl font-semibold">{user.name}</h2>
                <p className="text-sm text-gray-500">Regular Customer</p>
              </div>

              <div className="space-y-2 mt-3 text-sm text-gray-600">
                <div className="flex items-center justify-center space-x-2">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <span>{user.phone}</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <span>{user.email}</span>
                </div>
              </div>

              <div className="flex items-center justify-center space-x-3 mt-4">
                <Button variant="outline" onClick={() => setIsAddingAddress(true)}>
                  <Plus className="w-4 h-4 mr-2" /> Add Address
                </Button>
                <Button variant="ghost" onClick={() => { logout(); toast.success('Logged out'); }}>
                  <LogOut className="w-4 h-4 mr-2" /> Logout
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Membership</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">Silver Member</h3>
                  <p className="text-sm text-gray-500">Earned: 850 points</p>
                </div>
                <Badge className="bg-emerald-600 text-white">Active</Badge>
              </div>
            </CardContent>
          </Card>
        </aside>

        <main className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Order History</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {user.orderHistory && user.orderHistory.length > 0 ? (
                user.orderHistory.map((order: any) => (
                  <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-medium">Order #{order.id}</div>
                      <div className="text-sm text-gray-500">{order.items.length} items • ₹{order.total}</div>
                    </div>
                    <div className="text-sm text-gray-600">{order.status}</div>
                  </div>
                ))
              ) : (
                <div className="text-center p-8 text-gray-500">
                  <p className="mb-3">You have no orders yet.</p>
                  <a href="/products" className="inline-block"><Button className="bg-primary-green text-white">Start Shopping</Button></a>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Saved Addresses</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {user.addresses && user.addresses.length > 0 ? (
                user.addresses.map((address) => (
                  <div key={address.id} className="border rounded-lg p-4 flex justify-between items-start">
                    <div>
                      <div className="flex items-center space-x-2 mb-2">
                        <Badge className="bg-primary-green text-white">{address.type}</Badge>
                        {address.isDefault && <Badge className="bg-emerald-600 text-white">Default</Badge>}
                      </div>
                      <div className="font-medium">{address.street}</div>
                      <div className="text-sm text-gray-500">{address.city}, {address.state} - {address.pincode}</div>
                    </div>

                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm" onClick={() => { setEditingAddressId(address.id); }}>
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-red-600" onClick={() => {
                        try {
                          const saved = JSON.parse(localStorage.getItem('grocery-user') || 'null');
                          if (saved) {
                            saved.addresses = saved.addresses.filter((a: any) => a.id !== address.id);
                            localStorage.setItem('grocery-user', JSON.stringify(saved));
                            window.location.reload();
                          }
                        } catch (err) {
                          toast.error('Failed to remove address');
                        }
                      }}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center text-gray-500">
                  No addresses saved yet. Add one to get started.
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Payment Methods</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg flex items-center justify-between">
                  <div>
                    <div className="font-medium">Cash on Delivery</div>
                    <div className="text-sm text-gray-500">Pay when you receive</div>
                  </div>
                  <Badge className="bg-green-500 text-white">Default</Badge>
                </div>

                <div className="p-4 border rounded-lg flex items-center justify-between">
                  <div>
                    <div className="font-medium">UPI</div>
                    <div className="text-sm text-gray-500">Pay with your UPI app</div>
                  </div>
                  <div className="text-sm text-gray-500">Added</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button variant="destructive" onClick={handleDeleteAccount}>
              <Trash2 className="w-4 h-4 mr-2" /> Delete Account
            </Button>
          </div>
        </main>
      </div>

      {/* Address Modal */}
      {isAddingAddress && (
        <AddressForm
          onClose={() => setIsAddingAddress(false)}
          onSave={(addr) => { handleSaveAddress(addr); setIsAddingAddress(false); }}
        />
      )}

      {editingAddressId && (
        <AddressForm
          address={user.addresses.find(a => a.id === editingAddressId)}
          onClose={() => setEditingAddressId(null)}
          onSave={(addr) => { handleSaveAddress(addr); setEditingAddressId(null); }}
        />
      )}
    </div>
  );
}
