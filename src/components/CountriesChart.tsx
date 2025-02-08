import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Title, Tooltip, Legend } from "chart.js";

// Register the necessary components
ChartJS.register(ArcElement, Title, Tooltip, Legend);

const CountrySalesChart = ({ data }: { data: any }) => {
  const chartData = {
    labels: data.map((country: any) => country.country),
    datasets: [
      {
        data: data.map((country: any) => country.sales),
        backgroundColor: ["#FF8A5C", "#FFB24C", "#3CB3A4", "#4DAE76"],
        hoverBackgroundColor: ["#FF734A", "#FF9A2A", "#32A47C", "#3D9B5C"],
        borderColor: "#fff",
        borderWidth: 2,
      },
    ],
  };

  return <Pie data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />;
};

export default CountrySalesChart;
