import React, { useEffect, useState, useContext } from "react";
import { supabase } from "../../utils/supabaseClient";
import { AuthContext } from "../../context/AuthContext";
import { useRouter } from "next/router";
import {
  Box,
  Text,
  Grid,
  Card,
  CardHeader,
  CardBody,
  Divider,
  Flex,
} from "@chakra-ui/react";
import { AppContext } from "../../context/AppContext";

const OrderHistory = () => {
  const { user } = useContext(AuthContext);
  const { clearCart } = useContext(AppContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) {
        router.push("/login");
        return;
      }

      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("orders")
          .select(
            "id, total_amount, created_at, order_items (name, quantity, price)"
          )
          .eq("email", user.email) // Fetch orders by user email
          .order("created_at", { ascending: false });

        if (error) {
          throw new Error(error.message);
        }

        setOrders(data);
      } catch (error) {
        console.error("Error fetching orders:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  if (loading) {
    return (
      <Text mt="36" textAlign="center">
        Loading...
      </Text>
    ); // Show spinner while loading
  }

  return (
    <Box p="16px" maxW="1200px" mx="auto" mt="36">
      <Text fontSize="2xl" fontWeight="bold" mb="4">
        Order History
      </Text>
      {orders.length === 0 ? (
        <Text>No orders found.</Text>
      ) : (
        <Grid templateColumns="repeat(auto-fit, minmax(300px, 1fr))" gap="6">
          {orders.map((order) => (
            <Card key={order.id} variant="outline" boxShadow="md">
              <CardHeader>
                <Text fontSize="lg" fontWeight="bold">
                  Order ID: {order.id}
                </Text>
                <Text fontSize="sm" color="gray.500">
                  Date: {new Date(order.created_at).toLocaleDateString()}
                </Text>
                <Text fontSize="sm" color="gray.500">
                  Total Amount: ${order.total_amount}
                </Text>
              </CardHeader>
              <CardBody>
                <Divider my="2" />
                <Text fontSize="md" fontWeight="bold" mb="2">
                  Items:
                </Text>
                {order.order_items.map((item, index) => (
                  <Flex
                    key={index}
                    justify="space-between"
                    mt="2"
                    align="center"
                  >
                    <Text fontSize="sm">{item.name}</Text>
                    <Text fontSize="sm">
                      {item.quantity} x ${item.price}
                    </Text>
                  </Flex>
                ))}
              </CardBody>
            </Card>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default OrderHistory;
