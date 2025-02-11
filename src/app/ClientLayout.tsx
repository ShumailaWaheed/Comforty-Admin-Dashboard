"use client";

"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/Header";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname(); // Get current route
  const isLoginPage = pathname.startsWith("/auth/login"); // Check if we are on the login page

  return (
    <>
      {!isLoginPage && <Header />} {/* Hide Header only on login page */}
      {children}
    </>
  );
}
