"use client";
import Sidebar from "@/components/sidebar";
import { useState } from "react";
import {  Edit, Trash2 } from "lucide-react";

function Customers() {
  const [searchTerm] = useState<string>("");
  const [customers, setCustomers] = useState<{ id: string; name: string; email: string; status: string }[]>([
    { id: "CUS1234", name: "John Doe", email: "john@example.com", status: "Active" },
    { id: "CUS5678", name: "Jane Smith", email: "jane@example.com", status: "Inactive" },
    { id: "CUS9101", name: "Alice Brown", email: "alice@example.com", status: "Active" },
    { id: "CUS1121", name: "Bob Johnson", email: "bob@example.com", status: "Active" },
  ]);

  const filteredCustomers = customers.filter((customer) =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleStatusChange = (id: string) => {
    setCustomers((prev) =>
      prev.map((customer) =>
        customer.id === id
          ? {
              ...customer,
              status: customer.status === "Active" ? "Inactive" : "Active",
            }
          : customer
      )
    );
  };

  const handleDelete = (id: string) => {
    setCustomers((prev) => prev.filter((customer) => customer.id !== id));
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 p-4 md:p-6 w-full">
        <h1 className="text-2xl md:text-3xl font-bold text-black mb-4 md:mb-6">Customer Management</h1>
        <div className="overflow-x-auto bg-white shadow-lg rounded-lg p-4">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-[#272343] text-white">
                <th className="px-4 py-2 text-left text-sm font-semibold">Customer Name</th>
                <th className="px-4 py-2 text-left text-sm font-semibold">Email</th>
                <th className="px-4 py-2 text-left text-sm font-semibold">Status</th>
                <th className="px-4 py-2 text-left text-sm font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.map((customer) => (
                <tr key={customer.id} className="border-b hover:bg-gray-100">
                  <td className="px-4 py-2 text-sm font-medium text-gray-800">{customer.name}</td>
                  <td className="px-4 py-2 text-sm text-gray-600">{customer.email}</td>
                  <td className="px-4 py-2 text-sm">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-white text-xs md:text-sm ${
                        customer.status === "Active" ? "bg-green-500" : "bg-red-500"
                      }`}
                    >
                      {customer.status}
                    </span>
                  </td>
                  <td className="px-4 py-2 text-sm flex gap-2">
                    <button
                      className="text-[#029FAE] hover:text-[#027e85]"
                      onClick={() => handleStatusChange(customer.id)}
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      className="text-red-500 hover:text-red-700"
                      onClick={() => handleDelete(customer.id)}
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

export default Customers;
