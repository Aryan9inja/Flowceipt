import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  extractReceiptData,
  processReceipt,
  uploadReceipt,
} from "../../services/receiptService";

export const uploadReceiptThunk = createAsyncThunk(
  "receipt/upload",
  async (file: File, { rejectWithValue }) => {
    try {
      const receiptId = await uploadReceipt(file);
      return receiptId;
    } catch (error: any) {
      return rejectWithValue(error?.message || "Image upload failed");
    }
  }
);

export const processReceiptThunk = createAsyncThunk(
  "receipt/process", // Changed from "receipt/upload"
  async (receiptId: string, { rejectWithValue }) => {
    try {
      await processReceipt(receiptId);
      return true;
    } catch (error: any) {
      return rejectWithValue(error?.message || "OCR processing failed");
    }
  }
);

export const extractDataThunk = createAsyncThunk(
  "receipt/extract", // Changed from "receipt/upload"
  async (receiptId: string, { rejectWithValue }) => {
    try {
      const res = await extractReceiptData(receiptId);
      return res.extractedData;
    } catch (error: any) {
      return rejectWithValue(error?.message || "Data extraction failed");
    }
  }
);