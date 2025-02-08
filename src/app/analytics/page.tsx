"use client";

import { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ChartOptions,
} from "chart.js";
import DeviceUsageChart from "@/components/DeviceChart";
import CountrySalesChart from "@/components/CountriesChart";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend, Filler);

interface SalesData {
  date: string;
  amount: number;
}

interface DeviceData {
  device: string;
  usage: number;
}

interface CountryData {
  country: string;
  sales: number;
}

const AnalyticsPage = () => {
  const [salesData, setSalesData] = useState<SalesData[]>([]);
  const [deviceData, setDeviceData] = useState<DeviceData[]>([]);
  const [countryData, setCountryData] = useState<CountryData[]>([]);

  useEffect(() => {
    const fetchSalesData = async () => {
      const data: SalesData[] = [
        { date: "2025-02-01", amount: 500 },
        { date: "2025-02-02", amount: 800 },
        { date: "2025-02-03", amount: 300 },
        { date: "2025-02-04", amount: 900 },
        { date: "2025-02-05", amount: 1200 },
      ];
      setSalesData(data);
    };

    const fetchDeviceUsageData = async () => {
      const data: DeviceData[] = [
        { device: "Desktop", usage: 40 },
        { device: "Mobile", usage: 50 },
        { device: "Tablet", usage: 10 },
      ];
      setDeviceData(data);
    };

    const fetchCountryData = async () => {
      const data: CountryData[] = [
        { country: "USA", sales: 1500 },
        { country: "Germany", sales: 800 },
        { country: "India", sales: 600 },
        { country: "UK", sales: 400 },
      ];
      setCountryData(data);
    };

    fetchSalesData();
    fetchDeviceUsageData();
    fetchCountryData();
  }, []);

  const salesChartData = {
    labels: salesData.map((sale) => sale.date),
    datasets: [
      {
        label: "Sales Amount",
        data: salesData.map((sale) => sale.amount),
        backgroundColor: "rgba(2, 159, 174, 0.2)",
        borderColor: "#029FAE",
        borderWidth: 3,
        pointBackgroundColor: "#029FAE",
        pointRadius: 5,
        fill: true,
      },
    ],
  };

  const options: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 2000,
      easing: "easeInOutCubic",
      onComplete: () => {
        console.log("Animation complete!");
      },
    } as Partial<ChartOptions<"line">["animation"]>, 
    elements: {
      point: {
        radius: 6,
        hoverRadius: 8,
        backgroundColor: "#029FAE",
        hoverBackgroundColor: "#026f77",
      },
      line: {
        tension: 0.4,
      },
    },
    plugins: {
      tooltip: {
        enabled: true,
      },
      legend: {
        display: true,
        labels: {
          color: "#029FAE",
        },
      },
    },
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50 p-6">
      <h1 className="text-4xl font-semibold text-center text-[#029FAE] mb-12">
        Analytics Dashboard
      </h1>

      {/* Sales Analytics Chart */}
      <div className="bg-white p-6 rounded-xl shadow-xl mb-8 hover:shadow-2xl transition-shadow duration-300">
        <h2 className="text-2xl font-semibold text-[#029FAE] mb-4">Sales Analytics</h2>
        <div className="relative h-80">
          <Line data={salesChartData} options={options} />
        </div>
      </div>

      {/* Device Usage and Country Sales Analytics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Device Usage Analytics */}
        <div className="bg-white p-6 rounded-xl shadow-xl hover:shadow-2xl transition-shadow duration-300">
          <h2 className="text-2xl font-semibold text-[#029FAE] mb-4">Device Usage</h2>
          <div className="relative h-72">
            <DeviceUsageChart data={deviceData} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-xl hover:shadow-2xl transition-shadow duration-300">
          <h2 className="text-2xl font-semibold text-[#029FAE] mb-4">Sales by Country</h2>
          <div className="relative h-60">
            <CountrySalesChart data={countryData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
