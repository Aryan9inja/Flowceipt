import { axios } from "../lib/axios";

interface ReceiptResponse {
  _id: string;
  imageUrl: string;
  extractedData: {
    total?: number;
    date?: string;
    vendor?: string;
    items: { name: string; price?: number }[];
  };
  transactionType?: "expense" | "income";
  createdAt: string;
  paymentStatus: "pending" | "completed";
}

export interface DashboardData {
  totalReceipts: number;
  totalSpent: number;
  totalEarned: number;

  monthlyEarnedTrend: {
    totalEarned: number;
    year: number;
    month: number;
  }[];

  monthlySpentTrend: {
    year: number;
    month: number;
    totalSpent: number;
  }[];

  lastFiveReceipts: {
    extractedData: {
      total:{
        $numberDecimal:number
      };
      date: string;
      vendor: string;
      _id: string;
    };
    transactionType:string,
    paymentStatus:string
  }[];
}


interface DashboardResponse {
  statusCode: number;
  data: DashboardData;
  message: string;
  success: boolean;
}

/**
 * Upload a receipt
 * @param {File} file - Receipt Image file
 */
export const uploadReceipt = async (file: File): Promise<String> => {
  try {
    const response = await axios.post<ReceiptResponse>(
      "/receipts/upload",
      file
    );
    return response.data._id;
  } catch (error: any) {
    throw error?.response?.data || { message: "Receipt Upload failed" };
  }
};

/**
 * Process receipt through OCR
 * @param {string} receiptId - Id of receipt to be processed
 */
export const processReceipt = async (receiptId: string): Promise<String> => {
  try {
    const response = await axios.post<ReceiptResponse>("/receipts/process", {
      receiptId,
    });
    return response.data._id;
  } catch (error: any) {
    throw error?.response?.data || { message: "Receipt Upload failed" };
  }
};

/**
 * Extract receipt data using AI
 * @param {string} receiptId - Receipt Id for AI data extraction
 */
export const extractReceiptData = async (
  receiptId: string
): Promise<ReceiptResponse> => {
  try {
    const response = await axios.post<ReceiptResponse>("/receipts/extract", {
      receiptId,
    });
    return response.data;
  } catch (error: any) {
    throw error?.response?.data || { message: "AI data extraction failed" };
  }
};

/**
 * Add meta data to receipt
 * @param {string} receiptId -Receipt Id to add meta data
 * @param {string} transactionType - Type of transaction (income or expense)
 * @param {string} paymentStatus - Status of payment (completed or pending)
 */
export const addReceiptMetaData = async (
  receiptId: string,
  transactionType: string,
  paymentStatus: string
): Promise<ReceiptResponse> => {
  try {
    const response = await axios.post<ReceiptResponse>("/receipts/meta", {
      receiptId,
      transactionType,
      paymentStatus,
    });
    return response.data;
  } catch (error: any) {
    throw error?.response?.data || { message: "Could not add meta data" };
  }
};

/**
 * Get all receipts
 */
export const getReceipts = async (): Promise<ReceiptResponse[]> => {
  try {
    const response = await axios.get<ReceiptResponse[]>("/receipts");
    return response.data;
  } catch (error: any) {
    throw error?.response?.data || { message: "Failed to fetch receipts" };
  }
};

/**
 * Get receipt by id
 * @param {string} receiptId -Receipt Id to fetch
 */
export const getReceiptById = async (
  receiptId: string
): Promise<ReceiptResponse> => {
  try {
    const response = await axios.get<ReceiptResponse>(`/receipts/${receiptId}`);
    return response.data;
  } catch (error: any) {
    throw error?.response?.data || { message: "Failed to fetch receipt" };
  }
};

/**
 * Get dashboard data
 */
export const getDashboardData = async (): Promise<DashboardData> => {
  try {
    const response = await axios.get<DashboardResponse>("/receipts/dashboard");
    return response.data.data;
  } catch (error: any) {
    throw error?.response?.data || { message: "Couldn't get dashboard data" };
  }
};
