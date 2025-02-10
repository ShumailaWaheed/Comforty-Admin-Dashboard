import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Title, Tooltip, Legend);

interface DeviceUsageData {
  device: string;
  usage: number;
}

const DeviceUsageChart = ({ data }: { data: DeviceUsageData[] }) => {
  const chartData = {
    labels: data.map((device) => device.device),
    datasets: [
      {
        data: data.map((device) => device.usage),
        backgroundColor: ["#4C74A4", "#29A89D", "#F4C542"],
        hoverBackgroundColor: ["#3C5B7C", "#238B7C", "#D3A136"],
        borderColor: "#fff",
        borderWidth: 2,
      },
    ],
  };

  return <Pie data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />;
};

export default DeviceUsageChart;
