// src/pages/ThankYou.js
import React from "react";

const ThankYou = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-8 text-center">
      <div className="bg-white p-6 rounded-lg shadow-md text-center">
        <h1 className="text-3xl font-bold ">Thank You!</h1>
        <div className="flex justify-center">
          <img
            src="./assets/order.jpg"
            alt="Thank You"
            className="h-auto w-1/4 m-0"
          />
        </div>
        <p className="text-xl font-bold mb-4 text-red-700">
          Your order has been placed successfully.
        </p>
        <p className="text-gray-600">
          You will receive an email confirmation shortly.
        </p>
      </div>
    </div>
  );
};

export default ThankYou;
