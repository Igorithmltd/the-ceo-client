import React from "react";
import { useNavigate } from "react-router-dom";

const Cta = ({ heading, paragraph }) => {
  const navigate = useNavigate();

  const goToSignup = () => {
    if (localStorage.getItem("moi-moi")) {
      localStorage.removeItem("moi-moi");
      return navigate("/auth/signup");
    }
    navigate("/auth/signup");
  };

  return (
    <section className="bg-blue pt-28   pb-16 relative">
      <div className="container mx-auto lg:max-w-[90%] flex gap-10 flex-col lg:flex-row items-center justify-between">
        <div className="max-w-3xl px-6 z-[3]">
          <div className="hidden sm:mb-8 sm:flex sm:justify-center"></div>
          <div className="text-center lg:text-left">
            <h5 className="text-[23px] lg:text-[35px] font-extrabold text-[#ffffff]">{heading}</h5>
            <p className="mt-10 text-[14px] lg:text-[16px] font-semibold leading-loose text-[#B5BDD1]">
              {paragraph}
            </p>
            <div className="mt-10">
              <button
                onClick={goToSignup}
                className="rounded-[4px] border-2 mt-14  text-center lg:w-[50%] py-5 text-[16px] font-extrabold text-white w-[80%] border-white"
              >
                Get started free
              </button>
            </div>
          </div>
        </div>
        <div className="flex-[2] z-[3]">
          <img src="/images/landing_page/cta.png" alt="" className="w-full hidden lg:block" />
        </div>
      </div>

      <div className="flex w-[12%] absolute h-[100%] right-0 top-0">
        <div className="w-24 h-[100%] bg-[#E12533] bg-opacity-25 lg:bg-opacity-100"></div>
        <div className="w-24 h-[100%] bg-[#A91C26] bg-opacity-25 lg:bg-opacity-100"></div>
        <div className="w-24 h-[100%] bg-[#701219] bg-opacity-25 lg:bg-opacity-100"></div>
      </div>
    </section>
  );
};

export default Cta;
