"use client";

import { useState, ChangeEvent } from "react";
import Image from "next/image";
import { Product } from "@/types/products";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
  } from "@/components/ui/dialog";

interface AddProductModalProps {
  onSave: (newProduct: Product) => void;
  onCancel: () => void;
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function AddProductModal({
  onSave,
  onCancel,
  open,
  setOpen,
}: AddProductModalProps) {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [imagePreview, setImagePreview] = useState<string>("");

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setImagePreview(reader.result);
          setImageUrl(reader.result); 
        }
      };
      reader.readAsDataURL(file);
    }
  };


  const handleImageUrlChange = (e: ChangeEvent<HTMLInputElement>) => {
    setImageUrl(e.target.value);
    setImagePreview(e.target.value);
  };

  const handleSubmit = () => {
    const newProduct: Product = {
      _id: Date.now().toString(),
      title,
      price: parseFloat(price),
      originalPrice: parseFloat(price),
      priceWithoutDiscount: parseFloat(price),
      badge: "",
      image: {
        asset: {
          _id: "",
          url: imageUrl || "https://via.placeholder.com/150",
        },
      },
      imageUrl: imageUrl,
      category: { title: category || "Uncategorized" },
      description,
      inventory: 0,
      tags: [],
      products: [],
    };
    onSave(newProduct);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Product</DialogTitle>
          <DialogDescription>
            Fill in the details below to add a new product.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          {/* Product Title */}
          <div>
            <Label htmlFor="product-title">Product Title</Label>
            <Input
              id="product-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter product title"
            />
          </div>
          {/* Price */}
          <div>
            <Label htmlFor="product-price">Price</Label>
            <Input
              id="product-price"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Enter product price"
            />
          </div>
          {/* Category */}
          <div>
            <Label htmlFor="product-category">Category</Label>
            <Input
              id="product-category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Enter product category"
            />
          </div>
          {/* Description */}
          <div>
            <Label htmlFor="product-description">Description</Label>
            <Textarea
              id="product-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter product description"
            />
          </div>
          {/* Image Upload */}
          <div>
            <Label htmlFor="product-image-upload">Product Image</Label>
            <Input
              id="product-image-upload"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="border border-gray-300 p-2 rounded"
            />
          </div>
          {/* Or Manual Image URL */}
          <div>
            <Label htmlFor="product-image-url">Or Enter Image URL</Label>
            <Input
              id="product-image-url"
              value={imageUrl}
              onChange={handleImageUrlChange}
              placeholder="Enter image URL"
            />
          </div>
          {imagePreview && (
            <div className="mt-2">
              <Image
                src={imagePreview}
                alt="Preview"
                width={128}
                height={128}
                className="object-cover rounded border"
              />
            </div>
          )}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
