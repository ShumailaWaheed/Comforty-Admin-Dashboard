// sanity/lib/fetchProducts.js
import { client } from './client';

export async function fetchProducts() {
  const query = `*[_type == "products"]{
    _id,
    title,
    price,
    priceWithoutDiscount,
    badge,
    "imageUrl": image.asset->url,
    category->{
      _id,
      title
    },
    description,
    inventory,
    tags
  }`;

  try {
    const products = await client.fetch(query);
    return products;
  } catch (error) {
    console.error("Error fetching products:", error);
    return []; 
  }
}

