"use client";
import { useState } from 'react';

interface Product {
  name: string;
  price: number;
}

const AddProduct: React.FC = () => {
  const [product, setProduct] = useState<Product>({ name: '', price: 0 });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle product submission (e.g., send to backend)
    console.log('New Product:', product);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold">Add New Product</h1>
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="mb-4">
          <label htmlFor="name" className="block text-lg font-semibold">Product Name</label>
          <input 
            type="text" 
            id="name" 
            name="name" 
            value={product.name} 
            onChange={handleChange} 
            className="w-full p-3 border rounded-lg mt-2"
            required 
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="price" className="block text-lg font-semibold">Price</label>
          <input 
            type="number" 
            id="price" 
            name="price" 
            value={product.price} 
            onChange={handleChange} 
            className="w-full p-3 border rounded-lg mt-2"
            required 
          />
        </div>

        <button type="submit" className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;
