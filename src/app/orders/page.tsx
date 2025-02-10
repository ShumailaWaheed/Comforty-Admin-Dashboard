"use client";
import { useState } from "react";
import Sidebar from "@/components/sidebar";
import { Eye, CheckCircle, Trash2, XCircle } from "lucide-react";

type Order = {
  id: string;
  customerName: string;
  email: string;
  totalAmount: number;
  paymentStatus: string;
  deliveryStatus: string;
  items: string[];
  messages: string[];
};

const OrdersPage = () => { 
  const [orders, setOrders] = useState<Order[]>([
    {
      id: "ORD1234",
      customerName: "John Doe",
      email: "john@example.com",
      totalAmount: 250,
      paymentStatus: "Paid",
      deliveryStatus: "Delivered",
      items: ["Chair A", "Table B"],
      messages: [],
    },
    {
      id: "ORD5678",
      customerName: "Jane Smith",
      email: "jane@example.com",
      totalAmount: 180,
      paymentStatus: "Pending",
      deliveryStatus: "Processing",
      items: ["Sofa X", "Lamp Y"],
      messages: [],
    },
  ]);

  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [message, setMessage] = useState("");

  const handleDelete = (id: string) => {
    setOrders(orders.filter((order) => order.id !== id));
  };

  const handleView = (order: Order) => {
    setSelectedOrder(order);
  };

  const closeModal = () => {
    setSelectedOrder(null);
    setMessage("");
  };

  const handleSendMessage = () => {
    if (!selectedOrder || message.trim() === "") return;

    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === selectedOrder.id
          ? { ...order, messages: [...order.messages, message] }
          : order
      )
    );
    setMessage("");
  };

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      <Sidebar />
      <main className="flex-1 p-6 overflow-auto">
        <h1 className="text-3xl font-bold mb-4">Orders</h1>
        <div className="bg-white shadow-md rounded-lg p-4 overflow-x-auto">
          <table className="w-full border-collapse min-w-[600px]">
            <thead>
              <tr className="bg-[#272343] text-white">
                <th className="p-3 text-left">Order ID</th>
                <th className="p-3 text-left">Customer</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Total</th>
                <th className="p-3 text-left">Payment</th>
                <th className="p-3 text-left">Delivery</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.length > 0 ? (
                orders.map((order) => (
                  <tr key={order.id} className="border-b hover:bg-gray-100">
                    <td className="p-3">{order.id}</td>
                    <td className="p-3">{order.customerName}</td>
                    <td className="p-3">{order.email}</td>
                    <td className="p-3 font-bold">${order.totalAmount}</td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-1 rounded text-white ${
                          order.paymentStatus === "Paid" ? "bg-green-500" : "bg-yellow-500"
                        }`}
                      >
                        {order.paymentStatus}
                      </span>
                    </td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-1 rounded text-white ${
                          order.deliveryStatus === "Delivered" ? "bg-green-500" : "bg-blue-500"
                        }`}
                      >
                        {order.deliveryStatus}
                      </span>
                    </td>
                    <td className="p-3 flex gap-3">
                      <button
                        onClick={() => handleView(order)}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        <Eye size={20} />
                      </button>
                      <button className="text-green-500 hover:text-green-700">
                        <CheckCircle size={20} />
                      </button>
                      <button
                        onClick={() => handleDelete(order.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 size={20} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="text-center py-4">
                    No orders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>

      {selectedOrder && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">Order Details</h2>
              <button onClick={closeModal} className="text-red-500 hover:text-red-700">
                <XCircle size={24} />
              </button>
            </div>
            <p className="mt-4"><strong>Order ID:</strong> {selectedOrder.id}</p>
            <p><strong>Customer:</strong> {selectedOrder.customerName}</p>
            <p><strong>Email:</strong> {selectedOrder.email}</p>
            <p><strong>Total:</strong> ${selectedOrder.totalAmount}</p>
            <p><strong>Payment Status:</strong> {selectedOrder.paymentStatus}</p>
            <p><strong>Delivery Status:</strong> {selectedOrder.deliveryStatus}</p>
            <div className="mt-4">
              <h3 className="font-bold">Messages</h3>
              <div className="border p-2 h-24 overflow-y-auto bg-gray-100 rounded-lg mb-2">
                {selectedOrder.messages.length > 0 ? selectedOrder.messages.map((msg, index) => (
                  <p key={index} className="bg-white p-2 my-1 rounded shadow-md">{msg}</p>
                )) : <p className="text-gray-500">No messages yet.</p>}
              </div>
              <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Type a message..." className="w-full p-2 border rounded-lg" />
              <button onClick={handleSendMessage} className="mt-2 px-4 py-2 bg-[#029FAE] text-white rounded-lg w-full">Send</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default OrdersPage;
