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
    <div className="flex justify-between bg-card shadow-card rounded mb-2 p-2 text-text hover:bg-secondary transition cursor-pointer items-center">
      <div>
        <h1
          className={clsx(
            "text-2xl font-semibold",
            transactionType === "income"
              ? "text-green-600"
              : "text-red-600"
            )}
            >
          {vendor}
        </h1>
        <p>{date}</p>
      </div>
      <div>
        <h2 className={clsx("text-2xl",
          transactionType === "income"
            ? "text-green-600"
            : "text-red-600",
            paymentStatus === "pending" && "text-orange-500"

        )}>{total}</h2>
      </div>
    </div>
  );
};

export default ReceiptCard;
