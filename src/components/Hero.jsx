import { Link, useNavigate } from "react-router-dom";
import mockup from "/images/landing_page/mockup.png";
import { useAuth } from "../context/AuthContext";

const Hero = ({ heading, paragraph }) => {
  const navigate = useNavigate();
  const { userInfo } = useAuth();

  const goToSignup = () => {
    if (localStorage.getItem("moi-moi")) {
      localStorage.removeItem("moi-moi");
      return navigate("/auth/signup");
    }
    navigate("/auth/signup");
  };

  return (
    <div className="relative isolate pt-14 flex gap-3 flex-col mt-[40px] lg:mt-[100px]">
      <div className=" flex gap-28 flex-col lg:flex-row mx-6 lg:mx-8 items-center justify-between">
        <div className="max-w-2xl ">
          <div className="hidden sm:mb-8 sm:flex sm:justify-center"></div>
          <div className="text-center lg:text-left lg:space-y-20">
            <div>
              <h1 className="text-center lg:text-left text-[36px] lg:text-[44px] lg:leading-normal leading-loose font-extrabold tracking-tight text-gray-900 sm:text-6xl">
                {heading}
              </h1>
              <p className="mt-6 text-[14px] lg:text-[16px] font-semibold leading-loose text-grey-40">
                {paragraph}
              </p>
            </div>
            <div className="mt-10 flex flex-col lg:flex-row items-center gap-y-6 lg:gap-x-6 w-full">
              <button
                onClick={goToSignup}
                className="rounded-[4px] bg-radial-gradient text-center lg:w-[40%] py-5 text-[16px] font-extrabold text-white shadow-sm w-[80%]"
              >
                Create a free account
              </button>
              <Link
                to="/auth/signin-email"
                className="rounded-[4px] border-2  text-center lg:w-[40%] sm py-5 text-[16px] font-extrabold text-blue-50 w-[80%] border-blue-50"
              >
                Login
              </Link>
            </div>
          </div>
        </div>
        <div className="flex-[2] p-2">
          <img
            src={mockup}
            alt=""
            className="w-full hidden lg:block" // Hidden on mobile and small screens, visible on large screens and above
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
