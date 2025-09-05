"use client";

import React, { useState } from 'react';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CartItem } from '@/lib/types';

interface Props {
  item: ProductCartItem;
  updateQuantity: (id: string, qty: number) => void;
  removeItem: (id: string) => void;
}

export default function CartItemRow({ item, updateQuantity, removeItem }: Props) {
  const [expanded, setExpanded] = useState(false);
  const [localQty, setLocalQty] = useState(item.quantity);

  const applyQty = () => {
    const q = Math.max(1, Math.min(item.product.stock, Math.floor(Number(localQty) || 1)));
    updateQuantity(item.product.id, q);
    setLocalQty(q);
  };

  return (
    <div className="bg-white rounded-xl p-6 border card-hover">
      <div className="flex gap-4">
        <a href={`/products/${item.product.id}`} className="block w-20 h-20 shrink-0">
          <img src={item.product.image} alt={item.product.name} className="w-20 h-20 object-cover rounded-lg bg-gray-50" />
        </a>

        <div className="flex-1">
          <div className="flex items-start justify-between">
            <div>
              <a href={`/products/${item.product.id}`} className="block">
                <h3 className="font-semibold text-gray-800 mb-1">{item.product.name}</h3>
              </a>
              <p className="text-sm text-gray-600 mb-2">{item.product.unit}</p>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-lg">₹{item.product.price * item.quantity}</span>
                {item.product.originalPrice && (
                  <span className="text-sm text-gray-400 line-through">₹{item.product.originalPrice}</span>
                )}
              </div>
            </div>

            <div className="flex flex-col items-end space-y-2">
              <div className="flex items-center border rounded-lg">
                <Button variant="ghost" size="sm" onClick={() => updateQuantity(item.product.id, item.quantity - 1)} disabled={item.quantity <= 1} className="h-8 w-8 p-0"><Minus className="w-4 h-4"/></Button>
                <span className="px-3 py-1 font-medium">{item.quantity}</span>
                <Button variant="ghost" size="sm" onClick={() => updateQuantity(item.product.id, item.quantity + 1)} disabled={item.quantity >= item.product.stock} className="h-8 w-8 p-0"><Plus className="w-4 h-4"/></Button>
              </div>

              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm" onClick={() => setExpanded(!expanded)}>Edit</Button>
                <Button variant="ghost" size="sm" onClick={() => removeItem(item.product.id)} className="text-red-600"><Trash2 className="w-4 h-4"/></Button>
              </div>
            </div>
          </div>

          {expanded && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-center">
                <div>
                  <label className="text-sm text-gray-600 block mb-1">Quantity</label>
                  <div className="flex items-center">
                    <Input value={String(localQty)} onChange={(e) => setLocalQty(Number(e.target.value))} className="w-20 mr-3" />
                    <Button size="sm" onClick={applyQty}>Update</Button>
                  </div>
                </div>

                <div>
                  <label className="text-sm text-gray-600 block mb-1">Stock</label>
                  <div className="text-sm text-gray-600">{item.product.stock} available</div>
                </div>

                <div>
                  <label className="text-sm text-gray-600 block mb-1">Subtotal</label>
                  <div className="font-semibold">₹{item.product.price * item.quantity}</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
