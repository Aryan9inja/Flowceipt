import { useEffect, useRef } from "react";
import type { ReceiptResponse } from "../../services/receiptService";
import InfoBar from "./infoBar";
import ReceiptCard from "./receiptCard";

interface Props {
  receipts: ReceiptResponse[];
  loadMore: () => void;
  hasMore: boolean;
  loading: boolean;
}

const AllReceipts = ({ receipts = [], loadMore, hasMore, loading }: Props) => {
  const loaderRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          loadMore();
        }
      },
      { threshold: 1.0 }
    );

    const currentLoader = loaderRef.current;
    if (currentLoader) observer.observe(currentLoader);

    return () => {
      if (currentLoader) observer.unobserve(currentLoader);
    };
  }, [hasMore, loadMore, loading]);

  return (
    <div className="px-2 h-[calc(100%-8rem)] overflow-y-scroll">
      <div className="top-0 sticky">
        <InfoBar />
      </div>
      {receipts.map((r) => (
        <ReceiptCard
          key={r._id}
          vendor={r.extractedData.vendor ?? "Unknown"}
          total={r.extractedData.total?.$numberDecimal ?? "Null"}
          date={r.extractedData.date ?? "Unknown day"}
          transactionType={r.transactionType ?? "Expense"}
          paymentStatus={r.paymentStatus}
        />
      ))}
      <div ref={loaderRef} className="h-12 flex items-center justify-center">
        {loading && <p className="text-info">Loading...</p>}
        {!hasMore && <p className="text-muted">No more receipts</p>}
      </div>
    </div>
  );
};

export default AllReceipts;
