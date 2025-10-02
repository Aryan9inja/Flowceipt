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
import DashboardHeader from "./DashboardHeader";
import SummaryCards from "./SummaryCards";
import TrendCharts from "./TrendCharts";
import LastReceiptsList from "./LastReceiptsList";

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(
    null
  );
  const name = useSelector((state: RootState) => state.auth.user?.name);

  // safer defaults to avoid crashes before data loads

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
    <div className="min-h-screen bg-gradient-to-br from-bg to-card/80 flex">
      {/* Desktop sidebar */}
      <div className="hidden sm:block">
        <DesktopNav />
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col items-center sm:ml-64 mb-18 sm:mb-0">
        <Toaster position="top-center" richColors />
        <main className="w-full max-w-5xl px-4 py-8 flex flex-col gap-8">
          <DashboardHeader name={name} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col gap-8">
              <SummaryCards
                totalReceipts={dashboardData?.totalReceipts ?? 0}
                totalSpent={dashboardData?.totalSpent ?? 0}
                totalEarned={dashboardData?.totalEarned ?? 0}
              />
              <TrendCharts
                totalSpent={dashboardData?.totalSpent ?? 0}
                totalEarned={dashboardData?.totalEarned ?? 0}
              />
            </div>
            <div className="flex flex-col gap-8">
              <LastReceiptsList receipts={dashboardData?.lastFiveReceipts ?? []} />
            </div>
          </div>
        </main>
        {/* Mobile bottom nav */}
        <div className="sm:hidden w-full fixed bottom-0 left-0 z-50">
          <MobileNav />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
