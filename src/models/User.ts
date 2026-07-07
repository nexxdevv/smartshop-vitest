import mongoose, { Schema, Document, model, models } from 'mongoose';

export interface IOrder {
  items: Array<{
    productId: string;
    name: string;
    price: number;
    quantity: number;
    emoji: string;
  }>;
  totalCost: number;
  createdAt: Date;
}

export interface IUser extends Document {
  name: string;
  email: string;
  address?: string;
  orderHistory: IOrder[];
}

const OrderSchema = new Schema<IOrder>({
  items: [
    {
      productId: { type: String, required: true },
      name: { type: String, required: true },
      price: { type: Number, required: true },
      quantity: { type: Number, required: true },
      emoji: { type: String, required: true },
    },
  ],
  totalCost: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  address: { type: String, default: '' },
  orderHistory: [OrderSchema],
});

export const User = models.User || model<IUser>('User', UserSchema);