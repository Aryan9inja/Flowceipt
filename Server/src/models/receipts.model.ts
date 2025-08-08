import mongoose, { Schema, type Document, type Types } from 'mongoose';

export interface IReceipt extends Document {
  owner: Types.ObjectId;
  imageUrl: string;
  extractedData: {
    total?: Types.Decimal128;
    date?: string;
    vendor?: string;
    items: { name: string; price?: Types.Decimal128 }[];
  };
  ocrRawText?: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  createdAt: Date;
  updatedAt: Date;
}

const receiptSchema = new Schema<IReceipt>(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    extractedData: {
      total: { type: Schema.Types.Decimal128 },
      date: { type: String },
      vendor: { type: String },
      items: [
        {
          name: { type: String, required: true },
          price: { type: Schema.Types.Decimal128 },
        },
      ],
    },
    ocrRawText: { type: String },
    status: {
      type: String,
      enum: ['pending', 'processing', 'completed', 'failed'],
      required: true,
    },
  },
  { timestamps: true }
);

export const Receipt = mongoose.model<IReceipt>('Receipt', receiptSchema);
