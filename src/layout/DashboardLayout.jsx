import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import DashboardNavbar from "../components/DashboardNavbar";
import MobileFooter from "../components/MobileFooter";

const DashboardLayout = () => {
  const token_key = localStorage.getItem("moi-moi");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token_key) {
      navigate("/auth/signin-email");
    }
  }, [navigate, token_key]);

  return (
    <div className="font-Archivo">
      <Header />
      <main className="flex flex-col">
        <div className="flex md:flex-row h-[93vh] md:pe-5">
          <DashboardNavbar />
          <Outlet />
        </div>
       <MobileFooter />
      </main>
    </div>
  );
};

export default DashboardLayout;
