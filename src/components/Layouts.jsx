import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet, useLocation } from "react-router-dom";

const Layout = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <>
      {!isHomePage && <Navbar />}
      <main>
        <Outlet />
      </main>
      <Footer /> {/* ✅ This will now show on all pages */}
    </>
  );
};

export default Layout;
