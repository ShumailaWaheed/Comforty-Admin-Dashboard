"use client";
import { ShoppingCart, Bell, User } from "lucide-react";

export default function Header() {
  return (
    <header className="bg-white text-black p-2 flex items-center justify-between shadow-md">
      <div className="flex items-center gap-4">
        <img
          src="/images/logo.png"  // Replace with your logo path
          alt="Comforty Logo"
          className="w-8 h-8 object-contain"
        />
        <span className="text-xl font-semibold">Comforty</span>
      </div>

      <div className="flex items-center gap-6 ml-auto">
        {/* Notification Icon - Simple & Professional */}
        <Bell size={24} className="text-[#029FAE] hover:text-[#017c86] transition" />

        {/* User Profile Icon */}
        <div className="flex items-center bg-[#f2f2f2] rounded-full p-1">
          <User size={24} className="text-[#029FAE]" />
        </div>

        {/* Shopping Cart Icon */}
        <ShoppingCart size={24} className="text-[#029FAE]" />
      </div>
    </header>
  );
}
