// utils/mockData.ts

export const getDashboardData = () => {
  return {
    totalRevenue: 50000,
    totalSales: 1200,
    activeUsers: 350,
    recentActivities: [
      "New order placed by User123",
      "Product 'Office Chair' restocked",
      "User456 updated their profile",
      "Sale of 'Gaming Desk' successful",
    ],
    salesByCategory: [
      { category: "Furniture", sales: 800 },
      { category: "Electronics", sales: 400 },
      { category: "Clothing", sales: 150 },
    ],
    deviceData: {
      mobile: 60,
      desktop: 40,
    },
  };
};

export const getAnalyticsData = () => {
  return {
    totalRevenue: 120000,
    totalSales: 3200,
    activeUsers: 1200,
    salesData: [
      { date: "2023-01-01", sales: 200 },
      { date: "2023-02-01", sales: 300 },
      { date: "2023-03-01", sales: 450 },
      { date: "2023-04-01", sales: 400 },
    ],
    deviceData: {
      mobile: 70,
      desktop: 30,
    },
  };
};
