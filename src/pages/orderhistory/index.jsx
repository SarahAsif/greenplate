import React, { useEffect, useState, useContext } from "react";
import { supabase } from "../../utils/supabaseClient";
import { AuthContext } from "../../context/AuthContext";
import { useRouter } from "next/router";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Grid,
  Divider,
} from "@mui/material";
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
    return <div className="mt-36">NOt loagind</div>; // Show spinner while loading
  }

  return (
    <Box
      sx={{ padding: "16px", maxWidth: "1200px", margin: "auto" }}
      className="mt-36"
    >
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Order History
      </Typography>
      {orders.length === 0 ? (
        <Typography variant="body1">No orders found.</Typography>
      ) : (
        <Grid container spacing={3}>
          {orders.map((order) => (
            <Grid item xs={12} sm={6} md={4} key={order.id}>
              <Card variant="outlined" sx={{ boxShadow: 3 }}>
                <CardContent>
                  <Typography variant="h6" fontWeight="bold">
                    Order ID: {order.id}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Date: {new Date(order.created_at).toLocaleDateString()}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Total Amount: ${order.total_amount}
                  </Typography>
                  <Divider sx={{ my: 2 }} />
                  <Typography variant="subtitle1" fontWeight="bold">
                    Items:
                  </Typography>
                  {order.order_items.map((item, index) => (
                    <Box
                      key={index}
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        mt: 1,
                      }}
                    >
                      <Typography variant="body2">{item.name}</Typography>
                      <Typography variant="body2">
                        {item.quantity} x ${item.price}
                      </Typography>
                    </Box>
                  ))}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default OrderHistory;
