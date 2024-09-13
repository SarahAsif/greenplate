import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import { Button, useDisclosure } from "@chakra-ui/react";
import Popup from "./Popup";
import { FaPlus, FaMinus } from "react-icons/fa";

const Book = ({ data }) => {
  const { addToCart, cart, updateCartQuantity } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    const item = cart.find((item) => item.id === data.id);
    if (item) {
      setQuantity(item.quantity);
    } else {
      setQuantity(0);
    }
  }, [cart, data.id]);

  const handleConfirmAddToCart = async (variations) => {
    setLoading(true);
    setSuccess(false);
    onClose();

    const itemWithVariations = {
      ...data,
      variations: variations,
    };

    try {
      await addToCart(itemWithVariations);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 2000);
    } catch (error) {
      console.error("Error adding item to cart:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddOrUpdateCart = () => {
    if (quantity > 0) {
      updateCartQuantity(data.name, quantity + 1);
    } else {
      onOpen();
    }
  };

  const handleRemoveFromCart = () => {
    if (quantity > 0) {
      updateCartQuantity(data.name, quantity - 1);
    }
  };

  return (
    <div className="flex flex-col w-64 h-auto items-center justify-center bg-white border border-gray-200 rounded-lg shadow-lg p-4 m-3 transition-transform transform hover:scale-105">
      <img
        src={data?.image_url || ""}
        className="w-56 h-40 object-cover rounded-md mb-4"
        alt={data?.name || "Product Image"}
      />
      <h1 className="text-green-600 text-xl font-semibold mb-2">
        {data?.name || "Product Name"}
      </h1>
      <p className="text-gray-800 mb-2">
        {data?.description || "Product Description"}
      </p>
      <p className="text-lg text-gray-600 font-bold">
        Price: ${data?.price || "0.00"}
      </p>

      {quantity === 0 ? (
        <Button colorScheme="green" onClick={onOpen} mt={4}>
          Add to Cart
        </Button>
      ) : (
        <div className="flex items-center mt-4">
          <button
            onClick={handleRemoveFromCart}
            className="bg-gray-200 text-gray-600 hover:text-gray-800 p-2 rounded-md mr-2 text-xs"
          >
            <FaMinus />
          </button>
          <span className="text-gray-800">{quantity}</span>
          <button
            onClick={handleAddOrUpdateCart}
            className="bg-green-500 text-gray-600 hover:text-gray-800 p-2 rounded-md ml-2 text-xs"
          >
            <FaPlus />
          </button>
        </div>
      )}

      <Popup
        isOpen={isOpen}
        onClose={onClose}
        onConfirm={handleConfirmAddToCart}
        data={data}
      />

      {loading && <p className="text-blue-500">Adding to cart...</p>}
      {success && (
        <p className="text-green-500">Item added to cart successfully!</p>
      )}
    </div>
  );
};

export default Book;
