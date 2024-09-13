import React, { useContext, useEffect, useState } from "react";
import { supabase } from "../../utils/supabaseClient";
import { AuthContext } from "../../context/AuthContext";
import { useRouter } from "next/router";
import {
  Box,
  Text,
  Container,
  Grid,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Stack,
} from "@chakra-ui/react";

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

  if (loading)
    return (
      <Text mt="36" textAlign="center">
        Loading...
      </Text>
    );
  if (error)
    return (
      <Text mt="36" textAlign="center">
        {error}
      </Text>
    );

  return (
    <Container maxW="container.md" mt="36" mb="24">
      <Box p="4" shadow="md" borderWidth="1px" borderRadius="md">
        <Text fontSize="2xl" fontWeight="bold" mb="4">
          User Profile
        </Text>
        {profile && (
          <Card variant="outline" borderWidth="1px">
            <CardHeader>
              <Text fontSize="lg" fontWeight="bold">
                Profile Details
              </Text>
            </CardHeader>
            <CardBody>
              <Grid
                templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
                gap="6"
              >
                {[
                  { label: "Name", value: profile.name },
                  { label: "Email", value: profile.email },
                  { label: "Address", value: profile.address },
                  { label: "City", value: profile.city },
                  { label: "Area", value: profile.area },
                  { label: "Gender", value: profile.gender },
                  { label: "Phone", value: profile.phone },
                ].map((item) => (
                  <Box
                    key={item.label}
                    p="4"
                    borderWidth="1px"
                    borderRadius="md"
                  >
                    <Text fontWeight="bold">{item.label}:</Text>
                    <Text>{item.value}</Text>
                  </Box>
                ))}
              </Grid>
            </CardBody>
          </Card>
        )}
      </Box>
    </Container>
  );
};

export default Profile;
