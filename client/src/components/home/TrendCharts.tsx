import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";

interface TrendChartsProps {
  totalSpent: number;
  totalEarned: number;
}

const COLORS = ["#22c55e", "#ef4444"];

const TrendCharts: React.FC<TrendChartsProps> = ({ totalSpent, totalEarned }) => {
  const data = [
    { name: "Income", value: totalEarned },
    { name: "Expense", value: totalSpent },
  ];
  return (
    <div className="bg-card p-4 rounded-2xl shadow-lg hover:shadow-xl transition duration-150 flex flex-col items-center justify-center">
      <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-center">Income vs Expense</h2>
      <ResponsiveContainer width="100%" height={260}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) => percent !== undefined ? `${name}: ${(percent * 100).toFixed(1)}%` : name}
            outerRadius={90}
            dataKey="value"
          >
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value: number) => `₹ ${value.toLocaleString("en-IN")}`} />
          <Legend verticalAlign="bottom" height={36} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};
export default TrendCharts;
