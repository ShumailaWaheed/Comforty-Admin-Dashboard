export interface Product {
    _id: string;
    title: string;
    price: number;
    description: string;
    originalPrice: number;
    products: number;
    imageUrl: string;
    priceWithoutDiscount?: number; 
    badge?: string;
    image: {
      asset: {
        _id: string;
        url: string;
      };
    };
    category?: {
      title: string;
    };
    inventory?: number;
    tags?: string[];
  }
  