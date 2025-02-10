import { client } from "@/sanity/lib/client";
import Image from "next/image";
import Link from "next/link";
import Sidebar from "@/components/sidebar";

async function getProduct(id: string) {
  return await client.fetch(
    `*[_type == "products" && _id == $id][0] {
      _id,
      title,
      price,
      originalPrice,
      inventory,
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
}

export default async function ProductDetail({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id);

  if (!product) {
    return <div className="text-center py-10">Product not found.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <div className="md:w-64 w-0 md:block hidden h-screen sticky top-0">
        <Sidebar />
      </div>

      <div className="flex-1 p-6">
        <div className="max-w-4xl mx-auto bg-white shadow-md rounded-xl overflow-hidden p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <Image
                src={product.image?.asset?.url || "/placeholder.png"}
                alt={product.title}
                width={500}
                height={500}
                className="w-full h-auto rounded-lg object-cover shadow-md"
              />
            </div>

            <div className="flex-1">
              <h1 className="text-4xl font-bold text-gray-800">{product.title}</h1>

              <p className="mt-2">
                <span className="bg-blue-100 text-blue-700 text-sm font-semibold px-3 py-1 rounded-full">
                  {product.category?.title || "Uncategorized"}
                </span>
              </p>

              <div className="mt-4 flex items-center space-x-4">
                <p className="text-2xl font-bold text-[#029FAE]">${product.price}</p>
                {product.originalPrice && product.originalPrice > product.price && (
                  <p className="text-lg text-gray-500 line-through">${product.originalPrice}</p>
                )}
                {product.originalPrice && product.originalPrice > product.price && (
                  <span className="bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-md">
                    {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                  </span>
                )}
              </div>

              <p className="mt-3 text-sm font-semibold">
                {product.inventory && product.inventory > 0 ? (
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">
                    In Stock: {product.inventory}
                  </span>
                ) : (
                  <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full">
                    Out of Stock
                  </span>
                )}
              </p>

              <p className="text-gray-700 mt-4">{product.description}</p>

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
    </div>
  );
}
