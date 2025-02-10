"use client";
import Image from "next/image";
import { ShoppingCart, Bell, User, Menu, X, LayoutDashboard, Package, Users, BarChart3, PieChart, LogOut } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <header className="bg-white text-black p-2 flex items-center justify-between shadow-md">
      <div className="flex items-center gap-4">
        <button onClick={toggleSidebar} className="lg:hidden md:hidden p-2 focus:outline-none">
          {isSidebarOpen ? <X size={24} className="text-[#029FAE]" /> : <Menu size={24} className="text-[#029FAE]" />}
        </button>
        <Image src="/images/logo.png" alt="Comforty Logo" width={32} height={32} className="object-contain" />
        <span className="text-xl font-semibold">Comforty</span>
      </div>

      <div className="flex items-center gap-6 ml-auto">
        <Bell size={24} className="text-[#029FAE] hover:text-[#017c86] transition" />
        <div className="flex items-center bg-[#f2f2f2] rounded-full p-1">
          <User size={24} className="text-[#029FAE]" />
        </div>
        <ShoppingCart size={24} className="text-[#029FAE]" />
      </div>

      <div
        className={`lg:hidden fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity ${
          isSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={toggleSidebar}
      >
        <div
          className={`absolute top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <button className="absolute top-4 right-4 text-gray-700" onClick={toggleSidebar}>
            ✕
          </button>
          <nav className="p-6 flex flex-col h-full justify-between">
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
                    className="flex items-center gap-3 p-3 rounded-lg text-gray-700 hover:bg-gray-200 transition-all"
                    onClick={toggleSidebar}
                  >
                    {item.icon}
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>

            <Link
              href="/auth/login"
              className="flex items-center gap-3 p-3 rounded-lg text-gray-700 hover:bg-gray-200 transition-all"
              onClick={toggleSidebar}
            >
              <LogOut size={20} />
              Logout
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
