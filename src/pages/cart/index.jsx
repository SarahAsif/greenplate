// pages/cart.js

import React, { useContext } from "react";
import { useRouter } from "next/router";
import { AppContext } from "../../context/AppContext";

const Cart = () => {
  const { cart, removeFromCart, updateCartQuantity } = useContext(AppContext);
  const router = useRouter(); // Initialize useRouter

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handlePlaceOrder = () => {
    router.push("/contact");
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <header className="text-center py-4 bg-green-600 text-white">
        <h1 className="text-3xl font-bold">Your Cart</h1>
      </header>
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col">
          {cart.length > 0 ? (
            cart.map((item) => (
              <div
                key={item.name}
                className="flex justify-between items-center bg-white p-4 mb-4 rounded-lg shadow-md"
              >
                <div>
                  <h2 className="text-xl font-bold">{item.name}</h2>
                  <p className="text-gray-600">Quantity: {item.quantity}</p>
                  <p className="text-gray-600">Price: ${item.price}</p>
                </div>
                <div>
                  <button
                    onClick={() =>
                      updateCartQuantity(
                        item.name,
                        Math.max(item.quantity - 1, 1)
                      )
                    }
                    className="bg-yellow-500 text-white px-2 py-1 rounded-md hover:bg-yellow-600"
                  >
                    -
                  </button>
                  <button
                    onClick={() =>
                      updateCartQuantity(item.name, item.quantity + 1)
                    }
                    className="bg-blue-500 text-white px-2 py-1 rounded-md hover:bg-blue-600 mx-2"
                  >
                    +
                  </button>
                  <button
                    onClick={() => removeFromCart(item.name)}
                    className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center">
              <p className="text-gray-600 font-bold text-xl">
                Your cart is empty.
              </p>
            </div>
          )}
        </div>
        {cart.length > 0 && (
          <div className="text-center mt-6">
            <h2 className="text-2xl font-bold">Total: ${calculateTotal()}</h2>
            <button
              onClick={handlePlaceOrder}
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 mt-4"
            >
              Place Order
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default Cart;
