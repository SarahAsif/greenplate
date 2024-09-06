import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";

const OrderHistory = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) return;
      try {
        setLoading(true);
        const { data: ordersData, error: ordersError } = await supabase
          .from("orders")
          .select("id", total_amount, created_at)
          .eq("email", user.email);
        if (ordersError) throw ordersError;
        for (let order of ordersData) {
          const { data: itemsData, error: itemsError } = await supabase
            .from("order_items")
            .select("*")
            .eq("order_id", order.id);
          if (itemsError) throw itemsError;
          order.itemsData = itemsData;
        }
        setOrders(ordersData);
      } catch (error) {
        console.error("Error fetching order history:", error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [user]);
  if (loading) {
    return <p>Loading order history...</p>;
  }
  if (!orders.length) {
    return <p>No order history found.</p>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Order History</h1>
      {orders.map((order) => (
        <div key={order.id} className="border p-4 mb-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold">Order ID: {order.id}</h2>
          <p>
            <strong>Total Amount:</strong> ${order.total_amount}
          </p>
          <p>
            <strong>Order Date:</strong>{" "}
            {new Date(order.created_at).toLocaleDateString()}
          </p>

          <h3 className="text-md font-semibold mt-4">Items:</h3>
          <ul className="list-disc pl-6">
            {order.items.map((item, index) => (
              <li key={index}>
                {item.name} - {item.quantity} pcs - ${item.price}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default OrderHistory;
