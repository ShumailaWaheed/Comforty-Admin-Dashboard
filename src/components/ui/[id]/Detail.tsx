"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { client } from "@/sanity/lib/client";
import { Product } from "@/types/products";
import Image from "next/image";
import Link from "next/link";

export default function ProductDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        const data = await client.fetch(
          `*[_type == "products" && _id == $id][0] {
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
          }`,
          { id }
        );

        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (!product) return <div className="text-center py-10">Product not found.</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-xl overflow-hidden p-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Product Image */}
          <div className="flex-1">
            <Image
              src={product.image?.asset?.url || "/placeholder.png"}
              alt={product.title}
              width={500}
              height={500}
              className="w-full h-auto rounded-lg object-cover"
            />
          </div>

          {/* Product Details */}
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-800">{product.title}</h1>
            <p className="text-gray-600 mt-2">{product.category?.title}</p>
            <p className="text-xl font-semibold text-[#029FAE] mt-4">${product.price}</p>
            <p className="text-gray-700 mt-4">{product.description}</p>

            {/* Buttons */}
            <div className="mt-6 flex gap-4">
              <button className="px-6 py-2 bg-[#029FAE] text-white rounded-lg hover:bg-[#027e85] transition">
                Add to Cart
              </button>
              <Link href="/">
                <button className="px-6 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition">
                  Back to Home
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
