import React from "react";
import { ReceiptTextIcon, ShoppingCartIcon, PiggyBankIcon, ScaleIcon } from "lucide-react";
import clsx from "clsx";

interface SummaryCardsProps {
  totalReceipts: number;
  totalSpent: number;
  totalEarned: number;
}

const SummaryCards: React.FC<SummaryCardsProps> = ({ totalReceipts, totalSpent, totalEarned }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4 shrink-0">
    <div className="bg-gradient-to-br from-primary/10 to-card text-text rounded-2xl p-6 flex items-center gap-5 shadow hover:shadow-lg transition duration-150">
      <ReceiptTextIcon size={40} className="shrink-0 text-primary" />
      <div>
        <h2 className="text-muted text-base font-medium">Total Receipts</h2>
        <h1 className="text-3xl font-extrabold tracking-tight">{totalReceipts}</h1>
      </div>
    </div>
    <div className="bg-gradient-to-br from-error/10 to-card text-text rounded-2xl p-6 flex items-center gap-5 shadow hover:shadow-lg transition duration-150">
      <ShoppingCartIcon size={40} className="shrink-0 text-error" />
      <div>
        <h2 className="text-muted text-base font-medium">Total Spent</h2>
        <h1 className="text-3xl font-extrabold tracking-tight">₹ {totalSpent.toLocaleString("en-IN")}</h1>
      </div>
    </div>
    <div className="bg-gradient-to-br from-success/10 to-card text-text rounded-2xl p-6 flex items-center gap-5 shadow hover:shadow-lg transition duration-150">
      <PiggyBankIcon size={40} className="shrink-0 text-success" />
      <div>
        <h2 className="text-muted text-base font-medium">Total Earned</h2>
        <h1 className="text-3xl font-extrabold tracking-tight">₹ {totalEarned.toLocaleString("en-IN")}</h1>
      </div>
    </div>
    <div className="bg-gradient-to-br from-info/10 to-card text-text rounded-2xl p-6 flex items-center gap-5 shadow hover:shadow-lg transition duration-150">
      <ScaleIcon size={40} className="shrink-0 text-info" />
      <div>
        <h2 className="text-muted text-base font-medium">Net Profit / Loss</h2>
        <h1 className={clsx("text-3xl font-extrabold tracking-tight", totalEarned - totalSpent >= 0 ? "text-success" : "text-error")}>₹ {Math.abs(totalEarned - totalSpent).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h1>
      </div>
    </div>
  </div>
);

export default SummaryCards;
