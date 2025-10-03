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
    <section className="w-full max-w-4xl mx-auto px-4 py-6 flex flex-col gap-4 bg-gradient-to-br from-bg to-card/80 rounded-xl shadow-lg min-h-[60vh]">
      <div className="sticky top-0 z-10">
        <InfoBar />
      </div>
      <div className="flex flex-col gap-3">
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
      </div>
      <div ref={loaderRef} className="h-12 flex items-center justify-center">
        {loading && <p className="text-info">Loading...</p>}
        {!hasMore && <p className="text-muted">No more receipts</p>}
      </div>
    </section>
  );
};

export default AllReceipts;
