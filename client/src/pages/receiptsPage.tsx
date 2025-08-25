import { useCallback, useEffect, useState } from "react";
import DesktopNav from "../components/ui/Navbars/desktopNav";
import MobileNav from "../components/ui/Navbars/mobileNav";
import {
  getReceipts,
  searchReceiptsByVendor,
  type ReceiptResponse,
} from "../services/receiptService";
import { toast, Toaster } from "sonner";
import AllReceipts from "../components/receipts/allReceipts";
import SearchReceipts from "../components/receipts/searchReceipts";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store/store";
import {
  extractDataThunk,
  processReceiptThunk,
  uploadReceiptThunk,
} from "../store/thunks/receiptThunk";

const ReceiptPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loadingStep } = useSelector(
    (state: RootState) => state.receipt
  );
  const navigate = useNavigate();

  const [receipts, setReceipts] = useState<ReceiptResponse[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchRes, setSearchRes] = useState<ReceiptResponse[]>([]);

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
  if (!e.target.files?.[0]) return;

  const uploadRes = await dispatch(uploadReceiptThunk(e.target.files[0]));

  if (uploadReceiptThunk.fulfilled.match(uploadRes)) {
    const newReceiptId = uploadRes.payload;

    await dispatch(processReceiptThunk(newReceiptId));
    await dispatch(extractDataThunk(newReceiptId));

    navigate("/receipts/review");
  } else {
    toast.error("Upload failed");
  }
};


  const fetchReceipts = useCallback(async (pageNum: number) => {
    try {
      setLoading(true);

      const res = await getReceipts(10, pageNum);

      if (pageNum >= res.totalPages) {
        setHasMore(false);
      }

      setReceipts((prev) =>
        pageNum === 1 ? res.receipts : [...prev, ...res.receipts]
      );
    } catch (error) {
      toast.error("Receipt fetching failed");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchReceipts(page);
  }, [page, fetchReceipts]);

  useEffect(() => {
    if (!searchTerm) {
      setSearchRes([]);
      return;
    }

    const handler = setTimeout(async () => {
      try {
        const res = await searchReceiptsByVendor(searchTerm);
        setSearchRes(res);
      } catch (err) {
        console.error("Search failed", err);
      }
    }, 250);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  const loadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchReceipts(nextPage);
  };

  if (loadingStep == "upload") return <div>Uploading...</div>;
  if (loadingStep == "ocr") return <div>Getting OCR text...</div>;
  if (loadingStep == "ai") return <div>Using Ai magic...</div>;

  if (loadingStep == "none")
    return (
      <div className="flex h-screen">
        {/* Desktop sidebar */}
        <div className="hidden sm:flex">
          <DesktopNav />
        </div>

        {/* Main content */}
        <div className="w-full bg-bg overflow-hidden">
          <Toaster position="top-center" richColors />
          <SearchReceipts
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
          <AllReceipts
            receipts={searchTerm ? searchRes : receipts}
            loadMore={loadMore}
            hasMore={hasMore}
            loading={loading}
          />
        </div>
        <div className="absolute bottom-22 sm:bottom-6 right-6">
          <label className="bg-primary rounded-full text-text p-4 shadow-xl cursor-pointer hover:bg-primary-hover transition">
            New Receipt
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleUpload}
            />
          </label>
        </div>

        {/* Mobile bottom nav */}
        <div className="sm:hidden">
          <MobileNav />
        </div>
      </div>
    );
};

export default ReceiptPage;
