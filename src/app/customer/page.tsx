"use client";
import Sidebar from "@/components/sidebar";
import { useState } from "react";
import { Search, Edit, Trash2 } from "lucide-react";

export default function Customers() {
  const [searchTerm, setSearchTerm] = useState("");
  const [customers, setCustomers] = useState([
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
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 p-6">
        <h1 className="text-3xl font-bold text-[#029FAE] mb-6">Customer Management</h1>

        <div className="mb-6 flex items-center">
          <Search size={20} className="mr-2 text-gray-500" />
          <input
            type="text"
            className="w-1/3 p-2 border rounded-lg"
            placeholder="Search customers"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="overflow-x-auto bg-white shadow-lg rounded-lg p-4">
          <table className="min-w-full table-auto">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Customer Name</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Email</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.map((customer) => (
                <tr key={customer.id} className="border-b">
                  <td className="px-6 py-3 text-sm font-medium text-gray-800">{customer.name}</td>
                  <td className="px-6 py-3 text-sm text-gray-600">{customer.email}</td>
                  <td className="px-6 py-3 text-sm">
                    <span
                      className={`inline-block px-2 py-1 rounded-full text-white ${
                        customer.status === "Active" ? "bg-green-500" : "bg-red-500"
                      }`}
                    >
                      {customer.status}
                    </span>
                  </td>
                  <td className="px-6 py-3 text-sm">
                    <button
                      className="text-[#029FAE] hover:text-[#027e85]"
                      onClick={() => handleStatusChange(customer.id)}
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      className="ml-3 text-red-500 hover:text-red-700"
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

