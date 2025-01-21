import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const BusinessLayout = () => {
  const token_key = localStorage.getItem('moi-moi');
  const navigate = useNavigate();

  
  useEffect(() => {
    // if (!token_key) {
    //   navigate('/auth/signin-email');
    // }
  }, [navigate, token_key]);

  return (
    <div className="min-h-[100vh]">
      <div className="flex flex-col md:flex-row h-[100vh] p-[30px] md:p-0 gap-1">
        <div className="flex-1  md:overflow-auto">
          <Outlet />
        </div>
        <div className="flex-1 hidden md:block">
          <div className="h-full">
            <img src="/images/businessImage.png" className="h-full w-full" alt="welcome image" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessLayout;
