import React, { useContext } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Button,
  Typography,
} from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import { AppContext } from "../context/AppContext";

const CartSidebar = ({
  cartItems = [],
  open,
  onClose,
  onCheckout,
  updateCartItem,
}) => {
  const getTotalPrice = () => {
    return cartItems
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };
  const { removeFromCart } = useContext(AppContext);
  return (
    <Drawer anchor="left" open={open} onClose={onClose}>
      <div
        style={{
          width: 350,
          padding: "16px",
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <Typography variant="h6" gutterBottom>
          Cart
        </Typography>
        <List style={{ flex: 1, overflowY: "auto" }}>
          {cartItems.length > 0 ? (
            cartItems.map((item, index) => (
              <ListItem
                key={index}
                style={{ display: "flex", alignItems: "center" }}
              >
                <ListItemText
                  primary={item.name}
                  secondary={`Price: $${item.price} x ${item.quantity}`}
                />
                <IconButton
                  onClick={() =>
                    updateCartItem(item.id, Math.max(item.quantity - 1, 0))
                  }
                >
                  <Remove />
                </IconButton>
                <IconButton
                  onClick={() => updateCartItem(item.id, item.quantity + 1)}
                >
                  <Add />
                </IconButton>
                <button
                  onClick={() => removeFromCart(item.name)}
                  className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600"
                >
                  Remove
                </button>
              </ListItem>
            ))
          ) : (
            <ListItem>
              <ListItemText primary="No items in cart" />
            </ListItem>
          )}
        </List>
        <div
          style={{
            marginTop: "auto",
            paddingTop: "16px",
            borderTop: "1px solid #ddd",
          }}
        >
          <Typography variant="h6">Total Price: ${getTotalPrice()}</Typography>
          <Button
            onClick={onCheckout}
            variant="contained"
            color="primary"
            style={{ width: "100%", marginTop: "16px" }}
            disabled={cartItems.length === 0}
          >
            Checkout
          </Button>
        </div>
      </div>
    </Drawer>
  );
};

export default CartSidebar;
