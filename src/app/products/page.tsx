import Sidebar from "@/components/sidebar";
import { client } from "@/sanity/lib/client";
import ProductManagementClient from "@/components/ProductManagement";
import { Product } from "@/types/products";

export default async function Products() {
  let products: Product[] = [];

  try {
    products = await client.fetch(
      `*[_type == "products"] {
        _id,
        title,
        price,
        originalPrice, // ✅ Ensure originalPrice is fetched
        products, // ✅ Ensure products count is fetched
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
    console.error(
      "Error fetching products:",
      error instanceof Error ? error.message : "Unknown error"
    );
  }

  const formattedProducts: Product[] = products.map(product => ({
    ...product,
    originalPrice: product.originalPrice ?? product.price, 
    products: product.products ?? 0,
    imageUrl: product.image?.asset?.url, 
  }));

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <ProductManagementClient initialProducts={formattedProducts} />
    </div>
  );
}
