import "../styles/globals.css";
import { AppProvider } from "../context/AppContext";
import { AuthProvider } from "../context/AuthContext";
import Layout from "../components/Layout";
import ErrorBoundary from "../components/ErrorBoundary";
import { ChakraProvider } from "@chakra-ui/react";

function MyApp({ Component, pageProps }) {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <AppProvider>
          <Layout>
            <ChakraProvider>
              <Component {...pageProps} />
            </ChakraProvider>
          </Layout>
        </AppProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default MyApp;
