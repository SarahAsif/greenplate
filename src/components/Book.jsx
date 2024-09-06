import React, { useContext, useState } from "react";
import Link from "next/link";
import { AppContext } from "../context/AppContext";
import { FaCheckCircle } from "react-icons/fa";

const Book = ({ data }) => {
  const { addToCart } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const handleAddtoCart = async () => {
    setLoading(true);
    setSuccess(false);
    await addToCart(data);
    setLoading(false);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 2000);
  };
  return (
    <div className="flex flex-col w-64 h-auto items-center justify-center bg-white border border-gray-200 rounded-lg shadow-lg p-4 m-3 transition-transform transform hover:scale-105">
      <img
        src={data.image_url}
        className="w-56 h-40 object-cover rounded-md mb-4"
        alt={data.name}
      />
      <h1 className="text-green-600 text-xl font-semibold mb-2">{data.name}</h1>
      <p className="text-gray-800 mb-2">{data.description}</p>
      <p className="text-sm text-gray-600">Author: {data.author}</p>
      <p className="text-lg text-gray-600 font-bold">Price: {data.price}$</p>
      {/* Uncomment and use the Link component if you need a details page */}
      {/* <Link href={`/menu/${data.name}`}>
        <a className="mt-4">
          <button className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition">
            View Details
          </button>
        </a>
      </Link> */}
      <button
        onClick={handleAddtoCart}
        className="mt-4 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 flex items-center justify-center"
        disabled={loading || success} // Disable the button during loading or success state
      >
        {loading ? (
          <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-5 w-5 mr-2"></div>
        ) : success ? (
          <FaCheckCircle className="text-white text-lg" /> // Show tick after success
        ) : (
          "Add to Cart" // Default button text
        )}
      </button>
    </div>
  );
};

export default Book;
