"use client";

import { useState } from "react";
import { Product } from "@/types/products";
import AddProductModal from "./ProductModel";
import { PlusIcon, TrashIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface ProductManagementClientProps {
  initialProducts: Product[];
}

export default function ProductManagementClient({
  initialProducts,
}: ProductManagementClientProps) {
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
    setProducts(products.map((product) =>
      product._id === updatedProduct._id ? updatedProduct : product
    ));
    setOpenEditModal(false);
    setProductToEdit(null);
  };

  return (
    <main className="flex-1 p-6 overflow-y-auto">
      <h1 className="text-3xl font-bold mb-6 text-black">Product Management</h1>
      <button
        onClick={() => setOpenAddModal(true)}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg mb-6 flex items-center gap-2 hover:bg-blue-600 transition-colors"
      >
        <PlusIcon className="w-5 h-5" />
        Add New Product
      </button>
      <AddProductModal
        open={openAddModal}
        setOpen={setOpenAddModal}
        onSave={handleAddProduct}
        onCancel={() => setOpenAddModal(false)}
      />
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead>
            <tr className="border-b">
              <th className="text-left p-4 text-black">Product</th>
              <th className="text-left p-4 text-black">Category</th>
              <th className="text-left p-4 text-black">Price</th>
              <th className="text-left p-4 text-black">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id} className="border-b">
                <td className="p-4 flex items-center text-black">
                  <img
                    src={product.image?.asset?.url}
                    alt={product.title}
                    className="w-12 h-12 object-cover rounded-md mr-4"
                  />
                  {product.title}
                </td>
                <td className="p-4 text-black">{product.category?.title}</td>
                <td className="p-4 text-black">${product.price}</td>
                <td className="p-4 flex gap-2">
                  <button
                    onClick={() => handleEditProduct(product)}
                    className="text-blue-500 hover:text-blue-600 transition-colors"
                    title="Edit Product"
                  >
                    <PencilSquareIcon className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDeleteProduct(product._id)}
                    className="text-red-500 hover:text-red-600 transition-colors"
                    title="Delete Product"
                  >
                    <TrashIcon className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Dialog open={openEditModal} onOpenChange={setOpenEditModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
            <DialogDescription>
              Modify the details below to update the product.
            </DialogDescription>
          </DialogHeader>
          {productToEdit && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="product-title">Product Title</Label>
                <Input
                  id="product-title"
                  value={productToEdit.title}
                  onChange={(e) =>
                    setProductToEdit({ ...productToEdit, title: e.target.value })
                  }
                  placeholder="Enter product title"
                />
              </div>
              {/* Price */}
              <div>
                <Label htmlFor="product-price">Price</Label>
                <Input
                  id="product-price"
                  type="number"
                  value={productToEdit.price}
                  onChange={(e) =>
                    setProductToEdit({ ...productToEdit, price: parseFloat(e.target.value) })
                  }
                  placeholder="Enter product price"
                />
              </div>
              {/* Category */}
              <div>
                <Label htmlFor="product-category">Category</Label>
                <Input
                  id="product-category"
                  value={productToEdit.category.title}
                  onChange={(e) =>
                    setProductToEdit({
                      ...productToEdit,
                      category: { ...productToEdit.category, title: e.target.value },
                    })
                  }
                  placeholder="Enter product category"
                />
              </div>
              <div>
                <Label htmlFor="product-description">Description</Label>
                <Textarea
                  id="product-description"
                  value={productToEdit.description}
                  onChange={(e) =>
                    setProductToEdit({ ...productToEdit, description: e.target.value })
                  }
                  placeholder="Enter product description"
                />
              </div>
          
              <div>
                <Label htmlFor="product-image-url">Product Image URL</Label>
                <Input
                  id="product-image-url"
                  value={productToEdit.image?.asset?.url}
                  onChange={(e) =>
                    setProductToEdit({
                      ...productToEdit,
                      image: { ...productToEdit.image, asset: { ...productToEdit.image.asset, url: e.target.value } },
                    })
                  }
                  placeholder="Enter product image URL"
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

