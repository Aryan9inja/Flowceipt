import { useEffect, useState } from "react";
import DesktopNav from "../ui/Navbars/desktopNav";
import MobileNav from "../ui/Navbars/mobileNav";
import {
  type DashboardData,
  getDashboardData,
} from "../../services/receiptService";
import { Toaster, toast } from "sonner";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import {
  ReceiptTextIcon,
  ShoppingCartIcon,
  PiggyBankIcon,
  ScaleIcon,
} from "lucide-react";
import clsx from "clsx";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface TrendData {
  year: number;
  month: number;
  totalSpent?: number;
  totalEarned?: number;
}

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(
    null
  );
  const name = useSelector((state: RootState) => state.auth.user?.name);

  // safer defaults to avoid crashes before data loads
  const spentData: TrendData[] = dashboardData?.monthlySpentTrend ?? [];
  const earnedData: TrendData[] = dashboardData?.monthlyEarnedTrend ?? [];

  const formatData = (data: TrendData[], key: "totalSpent" | "totalEarned") => {
    if (!data) return [];
    return data.map((d) => ({
      name: `${months[d.month]} ${d.year}`,
      value: d[key],
    }));
  };

  const formattedSpent = formatData(spentData, "totalSpent");
  const formattedEarned = formatData(earnedData, "totalEarned");

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const dashboardData = await getDashboardData();
        setDashboardData(dashboardData);
      } catch (error: any) {
        toast.error(error.message || "Dashboard data couldn't be fetched");
      }
    };
    fetchDashboardData();
  }, []);

  return (
    <div className="flex h-auto sm:h-screen overflow-y-auto sm:overflow-hidden">
      {/* Desktop sidebar */}
      <div className="hidden sm:flex">
        <DesktopNav />
      </div>

      {/* Main content */}
      <Toaster position="top-center" richColors />
      <main className="bg-bg w-full p-4 flex flex-col min-h-0 sm:h-screen sm:overflow-hidden pb-18 sm:pb-0">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-2 shrink-0">
          <h1 className="text-xl md:text-2xl font-semibold text-text">
            Hi <span className="font-bold">{name}</span> 👋, here’s your expense
            overview
          </h1>

          <select
            name="timeRange"
            id="timeRange"
            className="bg-card text-text rounded-lg border border-border px-2 py-1 text-sm shadow-sm w-32 md:w-48 focus:outline-none focus:ring-2 focus:ring-info transition"
          >
            <option value="m">This Month</option>
            <option value="a">All Time</option>
          </select>
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-2 shrink-0">
          <div className="bg-card text-text rounded-2xl p-4 flex items-center gap-4 shadow-sm">
            <ReceiptTextIcon size={36} className="shrink-0" />
            <div>
              <h2 className="text-muted text-sm">Total Receipts</h2>
              <h1 className="text-2xl md:text-3xl font-bold">
                {dashboardData?.totalReceipts ?? 0}
              </h1>
            </div>
          </div>

          <div className="bg-card text-text rounded-2xl p-4 flex items-center gap-4 shadow-sm">
            <ShoppingCartIcon size={36} className="shrink-0" />
            <div>
              <h2 className="text-muted text-sm">Total Spent</h2>
              <h1 className="text-2xl md:text-3xl font-bold">
                ₹ {(dashboardData?.totalSpent ?? 0).toLocaleString("en-IN")}
              </h1>
            </div>
          </div>

          <div className="bg-card text-text rounded-2xl p-4 flex items-center gap-4 shadow-sm">
            <PiggyBankIcon size={36} className="shrink-0" />
            <div>
              <h2 className="text-muted text-sm">Total Earned</h2>
              <h1 className="text-2xl md:text-3xl font-bold">
                ₹ {(dashboardData?.totalEarned ?? 0).toLocaleString("en-IN")}
              </h1>
            </div>
          </div>

          <div className="bg-card text-text rounded-2xl p-4 flex items-center gap-4 shadow-sm">
            <ScaleIcon size={36} className="shrink-0" />
            <div>
              <h2 className="text-muted text-sm">Net Profit / Loss</h2>
              <h1
                className={clsx(
                  "text-2xl md:text-3xl font-bold",
                  (dashboardData?.totalEarned ?? 0) -
                    (dashboardData?.totalSpent ?? 0) >=
                    0
                    ? "text-success"
                    : "text-error"
                )}
              >
                ₹{" "}
                {Math.abs(
                  (dashboardData?.totalEarned ?? 0) -
                    (dashboardData?.totalSpent ?? 0)
                ).toLocaleString("en-IN", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </h1>
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 shrink-0">
          <div className="bg-card p-4 rounded-2xl shadow">
            <h2 className="text-lg font-semibold mb-4 text-text">
              Monthly Spent Trend
            </h2>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={formattedSpent}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#ef4444"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-card p-4 rounded-2xl shadow">
            <h2 className="text-lg font-semibold mb-4 text-text">
              Monthly Earned Trend
            </h2>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={formattedEarned}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#22c55e"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Last five receipts */}
        <div className="mt-2 sm:flex-1 sm:min-h-0 flex flex-col">
          <div className="bg-card p-4 rounded-2xl shadow flex-1 min-h-0 flex flex-col">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 shrink-0 space-y-2 sm:space-y-0">
              <h2 className="font-semibold text-info">Last Five Receipts</h2>

              <div className="flex items-center justify-center sm:justify-end space-x-2 sm:space-x-4 text-xs">
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 rounded-full bg-green-600"></div>
                  <span className="text-muted">Income</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 rounded-full bg-red-600"></div>
                  <span className="text-muted">Expense</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                  <span className="text-muted">Pending</span>
                </div>
              </div>
            </div>

            <div className="space-y-3 max-h-[22rem] sm:max-h-none sm:flex-1 sm:min-h-0 overflow-y-auto pr-1">
              {dashboardData?.lastFiveReceipts &&
              dashboardData.lastFiveReceipts.length > 0 ? (
                dashboardData.lastFiveReceipts.map((receipt) => (
                  <div
                    key={receipt.extractedData._id}
                    className="flex items-center justify-between p-2 sm:p-3 bg-bg rounded-xl shadow-sm"
                  >
                    <div className="flex items-center space-x-2">
                      <p
                        className={clsx(
                          "font-medium",
                          receipt.transactionType === "income"
                            ? "text-green-600"
                            : "text-red-600"
                        )}
                      >
                        {receipt.extractedData.vendor}
                      </p>
                    </div>

                    <p
                      className={clsx(
                        "font-medium truncate sm:text-right",
                        receipt.transactionType === "income"
                          ? "text-green-600"
                          : "text-red-600",
                        receipt.paymentStatus === "pending" && "text-orange-500"
                      )}
                    >
                      ₹{" "}
                      {Number(
                        receipt.extractedData.total.$numberDecimal
                      ).toLocaleString("en-IN", {
                        minimumFractionDigits: 2,
                      })}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-muted text-sm text-center">
                  No recent receipts available.
                </p>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Mobile bottom nav */}
      <div className="sm:hidden">
        <MobileNav />
      </div>
    </div>
  );
};

export default Dashboard;
