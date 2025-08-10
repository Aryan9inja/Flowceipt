import { uploadToCloudinary } from '../utils/uploadToCloudinary';
import { runOCR } from '../utils/ocr';
import type { RequestHandler } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import { ApiError } from '../utils/apiError';
import { ApiResponse } from '../utils/apiResponse';
import type { Request, Response } from 'express';
import { Receipt } from '../models/receipts.model';
import { parseReceiptText } from '../utils/parseReceiptText';

const uploadReceipt: RequestHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const file = req.file;
    if (!file) throw new ApiError(400, 'No file uploaded');

    const receipt = await Receipt.create({
      owner: req.user?._id,
      status: 'processing',
      imageUrl: '',
      extractedData: { items: [] },
    });

    try {
      const [ocrText, cloudinaryUrl] = await Promise.all([
        runOCR(file.buffer),
        uploadToCloudinary(file.buffer),
      ]);

      const extractedData = parseReceiptText(ocrText);

      receipt.imageUrl = cloudinaryUrl;
      ((receipt.ocrRawText = ocrText),
        (receipt.extractedData = extractedData),
        (receipt.status = 'completed'),
        await receipt.save());

      res
        .status(201)
        .json(
          new ApiResponse(201, { receipt }, 'Receipt processed successfully')
        );
    } catch (error) {
      receipt.status = 'failed';
      await receipt.save();
      throw error;
    }
  }
);

export { uploadReceipt };
