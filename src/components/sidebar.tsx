"use client";
import Link from "next/link";
import { useState } from "react";
import { 
  LayoutDashboard, 
  Package, 
  Users, 
  BarChart3, 
  PieChart, 
  LogOut, 
  Menu 
} from "lucide-react";

export default function Sidebar() {
  const [active, setActive] = useState("Dashboard");
  const [isOpen, setIsOpen] = useState(false); 

  return (
    <>
    
      <div className="fixed top-16 left-4 z-50 md:hidden">
        <button 
          className="p-2 border-2 border-gray-500 rounded-md"
          onClick={() => setIsOpen(true)}
        >
          <Menu size={28} className="text-gray-700" />
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg p-6 flex flex-col justify-between transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-64"
        } md:translate-x-0 md:relative z-50`}
      >

        <button 
          className="absolute top-4 right-4 text-gray-700 md:hidden"
          onClick={() => setIsOpen(false)}
        >
          ✕
        </button>

        <nav>
          <ul>
            {[
              { name: "Dashboard", href: "/Dashboard", icon: <LayoutDashboard size={20} /> },
              { name: "Products", href: "/products", icon: <Package size={20} /> },
              { name: "Categories", href: "/categories", icon: <Package size={20} /> },
              { name: "Orders", href: "/orders", icon: <BarChart3 size={20} /> },
              { name: "Customers", href: "/customer", icon: <Users size={20} /> },
              { name: "Analytics", href: "/analytics", icon: <PieChart size={20} /> },
            ].map((item) => (
              <li key={item.name} className="mb-4">
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
                    active === item.name ? "bg-[#029FAE] text-white" : "text-gray-700 hover:bg-gray-200"
                  }`}
                  onClick={() => {
                    setActive(item.name);
                    setIsOpen(false); 
                  }}
                >
                  {item.icon}
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <button
          className="w-full flex items-center gap-3 p-3 rounded-lg text-gray-700 hover:bg-gray-200 transition-all"
          onClick={() => alert("Logging out...")}
        >
          <LogOut size={20} />
          Logout
        </button>
      </aside>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
}
