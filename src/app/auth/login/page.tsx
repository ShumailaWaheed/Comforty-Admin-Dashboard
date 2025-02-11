"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const ADMIN_EMAIL = "shumailawaheed253@gmail.com";
  const ADMIN_PASSWORD = "Comforty1234$";

  const handleLogin = () => {
    if (!email || !password) {
      setError("⚠️ Please fill in all fields.");
      return;
    }

    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      localStorage.setItem("isAdmin", "true");  
      router.push("/dashboard");  
    } else {
      setError("🚫 Wrong credentials! Please try again.");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-[#029FAE] to-[#033649]">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-black mb-6 text-center">Admin Login</h2>

        {error && <p className="text-red-500 text-sm mb-4 text-center font-semibold">{error}</p>}

        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#029FAE] outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#029FAE] outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            onClick={handleLogin}
            className={`w-full p-3 rounded-lg transition duration-300 text-white font-semibold shadow-md ${
              email && password
                ? "bg-[#272343] hover:bg-[#2f2752]"
                : "bg-gray-400 cursor-not-allowed"
            }`}
            disabled={!email || !password}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
