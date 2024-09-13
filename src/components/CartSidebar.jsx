import React, { useContext } from "react";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  Box,
  Text,
  List,
  ListItem,
  IconButton,
  Button,
} from "@chakra-ui/react";
import { AddIcon, RemoveIcon, DeleteIcon } from "@chakra-ui/icons";
import { AppContext } from "../context/AppContext";

const CartSidebar = ({
  cartItems = [],
  open,
  onClose,
  onCheckout,
  updateCartItem,
}) => {
  const { removeFromCart } = useContext(AppContext);

  const getTotalPrice = () => {
    return cartItems
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  return (
    <Drawer isOpen={open} onClose={onClose} placement="left">
      <DrawerOverlay />
      <DrawerContent>
        <DrawerHeader borderBottomWidth="1px">Cart</DrawerHeader>
        <DrawerBody>
          <List spacing={3}>
            {cartItems.length > 0 ? (
              cartItems.map((item, index) => (
                <ListItem
                  key={index}
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  p={3}
                  borderBottomWidth="1px"
                >
                  <Box>
                    <Text fontWeight="bold">{item.name}</Text>
                    <Text fontSize="sm">
                      Price: ${item.price} x {item.quantity}
                    </Text>
                    <Text fontSize="sm">
                      Size: {item.variations?.size || "N/A"}
                    </Text>
                    <Text fontSize="sm">
                      Extras: {item.variations?.extras?.join(", ") || "N/A"}
                    </Text>
                  </Box>
                  <Box>
                    <IconButton
                      icon={<RemoveIcon />}
                      onClick={() =>
                        updateCartItem(item.id, Math.max(item.quantity - 1, 0))
                      }
                      aria-label="Remove item"
                      mr={2}
                    />
                    <IconButton
                      icon={<AddIcon />}
                      onClick={() => updateCartItem(item.id, item.quantity + 1)}
                      aria-label="Add item"
                      mr={2}
                    />
                    <IconButton
                      icon={<DeleteIcon />}
                      onClick={() => removeFromCart(item.name)}
                      aria-label="Delete item"
                    />
                  </Box>
                </ListItem>
              ))
            ) : (
              <ListItem>
                <Text>No items in cart</Text>
              </ListItem>
            )}
          </List>
        </DrawerBody>
        <DrawerFooter borderTopWidth="1px" pt={4}>
          <Box flex="1" textAlign="left">
            <Text fontSize="lg" fontWeight="bold">
              Total Price: ${getTotalPrice()}
            </Text>
          </Box>
          <Button
            colorScheme="blue"
            onClick={onCheckout}
            isDisabled={cartItems.length === 0}
          >
            Checkout
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default CartSidebar;
