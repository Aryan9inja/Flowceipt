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
import UploadLoader from "../components/ui/Loaders/uploadLoader";
import OcrLoader from "../components/ui/Loaders/ocrLoader";
import AiLoader from "../components/ui/Loaders/aiLoader";

const ReceiptPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loadingStep } = useSelector((state: RootState) => state.receipt);
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

  if (loadingStep == "upload") return <UploadLoader />;
  if (loadingStep == "ocr") return <OcrLoader />;
  if (loadingStep == "ai") return <AiLoader />;

  if (loadingStep == "none")
    return (
      <div className="min-h-screen bg-gradient-to-br from-bg to-card/80 flex">
        {/* Desktop sidebar */}
        <div className="hidden sm:block">
          <DesktopNav />
        </div>

        {/* Main content */}
        <div className="flex-1 flex flex-col items-center sm:ml-64 mb-18 sm:mb-0">
          <Toaster position="top-center" richColors />
          <main className="w-full max-w-5xl px-4 py-8 flex flex-col gap-8">
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
          </main>
          <div className="fixed bottom-24 right-6 z-40">
            <label className="bg-primary rounded-full text-text px-6 py-3 shadow-xl cursor-pointer hover:bg-primary-hover transition text-lg font-semibold">
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
          <div className="sm:hidden w-full fixed bottom-0 left-0 z-50">
            <MobileNav />
          </div>
        </div>
      </div>
    );
};

export default ReceiptPage;
