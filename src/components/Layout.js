import Footer from "./Footer";
import NavBar from "./Navbar";

const Layout = ({ children }) => (
  <>
    <NavBar />
    <main>{children}</main>
    <Footer />
  </>
);

export default Layout;
