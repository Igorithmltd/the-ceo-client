import React from "react";

const PlanCard = ({ title, bgColor, color, features, price, imgSrc, buttonText }) => {
  return (
    <div className="flex-[1.6]">
      <div
        className={` flex flex-col lg:h-[700px] p-3 lg:p-10 bg-clip-border rounded-xl ${bgColor} text-gray-700 border-t-4 border-${color} shadow-md h-full`}
      >
        <div className=" bg-clip-border mt-4 mx-4 rounded-xl overflow-hidden bg-transparent text-gray-700 shadow-none !m-0 p-6">
          <img src={imgSrc} alt={`${title} logo`} />
          <h5
            className={`block antialiased text-${color} tracking-normal mt-6 text-[18px] font-extrabold leading-snug capitalize`}
          >
            {title}
          </h5>
        </div>
        <div className="flex-grow p-6 pt-2 flex flex-col border-blue-gray-50 justify-between">
          <ul className="flex flex-col gap-6 mb-16">
            {features.map((feature, index) => (
              <li key={index} className="flex items-center gap-4 text-grey-80">
                {feature.isAvailable ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    aria-hidden="true"
                    className="h-4 w-4 text-blue-gray-900"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 12.75l6 6 9-13.5"
                    ></path>
                  </svg>
                ) : (
                  <svg
                    width="9"
                    height="9"
                    viewBox="0 0 9 9"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8 1L1 8M1 1L8 8"
                      stroke="black"
                      stroke-width="0.8"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                )}

                <p className="block antialiased text-[14px] leading-normal">{feature.name}</p>
              </li>
            ))}
          </ul>
          <div className="flex flex-col md:flex-row w-full gap-x-3 gap-y-10 justify-between md:items-center">
            <h4
              className={`antialiased tracking-normal text-${color} text-2xl lg:text-4xl font-semibold leading-snug flex gap-1 lg:justify-center`}
            >
              {price}
            </h4>
            <button
              className={`rounded-[5px] bg-${color} px-2 lg:px-6 max-w-[50%] py-3 lg:py-5 h-[80%] text-[14px] lg:text-[16px] font-medium text-white shadow-sm`}
              type="button"
            >
              {buttonText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanCard;
