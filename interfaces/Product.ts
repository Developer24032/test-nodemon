import { Model } from "mongoose";

export interface IProduct {
    name: string;
    price: number;
    featured?: boolean;
    rating?: number;
    createdAt?: Date;
    company?: 'ikea' | 'liddy' | 'caressa' | 'marcos';
  }
  
  export interface IProductDocument extends IProduct, Document {}
  export interface IProductModel extends Model<IProductDocument> {}