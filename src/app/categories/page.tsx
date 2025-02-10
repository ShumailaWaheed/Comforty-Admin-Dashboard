"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Sidebar from "@/components/sidebar";
import Image from "next/image";
import { fetchProducts } from "./fetchproducts";
import { Product } from "@/types/products";

export default function CategoryPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
        setFilteredProducts(data);
        const uniqueCategories: string[] = [
          "All",
          ...Array.from(
            new Set(
              data
                .map((product) => product.category?.title)
                .filter((title): title is string => title !== undefined)
            )
          ),
        ];
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Error loading products:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const handleFilter = (category: string) => {
    setSelectedCategory(category);
    setDropdownOpen(false);
    if (category === "All") {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(
        products.filter((product) => product.category?.title === category)
      );
    }
  };

  const filteredCategories = categories.filter((category) =>
    category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-gray-100 min-h-screen flex">
      <div className="w-64 h-screen sticky top-0">
        <Sidebar />
      </div>

      <main className="flex-1 p-6 overflow-y-auto">
        <div className="relative mb-6 max-w-sm mx-auto">
          <input
            type="text"
            placeholder="Search category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => setDropdownOpen(true)}
            className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#029FAE]"
          />
          {dropdownOpen && (
            <div className="absolute w-full bg-white shadow-md rounded-md mt-2 max-h-60 overflow-auto border z-10">
              {filteredCategories.length > 0 ? (
                filteredCategories.map((category) => (
                  <button
                    key={category}
                    className={`w-full text-left px-4 py-2 hover:bg-[#029FAE] hover:text-white transition ${
                      selectedCategory === category ? "bg-[#029FAE] text-white" : "text-black"
                    }`}
                    onClick={() => handleFilter(category)}
                  >
                    {category}
                  </button>
                ))
              ) : (
                <p className="text-gray-500 px-4 py-2">No categories found.</p>
              )}
            </div>
          )}
        </div>

        {loading ? (
          <div className="text-center">Loading...</div>
        ) : filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredProducts.map((product) => (
              <div
                key={product._id}
                className="relative bg-white shadow-md rounded-xl overflow-hidden flex flex-col justify-center items-center p-4 group"
                style={{ backgroundColor: "#F8F9FA" }}
              >
                <Image
                  src={product.image?.asset?.url}
                  alt={product.title}
                  width={200}
                  height={200}
                  className="w-full h-40 object-cover rounded-md group-hover:scale-105 transition-transform duration-300"
                />
                <h2 className="text-lg font-semibold text-gray-700 mt-3">
                  {product.title}
                </h2>
                <Link href={`/product/${product._id}`}>
                <button className="mt-3 px-4 py-2 bg-[#029FAE] text-white rounded-full hover:bg-[#027e85] transition-all shadow-md">
                 View Details
                </button>
              </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500">No products found.</div>
        )}
      </main>
    </div>
  );
}