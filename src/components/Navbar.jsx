import React, { useState, useContext, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  FaSearch,
  FaUser,
  FaChevronDown,
  FaShoppingCart,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import CartSidebar1 from "./CartSidebar1";
import { AppContext } from "../context/AppContext";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user } = useContext(AuthContext);
  const {
    cart,
    popupVisible,
    locations,
    areas,
    location,
    setLocation,
    area,
    setArea,
    mobileMenuOpen,
    cartItemCount,
    handleProfileMenuOpen,
    dropdownOpen,
    handleMenuClose,
    toggleMobileMenu,
    handleLogout,
    cartOpen,
    handleCheckout,
    handleLocationSubmit,
    handleAddToCart,
  } = useContext(AppContext);
  const router = useRouter();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        handleMenuClose();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [handleMenuClose]);

  return (
    <>
      {popupVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg flex">
            <div className="flex-1 pr-4">
              <h6 className="text-lg font-semibold mb-4">
                Select Your Location
              </h6>
              <div className="mb-4">
                <label
                  htmlFor="location"
                  className="block text-sm font-medium text-gray-700"
                >
                  Location
                </label>
                <select
                  id="location"
                  value={location || ""}
                  onChange={(e) => setLocation(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-500"
                >
                  <option value="">Select a location</option>
                  {locations.map((city) => (
                    <option key={city.name} value={city.name}>
                      {city.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="area"
                  className="block text-sm font-medium text-gray-700"
                >
                  Area
                </label>
                <select
                  id="area"
                  value={area || ""}
                  onChange={(e) => setArea(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-500"
                >
                  <option value="">Select an area</option>
                  {areas.map((area) => (
                    <option key={area} value={area}>
                      {area}
                    </option>
                  ))}
                </select>
              </div>
              <button
                onClick={handleLocationSubmit}
                className="w-full bg-green-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}

      <header className="bg-white bg-opacity-80 backdrop-blur-lg border-b border-gray-200 px-2 md:px-4 fixed top-0 inset-x-0 z-10">
        <div className="flex justify-between items-center h-16">
          <div className="flex flex-col text-gray-600 text-sm md:text-base lg:text-lg">
            <span className="text-xs md:text-sm lg:text-base">Deliver to:</span>
            <span className="text-xs md:text-sm lg:text-base">
              {location || "Select your location"}
              {area && ` - ${area}`}
            </span>
          </div>

          <Link href="/" className="flex justify-center flex-grow">
            <img
              src="/assets/logo.png"
              alt="logo"
              className="h-20 object-contain"
            />
          </Link>

          <div className="hidden md:flex items-center space-x-4 relative">
            <button
              aria-label="Cart"
              onClick={() => setSidebarOpen(true)}
              className="relative text-gray-600 hover:text-gray-800"
            >
              <FaShoppingCart className="text-2xl" />
              {cartItemCount > 0 && (
                <span className="absolute bottom-2 left-3 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {cartItemCount}
                </span>
              )}
            </button>

            <button
              onClick={handleProfileMenuOpen}
              className=" text-gray-600 hover:text-gray-800"
              ref={dropdownRef}
            >
              <div className="flex justify-center items-center">
                <FaUser className="text-xl" />
                <FaChevronDown
                  className={` transform transition-transform ${
                    dropdownOpen ? "rotate-180" : "rotate-0"
                  }`}
                />
              </div>{" "}
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg">
                  <button
                    onClick={() => router.push("/profile")}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Profile
                  </button>
                  <button
                    onClick={() => router.push("/orderhistory")}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Order History
                  </button>
                  {user ? (
                    <button
                      onClick={handleLogout}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Sign Out
                    </button>
                  ) : (
                    <button
                      onClick={() => router.push("/login")}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Login
                    </button>
                  )}
                </div>
              )}
            </button>
          </div>

          <button
            onClick={toggleMobileMenu}
            className="md:hidden text-gray-600 hover:text-gray-800"
          >
            <FaBars />
          </button>
        </div>
      </header>

      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg z-40 transition-transform transform ${
          sidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ transition: "transform 0.3s ease" }}
      >
        <div className="relative h-full">
          <button
            onClick={() => setSidebarOpen(false)}
            className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
          >
            <FaTimes className="w-6 h-6" />
          </button>
          <CartSidebar1
            cartItems={cart}
            open={cartOpen}
            onClose={() => setSidebarOpen(false)}
            onCheckout={handleCheckout}
            updateCartItem={handleAddToCart}
          />
        </div>
      </div>

      <div
        className={`${
          mobileMenuOpen ? "block" : "hidden"
        } fixed inset-0 z-40 bg-gray-800 bg-opacity-75 md:hidden`}
      >
        <div className="relative bg-white w-64 h-full overflow-y-auto">
          <div className="p-4">
            <div className="mb-4 relative">
              <input
                type="text"
                placeholder="Search..."
                className="border border-gray-300 rounded-md px-3 py-2 pl-10 w-full"
              />
              <FaSearch className="absolute left-3 top-2 text-gray-500" />
            </div>
            <button
              onClick={() => setSidebarOpen(true)}
              className="block text-gray-600 hover:text-gray-800 mb-2"
            >
              Cart ({cartItemCount})
            </button>
            <button
              onClick={() => router.push("/profile")}
              className="block text-gray-600 hover:text-gray-800 mb-2"
            >
              Profile
            </button>
            <button
              onClick={() => router.push("/orderhistory")}
              className="block text-gray-600 hover:text-gray-800 mb-2"
            >
              Order History
            </button>
            {user ? (
              <button
                onClick={handleLogout}
                className="block text-gray-600 hover:text-gray-800"
              >
                Sign Out
              </button>
            ) : (
              <button
                onClick={() => router.push("/login")}
                className="block text-gray-600 hover:text-gray-800"
              >
                Login
              </button>
            )}
          </div>
          <button
            onClick={toggleMobileMenu}
            className="absolute top-2 left-2 text-gray-600 hover:text-gray-800"
          >
            <FaBars />
          </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
