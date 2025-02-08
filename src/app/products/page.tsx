// /app/products/page.tsx
import Sidebar from "@/components/sidebar";
import { client } from "@/sanity/lib/client";
import ProductManagementClient from "@/components/ProductManagement";

// Define a TypeScript interface for a Product
export interface Product {
  _id: string;
  title: string;
  price: number;
  priceWithoutDiscount: number;
  badge: string;
  image: {
    asset: {
      _id: string;
      url: string;
    };
  };
  category: {
    title: string;
  };
  description: string;
  inventory: number;
  tags: string[];
}

// This is a Server Component that fetches data from Sanity
export default async function Products() {
  let products: Product[] = [];

  try {
    // Fetch product data from Sanity
    products = await client.fetch(
      `*[_type == "products"] {
        _id,
        title,
        price,
        priceWithoutDiscount,
        badge,
        image {
          asset -> {
            _id,
            url
          }
        },
        category -> { title },
        description,
        inventory,
        tags
      }`
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error fetching products:", error.message);
    } else {
      console.error("An unknown error occurred.");
    }
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      {/* Pass the fetched products to the client component */}
      <ProductManagementClient initialProducts={products} />
    </div>
  );
}
