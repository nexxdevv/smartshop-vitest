'use server';

import dbConnect from '@/lib/db';
import { User } from '@/models/User';

interface OrderPayload {
  email: string;
  address: string;
  items: Array<{
    productId: string;
    name: string;
    price: number;
    quantity: number;
    emoji: string;
  }>;
  totalCost: number;
}

export async function processOrderCheckout(payload: OrderPayload) {
  await dbConnect();

  const user = await User.findOne({ email: payload.email.trim().toLowerCase() });
  if (!user) {
    throw new Error('User account profile could not be verified.');
  }

  // Update default address details
  user.address = payload.address.trim();

  // Inject fresh purchase event log
  user.orderHistory.unshift({
    items: payload.items,
    totalCost: payload.totalCost,
    createdAt: new Date(),
  });

  await user.save();

  return {
    success: true,
    savedAddress: user.address,
  };
}