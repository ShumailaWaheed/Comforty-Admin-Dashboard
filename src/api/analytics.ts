import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const data = {
      salesOverTime: {
        months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        sales: [1000, 2000, 2500, 3000, 4500, 5000],
      },
      salesByCategory: {
        categories: ["Chairs", "Sofas", "Tables", "Desks"],
        sales: [3000, 1500, 2000, 2500],
      },
      salesDistribution: {
        categories: ["Chairs", "Sofas", "Tables", "Desks"],
        sales: [3000, 1500, 2000, 2500],
      },
    };
  
    res.status(200).json(data);
  }
  