import { NextResponse } from "next/server";

export async function GET() {
  const products = [
   
      { 
        id: "1", 
        label: "New", 
        name: "Library Stool Chair", 
        price: "$20", originalPrice: "", 
        image: "/images/product-01.png" 
      },
      { id: "2", 
        label: "Sale", 
        name: "Library Stool Chair", 
        price: "$20", 
        originalPrice: "$30", 
        image: "/images/product-02.png" 
      },
      { 
        id: "3", 
        label: "",
        name: "Library Stool Chair", 
        price: "$20", originalPrice: "", 
        image: "/images/product-03.png" 
      },
      { 
        id: "4", 
        label: "", 
        name: "Library Stool Chair", 
        price: "$20", originalPrice: "",
        image: "/images/product-04.png"
      },
      { 
        id: "5", 
        label: "New", 
        name: "Library Stool Chair", 
        price: "$20", originalPrice: "", 
        image: "/images/product-05.png" 
      },
      { id: "6", 
        label: "Sale", 
        name: "Library Stool Chair", 
        price: "$20", originalPrice: "$30", 
        image: "/images/product-08.png" 
      },
      },
    
  

  console.log("API Response:", products); // Debugging
  return NextResponse.json(products);
