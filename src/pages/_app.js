// src/pages/_app.js

import "../styles/globals.css"; // Import global CSS
import { AppProvider } from "../context/AppContext"; // Import your context provider
import { AuthProvider } from "../context/AuthContext"; // Import your context provider
import { Provider } from "react-redux"; // Import Redux provider
import Layout from "../components/layout"; // Import Layout component

// This is the custom App component
function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <AppProvider>
        <Layout>
          <Component {...pageProps} /> {/* Render the page component */}
        </Layout>
      </AppProvider>
    </AuthProvider>
  );
}

export default MyApp;
