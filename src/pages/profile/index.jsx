import React, { useContext, useEffect, useState } from "react";
import { supabase } from "../../utils/supabaseClient";
import { AuthContext } from "../../context/AuthContext";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Paper,
} from "@mui/material";
import { useRouter } from "next/router";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) {
        router.push("/login");
        return;
      }

      try {
        const {
          data: { user: currentUser },
          error: authError,
        } = await supabase.auth.getUser();
        if (authError)
          throw new Error(`Authentication error: ${authError.message}`);

        if (!currentUser || !currentUser.id)
          throw new Error("User ID not found");

        const { data: profileData, error: profileError } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", currentUser.id)
          .single();

        if (profileError)
          throw new Error(`Profile fetch error: ${profileError.message}`);
        if (!profileData) throw new Error("Profile data is null");

        setProfile(profileData);
      } catch (error) {
        console.error("Error fetching profile:", error.message);
        setError(`Error fetching profile: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user, router]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <Container
      component="main"
      maxWidth="md"
      style={{ marginTop: "9rem", marginBottom: "5rem" }}
    >
      <Paper elevation={3} style={{ padding: "2rem" }}>
        <Typography variant="h4" gutterBottom>
          User Profile
        </Typography>
        {profile && (
          <Card variant="outlined">
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="h6">Name:</Typography>
                  <Typography variant="body1">{profile.name}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="h6">Email:</Typography>
                  <Typography variant="body1">{profile.email}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="h6">Address:</Typography>
                  <Typography variant="body1">{profile.address}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="h6">City:</Typography>
                  <Typography variant="body1">{profile.city}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="h6">Area:</Typography>
                  <Typography variant="body1">{profile.area}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="h6">Gender:</Typography>
                  <Typography variant="body1">{profile.gender}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="h6">Phone:</Typography>
                  <Typography variant="body1">{profile.phone}</Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        )}
      </Paper>
    </Container>
  );
};

export default Profile;
