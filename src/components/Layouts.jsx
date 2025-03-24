import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet, useLocation } from "react-router-dom";

// Layout component for the entire app, which includes the Navbar and Footer
const Layout = () => {
  // useLocation hook to get the current URL path
  const location = useLocation();

  // Check if the current route is the homepage, so we can hide the Navbar
  const isHomePage = location.pathname === "/";

  return (
    <>
      {/* Hide Navbar on homepage */}
      {!isHomePage && <Navbar />}

      {/* Main content area */}
      <main>
        {/* Render the matched child route's component here */}
        <Outlet />
      </main>

      {/* Footer that appears on every page */}
      <Footer />
    </>
  );
};

export default Layout;
