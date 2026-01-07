import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { setupInterceptor } from "../../api/api";
import { useCart } from "../../contextData/useCart";

const MainLayout = () => {
  const navigate = useNavigate();
  const { logout } = useCart();

  useEffect(() => {
    setupInterceptor(navigate, logout);
  }, [navigate, logout]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;