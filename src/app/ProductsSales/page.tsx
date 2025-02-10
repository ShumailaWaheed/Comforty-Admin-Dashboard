import ProductSalesChart from "./SalesChart";

const salesData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May"],
  datasets: [
    {
      label: "Sales",
      data: [100, 200, 150, 220, 300],
      backgroundColor: ["#1E3A8A", "#2563EB", "#3B82F6", "#60A5FA", "#93C5FD"],
    },
  ],
};

export default function ProductsSalesPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Product Sales Overview</h1>
      <ProductSalesChart data={salesData} />
    </div>
  );
}
