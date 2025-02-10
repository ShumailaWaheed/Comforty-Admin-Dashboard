import { client } from "@/sanity/lib/client";
import { Product } from "@/types/products";

const fetchProductsQuery = `*[_type == "products"] {
  _id,
  title,
  price,
  image {
    asset -> {
      _id,
      url
    }
  },
  category -> { title },
  description
}`;

export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const data: Product[] = await client.fetch(fetchProductsQuery);
    return data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};