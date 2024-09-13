import React, { useState, useEffect, useContext } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
// import {
//   TextField,
//   Button,
//   AppBar,
//   Toolbar,
//   Typography,
//   Autocomplete,
//   FormControl,
//   IconButton,
//   InputAdornment,
//   Menu,
//   MenuItem,
//   Drawer,
//   List,
//   ListItem,
//   ListItemText,
//   ListItemIcon,
//   searchText,
// } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faUser,
  faChevronDown,
  faShoppingCart,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import CartSidebar from "./CartSidebar";
import { AppContext } from "../context/AppContext";
import { AuthContext } from "../context/AuthContext";

const Header = () => {
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
    handleCartOpen,
    cartItemCount,
    searchOpen,
    handleSearchClick,
    handleProfileMenuOpen,
    dropdownOpen,
    handleMenuClose,
    toggleMobileMenu,
    handleLogout,
    cartOpen,
    handleCartClose,
    handleCheckout,
    handleLocationSubmit,
    handleAddToCart,
    onSearch,
  } = useContext(AppContext);
  const router = useRouter();
  return (
    <>
      {popupVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg flex">
            <div className="flex-1 pr-4">
              <Typography variant="h6" gutterBottom>
                Select Your Location
              </Typography>

              <FormControl fullWidth margin="normal">
                <Autocomplete
                  value={location || ""}
                  onChange={(event, newValue) => setLocation(newValue || "")}
                  options={locations.map((city) => city.name)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Location"
                      variant="outlined"
                    />
                  )}
                />
              </FormControl>

              <FormControl fullWidth margin="normal">
                <Autocomplete
                  value={area || ""}
                  onChange={(event, newValue) => setArea(newValue || "")}
                  options={areas}
                  renderInput={(params) => (
                    <TextField {...params} label="Area" variant="outlined" />
                  )}
                />
              </FormControl>

              <Button
                onClick={handleLocationSubmit}
                variant="contained"
                color="success"
                fullWidth
                sx={{ marginTop: 2 }}
              >
                Submit
              </Button>
            </div>
          </div>
        </div>
      )}

      <AppBar
        position="fixed"
        className="bg-white bg-opacity-80 backdrop-blur-lg border-b border-gray-200 px-2 md:px-4"
      >
        <Toolbar className="flex justify-between items-center">
          <Typography
            variant="body2"
            color="textSecondary"
            className="text-gray-600 flex flex-col items-start text-sm md:text-base lg:text-lg "
          >
            <span className="text-xs md:text-sm lg:text-base">Deliver to:</span>
            <span className="text-xs md:text-sm lg:text-base">
              {location || "Select your location"}
              {area && ` - ${area}`}
            </span>
          </Typography>

          <Link href="/" className="flex justify-center flex-grow">
            <img
              src="/assets/logo.png"
              alt="logo"
              className="h-20 object-contain"
            />
          </Link>

          <div className="hidden md:flex items-center space-x-4">
            <IconButton onClick={handleCartOpen} className="relative">
              <FontAwesomeIcon icon={faShoppingCart} />
              {cartItemCount > 0 && (
                <span className="absolute top-0 right-0 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {cartItemCount}
                </span>
              )}
            </IconButton>
            {searchOpen && (
              <TextField
                variant="outlined"
                size="small"
                placeholder="Search.."
                value={searchText} // Ensure this value is bound to the state
                onChange={(e) => onSearch(e.target.value)} // Update state on input change
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <FontAwesomeIcon icon={faSearch} />
                    </InputAdornment>
                  ),
                }}
              />
            )}
            <IconButton onClick={handleSearchClick}>
              <FontAwesomeIcon icon={faSearch} />
            </IconButton>
            <IconButton onClick={handleProfileMenuOpen}>
              <FontAwesomeIcon icon={faUser} />
              <FontAwesomeIcon
                icon={faChevronDown}
                className={`ml-2 transform transition-transform ${
                  dropdownOpen ? "rotate-180" : "rotate-0"
                }`}
              />
            </IconButton>
            <Menu
              anchorEl={dropdownOpen}
              open={Boolean(dropdownOpen)}
              onClose={handleMenuClose}
              className="mt-2"
            >
              {user ? (
                <>
                  <MenuItem onClick={() => router.push("/profile")}>
                    Profile
                  </MenuItem>
                  <MenuItem onClick={() => router.push("/orderhistory")}>
                    Order History
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>Sign Out</MenuItem>
                </>
              ) : (
                <MenuItem onClick={() => router.push("/login")}>Login</MenuItem>
              )}
            </Menu>
          </div>

          <IconButton onClick={toggleMobileMenu} className="md:hidden">
            <FontAwesomeIcon icon={faBars} />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer anchor="right" open={mobileMenuOpen} onClose={toggleMobileMenu}>
        <List className="w-64">
          <ListItem button>
            <ListItemIcon>
              <FontAwesomeIcon icon={faSearch} />
            </ListItemIcon>
            <TextField
              variant="outlined"
              size="small"
              placeholder="Search..."
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FontAwesomeIcon icon={faSearch} />
                  </InputAdornment>
                ),
              }}
            />
          </ListItem>
          <ListItem button onClick={handleCartOpen}>
            <ListItemText primary={`Cart (${cartItemCount})`} />
          </ListItem>
          <ListItem button onClick={handleProfileMenuOpen}>
            <ListItemText primary={user ? "Profile" : "Login"} />
          </ListItem>
          {user && (
            <ListItem button onClick={handleLogout}>
              <ListItemText primary="Sign Out" />
            </ListItem>
          )}
        </List>
      </Drawer>
      <CartSidebar
        cartItems={cart}
        open={cartOpen}
        onClose={handleCartClose}
        onCheckout={handleCheckout}
        updateCartItem={handleAddToCart}
      />
    </>
  );
};

export default Header;
