import { axios } from "../lib/axios";

export interface DecimalValue {
  $numberDecimal: string;
}

export interface ReceiptItem {
  _id?: string;
  name: string;
  price?: DecimalValue;
}

export interface ReceiptResponse {
  _id: string;
  imageUrl: string;
  extractedData: {
    total?: DecimalValue;
    date?: string;
    vendor?: string;
    items: ReceiptItem[];
  };
  transactionType?: "expense" | "income";
  createdAt: string;
  paymentStatus: "pending" | "completed";
  status?: string;
  owner?: string;
  updatedAt?: string;
}

export interface ApiResponse<T> {
  statusCode: number;
  data: T;
  message: string;
  success: boolean;
}

export interface PaginatedReceipts {
  receipts: ReceiptResponse[];
  page: number;
  totalReceipts: number;
  totalPages: number;
}

export interface DashboardData {
  totalReceipts: number;
  totalSpent: number;
  totalEarned: number;
  monthlyEarnedTrend: { totalEarned: number; year: number; month: number }[];
  monthlySpentTrend: { totalSpent: number; year: number; month: number }[];
  lastFiveReceipts: {
    extractedData: {
      total: DecimalValue;
      date: string;
      vendor: string;
    };
    _id: string;
    transactionType: string;
    paymentStatus: string;
  }[];
}

/** Upload a receipt */
export const uploadReceipt = async (file: File): Promise<string> => {
  try {
    const response = await axios.post<ApiResponse<ReceiptResponse>>(
      "/receipts/upload",
      file
    );
    return response.data.data._id;
  } catch (error: any) {
    throw error || "Receipt upload failed";
  }
};

/** Process receipt through OCR */
export const processReceipt = async (receiptId: string): Promise<string> => {
  try {
    const response = await axios.post<ApiResponse<ReceiptResponse>>(
      "/receipts/process",
      { receiptId }
    );
    return response.data.data._id;
  } catch (error: any) {
    throw error || "Receipt processing failed";
  }
};

/** Extract receipt data using AI */
export const extractReceiptData = async (
  receiptId: string
): Promise<ReceiptResponse> => {
  try {
    const response = await axios.post<ApiResponse<ReceiptResponse>>(
      "/receipts/extract",
      { receiptId }
    );
    return response.data.data;
  } catch (error: any) {
    throw error || "AI data extraction failed";
  }
};

/** Add meta data to receipt */
export const addReceiptMetaData = async (
  receiptId: string,
  transactionType: "income" | "expense",
  paymentStatus: "completed" | "pending"
): Promise<ReceiptResponse> => {
  try {
    const response = await axios.post<ApiResponse<ReceiptResponse>>(
      "/receipts/meta",
      { receiptId, transactionType, paymentStatus }
    );
    return response.data.data;
  } catch (error: any) {
    throw error || "Could not add meta data";
  }
};

/** Get paginated receipts */
export const getReceipts = async (
  limit = 10,
  page = 1
): Promise<PaginatedReceipts> => {
  try {
    const response = await axios.get<ApiResponse<PaginatedReceipts>>(
      `/receipts`,{params:{limit,page}}
    );
    return response.data.data;
  } catch (error: any) {
    throw error || "Failed to fetch receipts";
  }
};

/** Get receipt by ID */
export const getReceiptById = async (
  receiptId: string
): Promise<ReceiptResponse> => {
  try {
    const response = await axios.get<ApiResponse<ReceiptResponse>>(
      `/receipts/${receiptId}`
    );
    return response.data.data;
  } catch (error: any) {
    throw error || "Failed to fetch receipt";
  }
};

/** Get dashboard data */
export const getDashboardData = async (): Promise<DashboardData> => {
  try {
    const response = await axios.get<ApiResponse<DashboardData>>(
      "/receipts/dashboard"
    );
    return response.data.data;
  } catch (error: any) {
    throw error || "Couldn't get dashboard data";
  }
};

/** Search receipts by vendor name */
export const searchReceiptsByVendor = async (
  searchTerm: string
): Promise<ReceiptResponse[]> => {
  try {
    const response = await axios.get<ApiResponse<ReceiptResponse[]>>(
      `/receipts/search?searchTerm=${searchTerm}`
    );
    return response.data.data;
  } catch (error: any) {
    throw error || "Failed to search receipts";
  }
};
