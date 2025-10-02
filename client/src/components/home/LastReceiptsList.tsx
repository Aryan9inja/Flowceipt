import React from "react";
import clsx from "clsx";

interface Receipt {
  _id: string;
  transactionType: string;
  paymentStatus: string;
  extractedData?: {
    vendor?: string;
    total: { $numberDecimal: string };
  };
}

interface LastReceiptsListProps {
  receipts: Receipt[];
}

const LastReceiptsList: React.FC<LastReceiptsListProps> = ({ receipts }) => (
  <div className="bg-card p-6 rounded-2xl shadow-lg flex-1 min-h-64 flex flex-col">
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 shrink-0 space-y-2">
      <h2 className="font-bold text-lg text-info">Last Five Receipts</h2>
      <div className="flex items-center justify-center sm:justify-end space-x-3 sm:space-x-6 text-sm">
        <div className="flex items-center space-x-1">
          <span className="inline-block w-3 h-3 rounded-full bg-success"></span>
          <span className="text-muted">Income</span>
        </div>
        <div className="flex items-center space-x-1">
          <span className="inline-block w-3 h-3 rounded-full bg-error"></span>
          <span className="text-muted">Expense</span>
        </div>
        <div className="flex items-center space-x-1">
          <span className="inline-block w-3 h-3 rounded-full bg-orange-500"></span>
          <span className="text-muted">Pending</span>
        </div>
      </div>
    </div>
    <div className="space-y-4 overflow-y-auto scroll-smooth pr-1">
      {receipts && receipts.length > 0 ? (
        receipts.map((receipt) => (
          <div
            key={receipt._id}
            className={clsx(
              "flex items-center justify-between p-3 bg-bg rounded-xl shadow hover:shadow-md transition duration-150 cursor-pointer",
              receipt.paymentStatus === "pending" ? "border-l-4 border-orange-500" : ""
            )}
          >
            <div className="flex items-center gap-3">
              <span className={clsx(
                "inline-block w-2.5 h-2.5 rounded-full",
                receipt.transactionType === "income"
                  ? "bg-success"
                  : "bg-error"
              )}></span>
              <p className={clsx(
                "font-semibold text-base",
                receipt.transactionType === "income"
                  ? "text-success"
                  : "text-error"
              )}>{receipt.extractedData?.vendor}</p>
            </div>
            <p className={clsx(
              "font-semibold text-base truncate sm:text-right",
              receipt.transactionType === "income"
                ? "text-success"
                : "text-error",
              receipt.paymentStatus === "pending" && "text-orange-500"
            )}>
              ₹ {Number(receipt.extractedData?.total.$numberDecimal).toLocaleString("en-IN", { minimumFractionDigits: 2 })}
            </p>
          </div>
        ))
      ) : (
        <p className="text-muted text-center text-2xl">No recent receipts available.</p>
      )}
    </div>
  </div>
);

export default LastReceiptsList;
