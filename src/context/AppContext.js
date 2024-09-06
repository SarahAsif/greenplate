import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../utils/supabaseClient";
import { AuthContext } from "./AuthContext";
import { useRouter } from "next/router";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [price, setPrice] = useState("");
  const [searchText, setSearchText] = useState("");
  const [dishes, setDishes] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [cart, setCart] = useState([]);
  const [formData, setFormData] = useState({});
  const [submittedData, setSubmittedData] = useState(null);
  const { user, logout } = useContext(AuthContext);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [popupVisible, setPopupVisible] = useState(true);
  const [location, setLocation] = useState("");
  const [area, setArea] = useState("");
  const [locations, setLocations] = useState([]);
  const [areas, setAreas] = useState([]);
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();

  const fetchDishes = async () => {
    setIsLoading(true);
    const { data, error } = await supabase.from("recipes").select("*");
    if (error) {
      console.error("Error fetching dishes:", error.message);
    } else {
      console.log("Fetched Dishes:", data); // Check fetched data
      setDishes(data);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchDishes();
  }, []);

  useEffect(() => {
    console.log("Dishes:", dishes);
    console.log("Search Text:", searchText);
    console.log("Filtered Data:", filteredData);
    setFilteredData(
      dishes.filter((d) =>
        d.name.toLowerCase().includes(searchText.toLowerCase())
      )
    );
  }, [dishes, searchText]);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  const onSearch = (text) => {
    setSearchText(text);
  };
  const addToCart = (item) => {
    setCart((prevCart) => {
      const itemIndex = prevCart.findIndex(
        (cartItem) => cartItem.name === item.name
      );

      let updatedCart;
      if (itemIndex >= 0) {
        updatedCart = [...prevCart];
        updatedCart[itemIndex].quantity += 1;
      } else {
        updatedCart = [...prevCart, { ...item, quantity: 1 }];
      }

      // Save updated cart to localStorage
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
    });
  };
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);
  const clearCart = () => {
    setCart([]); // Clear the cart state
    localStorage.removeItem("cart"); // Remove cart from localStorage
  };
  const removeFromCart = (items) => {
    setCart((prev) => prev.filter((i) => i.name !== items));
  };

  const updateCartQuantity = (itemName, quantity) => {
    setCart((prev) =>
      prev.map((i) => (i.name === itemName ? { ...i, quantity } : i))
    );
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const Delivery = () => {
    return calculateTotal() + 20;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPrice(formData.price);
    setSubmittedData(formData);
  };
  //header things:
  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await fetch("/db.json");
        const data = await response.json();
        setLocations(data.cities || []);
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    };

    fetchCities();
  }, []);

  useEffect(() => {
    const storedLocation = localStorage.getItem("userLocation");
    const storedArea = localStorage.getItem("userArea");

    if (storedLocation && storedArea) {
      setLocation(storedLocation);
      setArea(storedArea);
      setPopupVisible(false);
    }
  }, []);

  useEffect(() => {
    if (location) {
      const city = locations.find((city) => city.name === location);
      setAreas(city ? city.areas : []);
    }
  }, [location, locations]);

  const handleLocationSubmit = () => {
    if (location && area) {
      localStorage.setItem("userLocation", location);
      localStorage.setItem("userArea", area);
      setPopupVisible(false);
    } else {
      alert("Please select both location and area.");
    }
  };

  const handleSearchClick = () => {
    setSearchOpen(!searchOpen);
  };

  const handleProfileMenuOpen = (event) => {
    setDropdownOpen(event.currentTarget);
  };

  const handleMenuClose = () => {
    setDropdownOpen(null);
  };

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  const handleCartOpen = () => {
    setCartOpen(true);
  };

  const handleCartClose = () => {
    setCartOpen(false);
  };

  const handleCheckout = () => {
    router.push("/contact");
    setCartOpen(false);
  };

  const handleAddToCart = (itemId, quantity) => {
    if (user) {
      const item = cart.find((item) => item.id === itemId);
      if (item) {
        updateCartQuantity(item.name, quantity);
      }
    } else {
      alert("You must log in first to add items to the cart.");
    }
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <AppContext.Provider
      value={{
        price,
        setPrice,
        searchText,
        setSearchText,
        dishes,
        setDishes,
        filteredData,
        setFilteredData,
        isLoading,
        setIsLoading,
        onSearch,
        addToCart,
        cart,
        removeFromCart,
        updateCartQuantity,
        calculateTotal,
        Delivery,
        setFormData,
        formData,
        submittedData,
        setSubmittedData,
        handleSubmit,
        popupVisible,
        setPopupVisible,
        locations,
        setLocations,
        location,
        setLocation,
        areas,
        setAreas,
        area,
        setArea,
        cartOpen,
        setCartOpen,
        cartItemCount,
        searchOpen,
        setSearchOpen,
        handleSearchClick,
        handleProfileMenuOpen,
        dropdownOpen,
        handleMenuClose,
        handleLogout,
        handleCartOpen,
        handleCartClose,
        handleCheckout,
        handleLocationSubmit,
        handleAddToCart,
        toggleMobileMenu,
        mobileMenuOpen,
        clearCart,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
