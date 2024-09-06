import React, { useContext } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import { useRouter } from "next/router";
import { AuthContext } from "../../context/AuthContext"; // Adjust the import based on your project structure
import {
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Box,
  CircularProgress,
} from "@mui/material";
const Login = () => {
  const { signIn } = useContext(AuthContext);
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: async (values) => {
      try {
        await signIn(values.email, values.password);
        router.push("/");
      } catch (error) {
        console.error("Error signing in:", error.message);
      }
    },
  });

  return (
    <Container component="main" maxWidth="xs">
      <Paper
        elevation={3}
        style={{ padding: "2rem", marginTop: "9rem", marginBottom: "5rem" }}
      >
        <Typography variant="h4" align="center" gutterBottom>
          Log In
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            gap={2}
          >
            <TextField
              name="email"
              label="Email Address"
              type="email"
              variant="outlined"
              fullWidth
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
              name="password"
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
            <Button
              type="submit"
              variant="contained"
              color="success"
              fullWidth
              disabled={!(formik.isValid && formik.dirty)}
            >
              {formik.isSubmitting ? <CircularProgress size={24} /> : "Log In"}
            </Button>
            <Link href="/signup" style={{ textDecoration: "none" }}>
              <Button
                variant="outlined"
                color="success"
                fullWidth
                style={{ marginTop: "1rem" }}
              >
                Sign Up
              </Button>
            </Link>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default Login;
