import { uploadToCloudinary } from '../utils/uploadToCloudinary';
import { runOCR } from '../utils/ocr';
import type { RequestHandler } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import { ApiError } from '../utils/apiError';
import { ApiResponse } from '../utils/apiResponse';
import type { Request, Response } from 'express';
import { Receipt } from '../models/receipts.model';
import { extractDataFromOCR } from '../services/aiService';
import {
  getMonthlyEarnedTrend,
  getMonthlySpentTrend,
  getTotalEarned,
  getTotalReceipts,
  getTotalSpent,
} from '../repositories/receiptRepositories';

interface DashboardData {
  owner: string;
  totalReceipts: number;
  totalSpent: number;
  totalEarned: number;
  monthlyEarnedTrend: Array<any>;
  monthlySpentTrend: Array<any>;
  lastFiveReceipts: Array<any>;
}

const uploadReceipt: RequestHandler = asyncHandler(async (req, res) => {
  const file = req.file;
  if (!file) throw new ApiError(400, 'No file uploaded');

  const cloudinaryUrl = await uploadToCloudinary(file.buffer);
  if (!cloudinaryUrl) throw new ApiError(500, 'Receipt image upload failed');

  const receipt = await Receipt.create({
    owner: req.user?._id,
    imageUrl: cloudinaryUrl,
    status: 'pending',
  });

  res
    .status(201)
    .json(new ApiResponse(201, receipt, 'Receipt uploaded successfully'));
});

const processReceipt: RequestHandler = asyncHandler(async (req, res) => {
  const { receiptId } = req.body;
  if (!receiptId) throw new ApiError(400, 'Receipt ID is required');

  const receipt = await Receipt.findOne({
    _id: receiptId,
    owner: req.user?._id,
  });
  if (!receipt) throw new ApiError(404, 'Receipt not found');

  try {
    const ocrText = await runOCR(receipt.imageUrl);
    if (!ocrText) throw new ApiError(500, 'OCR failed');

    receipt.ocrRawText = ocrText;
    receipt.status = 'processing';
    await receipt.save({ validateModifiedOnly: true });

    res.status(200).json(new ApiResponse(200, receipt, 'OCR ran successfully'));
  } catch (error) {
    receipt.status = 'failed';
    await receipt.save({ validateModifiedOnly: true });
    throw error;
  }
});

const extractReceiptData: RequestHandler = asyncHandler(async (req, res) => {
  const { receiptId } = req.body;
  if (!receiptId) throw new ApiError(400, 'Receipt ID is required');

  const receipt = await Receipt.findOne({
    _id: receiptId,
    owner: req.user?._id,
  });
  if (!receipt) throw new ApiError(404, 'Receipt not found');

  if (!receipt.ocrRawText)
    throw new ApiError(404, 'No raw OCR text to supply to AI');

  try {
    const extractedData = await extractDataFromOCR(receipt.ocrRawText);
    receipt.extractedData = extractedData;
    receipt.status = 'completed';
    await receipt.save({ validateModifiedOnly: true });

    res
      .status(200)
      .json(new ApiResponse(200, receipt, 'AI extracted data successfully'));
  } catch (error) {
    receipt.status = 'failed';
    await receipt.save({ validateModifiedOnly: true });
    throw error;
  }
});

const getReceipts: RequestHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const user = req.user?._id;

    if (!user) throw new ApiError(404, 'User not found');

    const receipts = await Receipt.find({ owner: user })
      .select('-ocrRawText')
      .sort({ createdAt: -1 });

    res
      .status(200)
      .json(new ApiResponse(200, receipts, 'Receipts fetched successfully'));
  }
);

const getReceiptById: RequestHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const user = req.user?._id;
    const receiptId = req.params.id;

    if (!user) throw new ApiError(404, 'User not found');
    if (!receiptId) throw new ApiError(404, 'No receipt Id sent');

    const receipt = await Receipt.findOne({
      _id: receiptId,
      owner: user,
    }).select('-ocrRawText');

    if (!receipt) throw new ApiError(404, 'No receipt found');

    res
      .status(200)
      .json(new ApiResponse(200, receipt, 'Receipt fetched successfully'));
  }
);

const updateReceiptMetaData: RequestHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const { receiptId, transactionType, paymentStatus } = req.body;

    if (!receiptId) throw new ApiError(400, 'Receipt Id is required');

    const receipt = await Receipt.findOne({
      _id: receiptId,
      owner: req.user?._id,
    });
    if (!receipt) throw new ApiError(404, 'Receipt not found');

    if (transactionType && !['expense', 'income'].includes(transactionType)) {
      throw new ApiError(400, 'Invalid receipt type');
    }

    if (paymentStatus && !['pending', 'completed'].includes(paymentStatus)) {
      throw new ApiError(400, 'Invalid payment status');
    }

    if (transactionType) receipt.transactionType = transactionType;
    if (paymentStatus) receipt.paymentStatus = paymentStatus;

    await receipt.save({ validateModifiedOnly: true });

    res
      .status(200)
      .json(new ApiResponse(200, receipt, 'Receipt meta data added'));
  }
);

const receiptDashboardData: RequestHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user?._id;

    if (!userId) throw new ApiError(404, 'User not found');

    try {
      const totalReceipts = await getTotalReceipts(userId);
      const totalSpent = await getTotalSpent(userId);
      const totalEarned = await getTotalEarned(userId);
      const monthlyEarnedTrend = await getMonthlyEarnedTrend(userId);
      const monthlySpentTrend = await getMonthlySpentTrend(userId);
      const lastFiveReceipts = await Receipt.find({ owner: userId })
        .sort({ createdAt: -1 })
        .limit(5)
        .select('extractedData.total extractedData.date extractedData.vendor transactionType paymentStatus');

      const dashboardData: DashboardData = {
        owner: String(userId),
        totalReceipts,
        totalSpent,
        totalEarned,
        monthlyEarnedTrend,
        monthlySpentTrend,
        lastFiveReceipts,
      };

      res
        .status(200)
        .json(
          new ApiResponse(
            200,
            dashboardData,
            'Dashboard data fetched successfully'
          )
        );
    } catch (error) {
      throw new ApiError(500, 'Aggregation process failed');
    }
  }
);

export {
  uploadReceipt,
  processReceipt,
  extractReceiptData,
  getReceipts,
  getReceiptById,
  updateReceiptMetaData,
  receiptDashboardData,
};
