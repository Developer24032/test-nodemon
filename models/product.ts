import { Schema, model } from 'mongoose';
import { IProductDocument, IProductModel } from '../interfaces/Product';

const productSchema = new Schema<IProductDocument, IProductModel>({
  name: {
    type: String,
    required: [true, 'product name must be provided'],
    trim: true,
    maxlength: [100, 'name cannot be more than 100 characters']
  },
  price: {
    type: Number,
    required: [true, 'product price must be provided'],
    min: [0, 'price must be positive']
  },
  featured: {
    type: Boolean,
    default: false,
  },
  rating: {
    type: Number,
    default: 4.5,
    min: [1, 'rating must be at least 1'],
    max: [5, 'rating cannot be more than 5']
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  company: {
    type: String,
    enum: {
      values: ['ikea', 'liddy', 'caressa', 'marcos'],
      message: '{VALUE} is not supported',
    },
  },
});

export default model<IProductDocument, IProductModel>('Product', productSchema);
