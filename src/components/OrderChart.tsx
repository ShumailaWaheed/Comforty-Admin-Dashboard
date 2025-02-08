import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface OrdersChartProps {
  data: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      backgroundColor: string[];
    }[];
  };
}

const OrdersChart: React.FC<OrdersChartProps> = ({ data }) => {
  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: "Sales by Category",
        data: data.datasets[0].data,
        backgroundColor: data.datasets[0].backgroundColor,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        enabled: true,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          borderColor: "#ddd",
        },
      },
    },
    animation: {
      duration: 3000,
      easing: "easeOutBounce", 
      onProgress: (animation: any) => {
        console.log("Animation progress:", animation);
      },
      onComplete: () => {
        console.log("Animation completed!");
      },
    } as any, 
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-xl font-semibold mb-4">Orders by Category</h3>
      <div className="h-64">
        <Bar data={chartData} options={chartOptions as any} />
      </div>
    </div>
  );
};

export default OrdersChart;

