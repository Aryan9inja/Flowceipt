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
import { json } from 'stream/consumers';

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

    const { limit, page } = req.query;

    let limit_int = 10;
    if (typeof limit === 'string') {
      const parsed = parseInt(limit, 10);
      if (!Number.isNaN(parsed)) limit_int = parsed;
    }

    let page_int = 1;
    if (typeof page === 'string') {
      const parsed = parseInt(page, 10);
      if (!Number.isNaN(parsed)) page_int = parsed;
    }

    const skip = (page_int - 1) * limit_int;

    const receipts = await Receipt.find({ owner: user })
      .select('-ocrRawText')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit_int);

    const totalDocuments = await Receipt.countDocuments({ owner: user });

    res.status(200).json(
      new ApiResponse(
        200,
        {
          receipts,
          page: page_int,
          totalReceipts: totalDocuments,
          totalPages: Math.ceil(totalDocuments / limit_int),
        },
        'Receipts fetched successfully'
      )
    );
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
        .sort({ createdAt:-1 })
        .limit(5)
        .select(
          'extractedData.total extractedData.date extractedData.vendor transactionType paymentStatus'
        );

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

const searchReceiptsByVender: RequestHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const { searchTerm } = req.query;

    if (!searchTerm || typeof searchTerm !== 'string') {
      return res.status(400).json({
        success: false,
        message: 'Search term query parameter is required',
      });
    }

    const receipts = await Receipt.find({
      owner: req.user?._id,
      'extractedData.vendor': { $regex: searchTerm, $options: 'i' },
    }).select('-ocrRawText');

    res.status(200).json(new ApiResponse(200, receipts, 'Receipts found'));
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
  searchReceiptsByVender,
};
