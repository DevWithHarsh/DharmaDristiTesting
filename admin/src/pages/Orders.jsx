import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    if (!token) return;

    try {
      const response = await axios.post(
        backendUrl + "/api/order/list",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.success) {
        setOrders(response.data.orders.reverse());
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/order/status",
        { orderId, status: event.target.value },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.data.success) {
        await fetchAllOrders();
      }
    } catch (error) {
      console.log(error);
      toast.error(response.data.message);
    }
  };

  const deleteOrder = async (id) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/order/remove",
        { id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        await fetchAllOrders();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };


  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  return (
    <div className="px-4 py-6 sm:px-8 lg:px-16 bg-gray-50 min-h-screen">
      <h3 className="text-3xl font-bold mb-6 text-gray-800">Order Page</h3>
      <div className="space-y-6">
        {orders.map((order, index) => (
          <div
            key={index}
            className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 items-start border border-gray-200 bg-white rounded-xl p-5 sm:p-6 shadow-sm hover:shadow-md transition duration-200"
          >
            <img
              className="w-12 h-12 object-contain"
              src={assets.parcel_icon}
              alt="parcel"
            />

            <div className="text-sm text-gray-700">
              <div className="space-y-1">
                {order.items.map((item, i) => (
                  <p key={i}>
                    {item.name} × {item.quantity}
                    {i !== order.items.length - 1 ? "," : ""}
                  </p>
                ))}
              </div>
              <p className="mt-4 font-medium text-gray-800">
                {order.address.firstName + " " + order.address.lastName}
              </p>
              <div className="text-xs mt-1 text-gray-600">
                <p>{order.address.street},</p>
                <p>
                  {order.address.city}, {order.address.state},{" "}
                  {order.address.country} - {order.address.zipcode}
                </p>
              </div>
              <p className="text-xs text-gray-600 mt-1">
                📞 {order.address.phone}
              </p>
            </div>

            <div className="text-sm text-gray-700 space-y-1">
              <p>🧾 Items: {order.items.length}</p>
              <p>💳 Method: {order.paymentMethod}</p>
              <p>
                💰 Payment:{" "}
                <span
                  className={
                    order.payment
                      ? "text-green-600 font-semibold"
                      : "text-red-600 font-semibold"
                  }
                >
                  {order.payment ? "Done" : "Pending"}
                </span>
              </p>
              <p>📅 Date: {new Date(order.date).toLocaleDateString()}</p>
            </div>

            <p className="text-xl font-bold text-gray-800 self-center">
              {currency}
              {order.amount}
            </p>

            <select
              onChange={(event) => statusHandler(event, order._id)}
              value={order.status}
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
            >  
              <option value="Order Confirmation Pending">Order Confirmation Pending</option>
              <option value="Packing">Packing</option>
              <option value="Shipped">Shipped</option>
              <option value="Out for Delivery">Out for Delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
            <p
              onClick={() => deleteOrder(order._id)}
              className="text-red-500 hover:text-red-600 font-bold text-xl cursor-pointer text-right md:text-center"
              title="Delete Order"
            >
              ×
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
