'use server';

import dbConnect from '@/lib/db';
import { User } from '@/models/User';

export async function authenticateOrCreateUser(formData: { name: string; email: string }) {
  await dbConnect();

  const cleanedEmail = formData.email.trim().toLowerCase();

  // Look for existing customer record
  let user = await User.findOne({ email: cleanedEmail });

  if (!user) {
    // Register new buyer profile
    user = await User.create({
      name: formData.name.trim(),
      email: cleanedEmail,
      address: '',
      orderHistory: [],
    });
  }

  // Serialize and return document fields for client-side state machine hydration
  return {
    id: user._id.toString(),
    name: user.name,
    email: user.email,
    address: user.address || '',
    orderHistory: JSON.parse(JSON.stringify(user.orderHistory || [])),
  };
}

export async function fetchUserProfile(email: string) {
  await dbConnect();
  const user = await User.findOne({ email: email.trim().toLowerCase() });
  if (!user) return null;

  return {
    id: user._id.toString(),
    name: user.name,
    email: user.email,
    address: user.address || '',
    orderHistory: JSON.parse(JSON.stringify(user.orderHistory || [])),
  };
}