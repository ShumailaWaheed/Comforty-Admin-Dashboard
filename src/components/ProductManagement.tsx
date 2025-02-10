"use client";

import { useState } from "react";
import { Product } from "@/types/products";
import AddProductModal from "./ProductModel";
import { PlusIcon, TrashIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";

interface ProductManagementClientProps {
  initialProducts: Product[];
}

function ProductManagementClient({ initialProducts }: ProductManagementClientProps) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [productToEdit, setProductToEdit] = useState<Product | null>(null);

  const handleAddProduct = (newProduct: Product) => {
    setProducts([...products, newProduct]);
  };

  const handleDeleteProduct = (id: string) => {
    setProducts(products.filter((product) => product._id !== id));
  };

  const handleEditProduct = (product: Product) => {
    setProductToEdit(product);
    setOpenEditModal(true);
  };

  const handleSaveEditedProduct = (updatedProduct: Product) => {
    setProducts(products.map((product) => (product._id === updatedProduct._id ? updatedProduct : product)));
    setOpenEditModal(false);
    setProductToEdit(null);
  };

  return (
    <main className="flex-1 p-4 sm:p-6 overflow-y-auto">
      <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-black">Product Management</h1>
      
      <Button 
        onClick={() => setOpenAddModal(true)} 
        className="mb-4 sm:mb-6 flex items-center gap-2"
      >
        <PlusIcon className="w-5 h-5" />
        Add New Product
      </Button>

      <AddProductModal open={openAddModal} setOpen={setOpenAddModal} onSave={handleAddProduct} onCancel={() => setOpenAddModal(false)} />

      <div className="overflow-x-auto w-full">
        <table className="min-w-full bg-white shadow-md rounded-lg text-sm sm:text-base">
          <thead className="bg-[#272343]">
            <tr className="border-b">
              <th className="text-left p-4 text-white">Product</th>
              <th className="text-left p-4 text-white">Category</th>
              <th className="text-left p-4 text-white">Price</th>
              <th className="text-left p-4 text-white">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id} className="border-b bg-gray-50 sm:bg-white">
                <td className="p-4 flex flex-col sm:flex-row items-start sm:items-center text-black">
                  <Image
                    src={product.image?.asset?.url || "/placeholder.png"}
                    alt={product.title}
                    width={48}
                    height={48}
                    className="w-12 h-12 object-cover rounded-md mb-2 sm:mr-4 sm:mb-0"
                  />
                  {product.title}
                </td>
                <td className="p-4 text-black">{product.category?.title || "Uncategorized"}</td>
                <td className="p-4 text-black">${product.price.toFixed(2)}</td>
                <td className="p-4 flex gap-2">
                  <button onClick={() => handleEditProduct(product)} className="text-blue-500 hover:text-blue-600 transition-colors" title="Edit Product">
                    <PencilSquareIcon className="w-5 h-5" />
                  </button>
                  <button onClick={() => handleDeleteProduct(product._id)} className="text-red-500 hover:text-red-600 transition-colors" title="Delete Product">
                    <TrashIcon className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Product Modal */}
      <Dialog open={openEditModal} onOpenChange={setOpenEditModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
            <DialogDescription>Modify the details below to update the product.</DialogDescription>
          </DialogHeader>
          {productToEdit && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="product-title">Product Title</Label>
                <Input
                  id="product-title"
                  value={productToEdit.title}
                  onChange={(e) => setProductToEdit({ ...productToEdit, title: e.target.value })}
                  placeholder="Enter product title"
                />
              </div>
              <div>
                <Label htmlFor="product-price">Price</Label>
                <Input
                  id="product-price"
                  type="number"
                  value={productToEdit.price}
                  onChange={(e) => setProductToEdit({ ...productToEdit, price: parseFloat(e.target.value) || 0 })}
                  placeholder="Enter product price"
                />
              </div>
              <div>
                <Label htmlFor="product-category">Category</Label>
                <Input
                  id="product-category"
                  value={productToEdit.category?.title || ""}
                  onChange={(e) =>
                    setProductToEdit({
                      ...productToEdit,
                      category: productToEdit.category
                        ? { ...productToEdit.category, title: e.target.value }
                        : { title: e.target.value },
                    })
                  }
                  placeholder="Enter product category"
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenEditModal(false)}>
              Cancel
            </Button>
            <Button onClick={() => handleSaveEditedProduct(productToEdit!)}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </main>
  );
}

export default ProductManagementClient;