"use client";

import React from "react";

const ProductAnalytics = ({ data }: { data: any }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <h3 className="font-semibold text-xl">Product Sales</h3>
      <div className="mt-4">
        {/* Replace this with your charting library, e.g., Chart.js */}
        <p>Total Sales: {data.totalSales}</p>
        <p>Sales by Category:</p>
        <ul>
          {data.salesByCategory.map((item: any) => (
            <li key={item.category}>
              {item.category}: {item.sales}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProductAnalytics;
