import React from "react";
import { IoCartOutline } from "react-icons/io5";
import SearchInput2 from "../../components/SearchInput2";
import { Link } from "react-router-dom";
import { BiSolidRightArrow } from "react-icons/bi";
import { Stepper } from "@mui/material";
import Step from "../../components/user-website/Stepper";
import ImageSlide from "../../components/image/ImageSlide";

const milestones = [
  { id: 1, title: "Milestone 1", price: "₦60,000", completed: true, date: "7th Jul, 2024" },
  { id: 2, title: "Milestone 2", price: "₦60,000", completed: true, date: "7th Jul, 2024" },
  { id: 3, title: "Milestone 3", price: "₦60,000", completed: true, date: "7th Jul, 2024" },
  { id: 4, title: "Milestone 4", price: "₦60,000", completed: true, date: "7th Jul, 2024" },
  { id: 5, title: "Milestone 5", price: "₦60,000", completed: false, date: "7th Jul, 2024" },
];

const images = [
  "https://via.placeholder.com/150/tech1",
  "https://via.placeholder.com/150/tech2",
  "https://via.placeholder.com/150/tech3",
  "https://via.placeholder.com/150/tech4",
];

const OngoingService = () => {
  return (
    <div className=" w-full">
      <div className="bg-[#F9FBFE] w-full">
        <div className="flex justify-between items-center gap-6 mt-8 lg:py-8 lg:mt-[65px] px-6 container mx-auto ">
          <button
            className={` py-2 pb-4 w-[160px] md:w-[180px] font-bold text-2xl text-red border-b-4 border-red`}
          >
            In Progress
          </button>
          <section className="py-4 flex mx-auto w-[90%] justify-end">
            <Link
              to="/user/cart"
              className="bg-radial-gradient py-3 px-6 text-white rounded-full lg:rou flex items-center text-[17px] font-semibold md:gap-3"
            >
              {" "}
              <span className="hidden md:block">View cart</span>
              <IoCartOutline size={28} />
            </Link>
          </section>
          <div className="hidden md:block md:w-2/5">
            <SearchInput2 />
          </div>
        </div>
      </div>

      <div className="block md:hidden w-full px-6 my-6">
        <SearchInput2 />
      </div>

      <div className="container mx-auto px-6">
        <nav className="flex items-center text-[16px] lg:text-[22px]  font-semibold text-gray-500 my-4">
          <Link to="/user" className="hover:underline">
            Services
          </Link>
          <span className="mx-2 lg:mx-4 size-[18px] lg:size-[28px]">
            <BiSolidRightArrow />
          </span>
          <span className="text-black font-bold">{"item.name"}</span>
        </nav>

        <div className="flex flex-col md:flex-row gap-10 justify-between mt-12">
          <div className="md:w-1/2">
            <h3 className="text-grey text- font-medium mb-4 flex justify-between text-[14px] md:text-[17px]">
              No. of Milestones <span className="text-black font-meduim">5</span>
            </h3>
            {/* <div className="border-l-2 border-gray-200 ml-4 flex flex-col justify-between h-[70vh]"> */}
            <Stepper activeStep={3} className="md:min-h-[95vh]" orientation="vertical" connector={<><hr className="size-10 bg-red" /></>}>
              {milestones.map((milestone, idx) => (
                <Step key={idx} item={milestone} />
              ))}
              {/* </div> */}
            </Stepper>

            <button className=" mt-12 rounded-full bg-radial-gradient w-full  text-center md:px-36 py-4 text-[16px] font-bold text-white shadow-sm">
              Complete payment
            </button>
          </div>

          <div className="md:w-1/2 space-y-4 pb-10">
            <div className="flex flex-col gap-6 justify-between text-grey text-[14px] md:text-[17px]">
              <div className="flex justify-between">
                <p>Pricing Type</p>
                <p className="text-black font-medium ">Fixed Price</p>
              </div>
              <div className="flex justify-between">
                <p>Starting From (Price)</p>
                <p className="text-black font-medium">₦300,000</p>
              </div>
              <div className="flex justify-between">
                <p>Estimated Duration</p>
                <p className="text-black font-medium">2 Weeks</p>
              </div>
            </div>

            <div className="hidden md:grid grid-cols-2 gap-4">
              {images.map((img, index) => (
                <div
                  key={index}
                  className="w-full aspect-square bg-gray-200 rounded-lg overflow-hidden"
                >
                  <img src={img} alt={`Project ${index}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>

            <div className="md:hidden bg-grey">
              <ImageSlide images={images} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OngoingService;
