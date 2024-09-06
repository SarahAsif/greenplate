import React, { createContext, useState, useEffect } from "react";
import { supabase } from "../utils/supabaseClient"; // Adjust the import based on your project structure

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Handle session changes
  useEffect(() => {
    const { data: subscription } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    // Clean up subscription on unmount
    // Removing the cleanup function since 'subscription.unsubscribe' is not a function
    return () => {
      // No cleanup function necessary if 'subscription.unsubscribe' is not valid
    };
  }, []);

  const signUp = async (
    email,
    password,
    name,
    address,
    city,
    area,
    gender,
    phone
  ) => {
    const {
      data: { user: newUser },
      error,
    } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      throw new Error(error.message);
    }

    const { error: profileError } = await supabase.from("profiles").insert({
      id: newUser.id,
      name,
      email,
      address,
      city,
      area,
      gender,
      phone,
      role: "customer",
    });

    if (profileError) {
      throw new Error(profileError.message);
    }

    setUser(newUser);
    return { user: newUser };
  };

  const signIn = async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error("Error signing in:", error.message);
        throw new Error("Failed to sign in. Please check your credentials.");
      }

      // Fetch the user data after successful sign-in
      const user = await supabase.auth.getUser();
      console.log("User data after sign-in:", user.data);

      return user.data;
    } catch (error) {
      console.error("Error signing in:", error.message);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null); // Clear user state after logout
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  };

  return (
    <AuthContext.Provider value={{ user, signUp, signIn, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
