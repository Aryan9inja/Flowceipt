import { createSlice } from "@reduxjs/toolkit";
import type { ReceiptResponse } from "../../services/receiptService";
import {
  extractDataThunk,
  processReceiptThunk,
  uploadReceiptThunk,
} from "../thunks/receiptThunk";

interface ReceiptState {
  data: ReceiptResponse["extractedData"] | null;
  receiptId: string | null;
  loadingStep: "none" | "upload" | "ocr" | "ai";
  error: string | null;
  ocrDone: boolean;
}

const initialState: ReceiptState = {
  data: null,
  receiptId: null,
  loadingStep: "none",
  error: null,
  ocrDone: false,
};

const receiptSlice = createSlice({
  name: "receipt",
  initialState,
  reducers: {
    clearReceiptState: (state) => {
      state.data = null;
      state.receiptId = null;
      state.loadingStep = "none";
      state.ocrDone = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Use a single continuous chain
    builder
      // Upload receipt thunk cases
      .addCase(uploadReceiptThunk.pending, (state) => {
        state.loadingStep = "upload";
        state.error = null;
      })
      .addCase(uploadReceiptThunk.fulfilled, (state, action) => {
        state.receiptId = action.payload;
      })
      .addCase(uploadReceiptThunk.rejected, (state, action) => {
        state.loadingStep = "none";
        state.error = action.payload as string;
      })
      
      // Process receipt thunk cases
      .addCase(processReceiptThunk.pending, (state) => {
        state.loadingStep = "ocr";
        state.error = null;
      })
      .addCase(processReceiptThunk.fulfilled, (state, action) => {
        state.ocrDone = action.payload;
      })
      .addCase(processReceiptThunk.rejected, (state, action) => {
        state.loadingStep = "none";
        state.error = action.payload as string;
      })
      
      // Extract data thunk cases
      .addCase(extractDataThunk.pending, (state) => {
        state.loadingStep = "ai";
        state.error = null;
      })
      .addCase(extractDataThunk.fulfilled, (state, action) => {
        state.data = action.payload;
      })
      .addCase(extractDataThunk.rejected, (state, action) => {
        state.loadingStep = "none";
        state.error = action.payload as string;
      });
  },
});

export const {clearReceiptState} = receiptSlice.actions
export default receiptSlice.reducer
