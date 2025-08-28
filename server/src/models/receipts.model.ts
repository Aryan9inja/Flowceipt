import mongoose, { Schema, type Document, type Types } from 'mongoose';

export interface IReceipt extends Document {
  owner: Types.ObjectId;

  imageUrl?: string;
  extractedData?: {
    total?: Types.Decimal128;
    currency?: string;
    date?: string;
    vendor?: string;
    items: { name: string; price?: Types.Decimal128; quantity?: number }[];
  };
  ocrRawText?: string;
  client?: {
    name: string;
    email: string;
  };
  items?: { name: string; price?: Types.Decimal128; quantity?: number }[];
  totalAmount?: Types.Decimal128;
  transactionType: 'expense' | 'income';
  status:
    | 'pending'
    | 'ocr_completed'
    | 'ai_extraction_completed'
    | 'invoice_sent'
    | 'completed'
    | 'failed';

  paymentStatus: 'pending' | 'completed';
  stripePaymentLink?: string;
  stripePaymentIntentId?: string;

  createdAt: Date;
  updatedAt: Date;
}

const receiptSchema = new Schema<IReceipt>(
  {
    owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },

    imageUrl: { type: String }, // optional now
    extractedData: {
      total: { type: Schema.Types.Decimal128 },
      currency: { type: String, default: 'INR' },
      date: { type: String },
      vendor: { type: String },
      items: [
        {
          name: { type: String },
          price: { type: Schema.Types.Decimal128, default: 0 },
          quantity: { type: Number, default: 1 },
        },
      ],
    },
    ocrRawText: { type: String },

    client: {
      name: { type: String },
      email: { type: String },
    },
    items: [
      {
        name: { type: String },
        price: { type: Schema.Types.Decimal128, default: 0 },
        quantity: { type: Number, default: 1 },
      },
    ],
    totalAmount: { type: Schema.Types.Decimal128 },

    transactionType: {
      type: String,
      enum: ['expense', 'income'],
      required: true,
    },

    status: {
      type: String,
      enum: [
        'pending',
        'ocr_completed',
        'ai_extraction_completed',
        'invoice_sent',
        'completed',
        'failed',
      ],
      required: true,
      default: 'pending',
    },

    paymentStatus: {
      type: String,
      enum: ['pending', 'completed'],
      default: 'pending',
    },
    stripePaymentLink: { type: String },
    stripePaymentIntentId: { type: String },
  },
  { timestamps: true }
);

export const Receipt = mongoose.model<IReceipt>('Receipt', receiptSchema);
