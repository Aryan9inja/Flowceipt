import React from "react";

interface DashboardHeaderProps {
  name?: string;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ name }) => (
  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4 shrink-0 w-full">
    <h1 className="text-2xl md:text-3xl font-bold text-text tracking-tight">
      Hi <span className="text-primary font-extrabold">{name}</span> 👋, <span className="font-normal">here’s your expense overview</span>
    </h1>
    <select
      name="timeRange"
      id="timeRange"
      className="bg-card text-text rounded-xl border border-border px-3 py-2 text-base shadow focus:outline-none focus:ring-2 focus:ring-primary transition duration-150 hover:border-primary w-36 md:w-52"
    >
      <option value="m">This Month</option>
      <option value="a">All Time</option>
    </select>
  </div>
);

export default DashboardHeader;
