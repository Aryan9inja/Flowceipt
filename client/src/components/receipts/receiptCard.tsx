import clsx from "clsx";

interface ReceiptCardProps {
  vendor: string;
  total: string;
  date: string;
  transactionType:string
  paymentStatus:string
}

const ReceiptCard = ({ vendor, total, date,transactionType,paymentStatus }: ReceiptCardProps) => {
  return (
    <div className="flex justify-between items-center bg-card/90 shadow rounded-xl px-6 py-4 mb-2 text-text hover:bg-secondary/80 transition cursor-pointer">
      <div className="flex flex-col gap-1">
        <span
          className={clsx(
            "text-lg font-semibold",
            transactionType === "income"
              ? "text-green-600"
              : "text-red-600"
          )}
        >
          {vendor}
        </span>
        <span className="text-xs text-muted">{date}</span>
      </div>
      <div className="flex flex-col items-end">
        <span className={clsx(
          "text-lg font-bold",
          transactionType === "income"
            ? "text-green-600"
            : "text-red-600",
          paymentStatus === "pending" && "text-orange-500"
        )}>{total}</span>
        <span className={clsx(
          "text-xs mt-1",
          paymentStatus === "pending" ? "text-orange-500" : "text-muted"
        )}>{paymentStatus}</span>
      </div>
    </div>
  );
};

export default ReceiptCard;
