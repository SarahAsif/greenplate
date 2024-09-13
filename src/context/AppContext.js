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
  const [cartOpen, setCartOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedVariations, setSelectedVariations] = useState({
    size: "",
    extras: [],
  });
  const router = useRouter();

  const fetchDishes = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.from("products").select("*");
      if (error) {
        throw error;
      }
      setDishes(data);
    } catch (error) {
      console.error("Error fetching dishes:", error.message);
    }
    setIsLoading(false);
  };

  const fetchCities = async () => {
    try {
      const response = await fetch("/db.json");
      const data = await response.json();
      setLocations(data.cities || []);
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
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

  useEffect(() => {
    fetchDishes();
  }, []);

  useEffect(() => {
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

  const onSearch = (text) => setSearchText(text);

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
        updatedCart = [
          ...prevCart,
          {
            ...item,
            quantity: 1,
            selectedVariations: { ...selectedVariations },
          },
        ];
      }
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };
  const removeFromCart = (itemName) => {
    setCart((prev) => prev.filter((item) => item.name !== itemName));
  };

  const updateCartQuantity = (itemName, quantity) => {
    setCart((prev) =>
      prev.reduce((updatedCart, item) => {
        if (item.name === itemName) {
          if (quantity > 0) {
            return [...updatedCart, { ...item, quantity }];
          } else {
            return updatedCart;
          }
        } else {
          return [...updatedCart, item];
        }
      }, [])
    );
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const Delivery = () => calculateTotal() + 20;

  const handleSubmit = (e) => {
    e.preventDefault();
    setPrice(formData.price);
    setSubmittedData(formData);
  };

  const handleLocationSubmit = () => {
    if (location && area) {
      localStorage.setItem("userLocation", location);
      localStorage.setItem("userArea", area);
      setPopupVisible(false);
    } else {
      alert("Please select both location and area.");
    }
  };

  const handleProfileMenuOpen = () => {
    setDropdownOpen((prev) => !prev); // Toggles the dropdownOpen state
  };

  const handleMenuClose = () => setDropdownOpen(null);

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  const handleCartOpen = () => setCartOpen(true);

  const handleCartClose = () => setCartOpen(false);

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

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

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
        onSearch,
        selectedVariations,
        setSelectedVariations,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
