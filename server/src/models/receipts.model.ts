import mongoose, { Schema, type Document, type Types } from 'mongoose';

export interface IReceipt extends Document {
  owner: Types.ObjectId;
  imageUrl: string;
  extractedData: {
    total?: Types.Decimal128;
    currency?: string;
    date?: string;
    vendor?: string;
    items: { name: string; price?: Types.Decimal128 }[];
  };
  transactionType: 'expense' | 'income';
  ocrRawText?: string;
  status:
    | 'pending'
    | 'ocr_completed'
    | 'ai_extraction_completed'
    | 'completed'
    | 'failed';
  paymentStatus: 'pending' | 'completed';
  createdAt: Date;
  updatedAt: Date;
}

const receiptSchema = new Schema<IReceipt>(
  {
    owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    imageUrl: { type: String, required: true },
    extractedData: {
      total: { type: Schema.Types.Decimal128 },
      currency: { type: String, default: 'INR' },
      date: { type: String },
      vendor: { type: String },
      items: [
        {
          name: { type: String, required: true },
          price: { type: Schema.Types.Decimal128, default: 0 },
        },
      ],
    },
    transactionType: {
      type: String,
      enum: ['expense', 'income'],
    },
    ocrRawText: { type: String },
    status: {
      type: String,
      enum: [
        'pending',
        'ocr_completed',
        'ai_extraction_completed',
        'completed',
        'failed',
      ],
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ['pending', 'completed'],
      default: 'pending',
    },
  },
  { timestamps: true }
);

export const Receipt = mongoose.model<IReceipt>('Receipt', receiptSchema);
