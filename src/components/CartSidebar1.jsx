import React, { useContext } from "react";
import { FaTrash, FaTimes, FaPlus, FaMinus } from "react-icons/fa";
import { AppContext } from "../context/AppContext";

const CartSidebar1 = ({ cartItems, onClose, onCheckout, updateCartItem }) => {
  const { removeFromCart } = useContext(AppContext);

  return (
    <div className="h-full flex flex-col bg-white p-4 relative">
      <button
        onClick={onClose}
        className="text-gray-600 hover:text-gray-800 absolute top-2 right-2"
      >
        <FaTimes />
      </button>
      <h2 className="text-xl font-semibold mb-4">Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <div className="flex-1 overflow-y-auto">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between mb-4"
            >
              <div className="flex items-center space-x-3">
                <img
                  src={item?.image_url || ""}
                  className="w-16 h-16 object-cover rounded"
                  alt={item?.name || "Product Image"}
                />
                <div className="w-28">
                  <h3 className="text-lg font-semibold">{item.name}</h3>
                  <p className="text-xs text-gray-500">
                    Quantity: {item.quantity}
                  </p>
                  {item.selectedVariations?.extras?.length > 0 && (
                    <p className="text-xs">
                      Extras: {item.selectedVariations.extras.join(", ")}
                    </p>
                  )}
                  {item.selectedVariations?.size && (
                    <p className="text-xs">
                      Size: {item.selectedVariations.size}
                    </p>
                  )}
                  <p className="text-lg font-semibold text-gray-900">
                    ${item.price.toFixed(2)}
                  </p>
                </div>
              </div>
              <div>
                <button
                  onClick={() => updateCartItem(item.id, item.quantity - 1)}
                  className="bg-gray-200 text-gray-600 hover:text-gray-800 p-2 rounded-md mr-2 text-xs"
                >
                  <FaMinus />
                </button>
                <button
                  onClick={() => updateCartItem(item.id, item.quantity + 1)}
                  className="bg-green-500 text-gray-600 hover:text-gray-800 p-2 rounded-md mr-2 text-xs"
                >
                  <FaPlus />
                </button>
                <button
                  onClick={() => removeFromCart(item.name)}
                  className="text-gray-600 hover:text-gray-800"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="mt-auto">
        <p className="text-xl font-semibold text-gray-500 mb-4">
          Subtotal: $
          {cartItems
            .reduce((total, item) => total + item.price * item.quantity, 0)
            .toFixed(2)}
        </p>

        <button
          onClick={onCheckout}
          className="w-full bg-green-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CartSidebar1;
