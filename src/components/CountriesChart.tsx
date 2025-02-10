"use client";
import { Bar } from "react-chartjs-2";

interface CountrySalesChartProps {
  data: { country: string; sales: number }[];
}

const CountrySalesChart = ({ data }: CountrySalesChartProps) => {
  const chartData = {
    labels: data.map((item) => item.country),
    datasets: [
      {
        label: "Sales",
        data: data.map((item) => item.sales),
        backgroundColor: "#029FAE",
      },
    ],
  };

  return <Bar data={chartData} />;
};

export default CountrySalesChart;
