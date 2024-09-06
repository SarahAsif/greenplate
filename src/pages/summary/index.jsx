import React, { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { useRouter } from "next/router";
import { supabase } from "../../utils/supabaseClient";

const Summary = () => {
  const {
    formData = {},
    Delivery,
    updateCartQuantity,
    cart = [],
    removeFromCart,
    clearCart,
  } = useContext(AppContext);
  const router = useRouter();
  if (!cart) {
    router.push("/login");
    return null;
  }

  const isCartEmpty = cart.length === 0;
  const handleCheckout = async () => {
    try {
      // Validate form data
      if (
        !formData.name ||
        !formData.email ||
        !formData.phone ||
        !formData.address
      ) {
        throw new Error("All form fields are required.");
      }

      const order = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        total_amount: Delivery(),
      };

      console.log("Order Data to be inserted:", order);

      const { data: orderData, error: orderError } = await supabase
        .from("orders")
        .insert(order)
        .select()
        .single();

      if (orderError) {
        throw new Error(orderError.message);
      }

      if (!orderData || !orderData.id) {
        console.error("Order data is null or does not have an id");
        return;
      }

      console.log("Order Data:", orderData);

      const { data: itemsData, error: itemsError } = await supabase
        .from("order_items")
        .insert(
          cart.map((item) => ({
            order_id: orderData.id,
            name: item.name,
            quantity: item.quantity,
            price: item.price,
          }))
        );

      if (itemsError) {
        throw new Error(itemsError.message);
      }

      clearCart();

      router.push("/thankyou");
    } catch (err) {
      console.error("Error during checkout:", err.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-100 to-gray-300 p-8">
      <div className="bg-white p-10 rounded-lg shadow-xl w-full max-w-lg">
        <h1 className="text-3xl font-bold text-gray-700 mb-6 text-center">
          Order Summary
        </h1>
        <div className="space-y-4">
          <p>
            <strong>Name:</strong> {formData.name || "N/A"}
          </p>
          <p>
            <strong>Email:</strong> {formData.email || "N/A"}
          </p>
          <p>
            <strong>Phone:</strong> {formData.phone || "N/A"}
          </p>
          <p>
            <strong>Gender:</strong> {formData.gender || "N/A"}
          </p>
          <p>
            <strong>Address:</strong> {formData.address || "N/A"}
          </p>
          {cart.map((item) => (
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
          ))}
          <p>
            <strong>Delivery Charges:</strong> 20$
          </p>
          <p>
            <strong>Total Amount:</strong> ${Delivery()}
          </p>
        </div>
        <div className="text-center mt-8">
          <button
            className={`bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 ${
              isCartEmpty ? "cursor-not-allowed opacity-50" : ""
            }`}
            onClick={handleCheckout}
            type="submit"
            disabled={isCartEmpty}
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Summary;
