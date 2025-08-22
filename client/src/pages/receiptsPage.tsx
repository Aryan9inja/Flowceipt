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

const ReceiptPage = () => {
  const [receipts, setReceipts] = useState<ReceiptResponse[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchRes, setSearchRes] = useState<ReceiptResponse[]>([]);

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

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
  }, [page,fetchReceipts]);

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

  return (
    <div className="flex h-screen">
      {/* Desktop sidebar */}
      <div className="hidden sm:flex">
        <DesktopNav />
      </div>

      {/* Main content */}
      <div className="w-full bg-bg overflow-hidden">
        <Toaster position="top-center" richColors />
        <SearchReceipts searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <AllReceipts
          receipts={searchTerm ? searchRes : receipts}
          loadMore={loadMore}
          hasMore={hasMore}
          loading={loading}
        />
      </div>

      {/* Mobile bottom nav */}
      <div className="sm:hidden">
        <MobileNav />
      </div>
    </div>
  );
};

export default ReceiptPage;
