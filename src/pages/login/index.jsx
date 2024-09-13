import React, { useContext } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import { useRouter } from "next/router";
import { AuthContext } from "../../context/AuthContext";
import {
  Box,
  Button,
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Heading,
  VStack,
  CircularProgress,
  Container,
  useBreakpointValue,
} from "@chakra-ui/react";

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
    <Container maxW="sm" centerContent>
      <Box
        p={6}
        mt={20}
        mb={20}
        borderWidth={1}
        borderRadius="lg"
        boxShadow="lg"
        bg="white"
        width="100%"
      >
        <Heading as="h1" size="lg" mb={6} textAlign="center">
          Log In
        </Heading>
        <form onSubmit={formik.handleSubmit}>
          <VStack spacing={4}>
            <FormControl
              isInvalid={formik.touched.email && Boolean(formik.errors.email)}
            >
              <FormLabel htmlFor="email">Email Address</FormLabel>
              <Input
                id="email"
                name="email"
                type="email"
                variant="outline"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
              <FormErrorMessage>
                {formik.touched.email && formik.errors.email}
              </FormErrorMessage>
            </FormControl>
            <FormControl
              isInvalid={
                formik.touched.password && Boolean(formik.errors.password)
              }
            >
              <FormLabel htmlFor="password">Password</FormLabel>
              <Input
                id="password"
                name="password"
                type="password"
                variant="outline"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />
              <FormErrorMessage>
                {formik.touched.password && formik.errors.password}
              </FormErrorMessage>
            </FormControl>
            <Button
              type="submit"
              colorScheme="teal"
              width="full"
              isDisabled={!(formik.isValid && formik.dirty)}
            >
              {formik.isSubmitting ? <CircularProgress size={24} /> : "Log In"}
            </Button>
            <Link href="/signup" passHref>
              <Button variant="outline" colorScheme="teal" width="full" mt={4}>
                Sign Up
              </Button>
            </Link>
          </VStack>
        </form>
      </Box>
    </Container>
  );
};

export default Login;
