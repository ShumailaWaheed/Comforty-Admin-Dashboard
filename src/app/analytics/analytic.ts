import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const data = {
    salesOverTime: {
      months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      sales: [500, 700, 800, 650, 900, 1100],
    },
    deviceUsage: [
      { device: "Desktop", usage: 40 },
      { device: "Mobile", usage: 50 },
      { device: "Tablet", usage: 10 },
    ],
    countrySales: [
      { country: "USA", sales: 1500 },
      { country: "Germany", sales: 800 },
      { country: "India", sales: 600 },
      { country: "UK", sales: 400 },
    ],
  };

  res.status(200).json(data);
}
