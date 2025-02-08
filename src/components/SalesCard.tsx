"use client";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface SalesChartProps {
  data: ChartData<"line">;  
}

const SalesChart = ({ data }: SalesChartProps): JSX.Element => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <h3 className="text-xl font-semibold">Sales Trend (Last 6 Months)</h3>
      <Line data={data} />
    </div>
  );
};

export default SalesChart;
