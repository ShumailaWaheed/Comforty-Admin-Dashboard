"use client";
import { useState, useEffect } from "react";
import Sidebar from "@/components/sidebar";
import StatsCard from "@/components/StatesCard";
import SalesChart from "@/components/SalesCard";
import OrdersChart from "@/components/OrderChart";

const getMockData = () => {
  return {
    totalCustomers: 567890,
    totalRevenue: 3465,
    totalOrders: 1136,
    totalReturns: 1789,
    salesData: {
      labels: ["1 Jul", "2 Jul", "3 Jul", "4 Jul", "5 Jul", "6 Jul", "7 Jul", "8 Jul", "9 Jul", "10 Jul", "11 Jul", "12 Jul"],
      datasets: [
        {
          label: "Revenue",
          data: [50000, 52000, 53000, 49000, 58000, 52187, 55000, 56000, 57000, 59000, 60000, 61000],
          borderColor: "#4caf50",
          backgroundColor: "rgba(76, 175, 80, 0.2)",
          fill: true,
        },
      ],
    },
    productCategoryData: {
      labels: ["Living Room", "Office", "Kitchen", "Dining Room", "Lighting", "Kids", "Bedroom", "Bathroom", "Decor", "Outdoor"],
      datasets: [
        {
          label: "Sales by Category",
          data: [25, 13, 9, 8, 3, 17, 12, 8, 6, 2],
          backgroundColor: ["#4caf50", "#ff9800", "#03a9f4", "#e91e63", "#ffc107", "#9c27b0", "#00bcd4", "#8bc34a", "#ff5722", "#607d8b"],
        },
      ],
    },
    countrySalesData: {
      labels: ["Poland", "Austria", "Spain", "Romania", "France", "Italy", "Germany", "Ukraine"],
      datasets: [
        {
          label: "Sales by Country",
          data: [19, 15, 13, 12, 11, 11, 10, 9],
          backgroundColor: ["#4caf50", "#ff9800", "#03a9f4", "#e91e63", "#ffc107", "#9c27b0", "#00bcd4", "#8bc34a"],
        },
      ],
    },
  };
};

const Dashboard = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const mockData = getMockData();
    setData(mockData);
  }, []);

  if (!data) return <div>Loading...</div>;

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 p-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard title="Total Customers" value={data.totalCustomers} description="Total registered customers." />
          <StatsCard title="Total Revenue" value={`$${data.totalRevenue}`} description="Total revenue generated." />
          <StatsCard title="Total Orders" value={data.totalOrders} description="Total number of orders placed." />
          <StatsCard title="Total Returns" value={data.totalReturns} description="Total returned orders." />
        </div>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
          <SalesChart data={data.salesData} />
          <OrdersChart data={data.productCategoryData} />
        </div>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
