// ServiceDetail.js
import React from "react";
import { useLocation } from "react-router-dom"; // Import useLocation to get passed state
import { Link } from "react-router-dom";
import SearchInput2 from "../../components/SearchInput2";
import { IoCartOutline } from "react-icons/io5";
import { BiSolidRightArrow } from "react-icons/bi";
import ImageGrid from "../../components/ImageGrid";
import { useModal } from "../../context/ModalContext";
import OrderMethod from "../../components/modals/OrderMethod";
import OrderSuccessModal from "../../components/modals/OrderSuccessModal";
import OrderSummaryModal from "../../components/modals/OrderSummaryModal";
import { useCart } from "../../context/CartContext";
import toast from "react-hot-toast";
const ServiceDetail = () => {
  const { setCart } = useCart();
  const { state } = useLocation();
  const { item } = state; // Destructure the item from state

  const { setIsOrderMethodOpen } = useModal();

  const handleMethod = () => {
    setIsOrderMethodOpen(true);
  };

  const addProductToCart = async (payload) => {
    try {
      let items = JSON.parse(localStorage.getItem("ceo-user-shop")) || [];
      const existingItemIndex = items.findIndex(
        (item) => item.type == payload.type && item.name == payload.name
      );
      if (existingItemIndex !== -1) {
        items[existingItemIndex].quantity += payload.quantity;
        toast.success("Item updated to cart");
      } else {
        items.push(payload);
        toast.success("Item added to cart");
      }
      setCart(items);
      localStorage.setItem("ceo-user-shop", JSON.stringify(items));
    } catch (error) {}
  };

  const images = [
    item.imageUrl, // Image 1
    "https://via.placeholder.com/150", // No image for this one
    "https://via.placeholder.com/150", // Image 3
    null, // No image for this one
  ];

  return (
    <div className="">
      <div className="bg-[#F9FBFE] w-full">
        <div className="flex justify-between items-center gap-6 mt-8 lg:py-8 lg:mt-[65px] px-6 container mx-auto ">
          <button className={`px-4 py-2 pb-4 font-bold text-2xl text-red border-b-4 border-red`}>
            Services
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
          <span className="text-black font-bold">{item.name}</span>
        </nav>
        <div className="flex flex-col md:flex-row ">
          {/* <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-[33%] aspect-square object-cover rounded-lg"
                /> */}

          <div className="md:w-[50%] h-auto">
            <ImageGrid images={images} />
          </div>

          <div className="flex flex-col gap-6 mt-4 justify-between p-4 md:pl-12 w-full md:w-2/3 text-[14px] md:text-[17px] font-light  text-black">
            <div className="flex justify-between gap-2">
              <span className="text-[#333333] md:font-normal"> Service Name</span>
              <span className="font-medium"> {item.name}</span>
            </div>
            <div className="flex justify-between gap-2">
              <span className="text-[#333333] md:font-normal"> Pricing type</span>
              <span className="font-medium ">{item.pricing_type}</span>
            </div>
            <div className="flex justify-between gap-2">
              <span className="text-[#333333] md:font-normal"> Starting from (Price)</span>
              <span className="font-medium md:text-[20px]">&#8358; {item.amount}</span>
            </div>
            <div className="flex justify-between gap-2">
              <span className="text-[#333333] md:font-normal">Estimated Duration</span>
              <span className="font-medium"> {item.duration}</span>
            </div>
            <div className="flex justify-between gap-2">
              <span className="text-[#333333] md:font-normal">No. of Milestones</span>
              <span className="font-medium"> {item.milestone}</span>
            </div>
            {/* Milestones */}
            <div className="text-[16px] space-y-4 mt-6">
              <div className="flex flex-col gap-2">
                <span className="text-grey-40 md:font-normal">Milestone 1</span>
                <span className="font-medium"> {item.description}</span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-grey-40 md:font-normal">Milestone 2</span>
                <span className="font-medium"> {item.description}</span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-grey-40 md:font-normal">Milestone 3</span>
                <span className="font-medium"> {item.description}</span>
              </div>
            </div>

            {/* Unit Controls */}
            <div className=" md:relative w-[100%] mt-8 md:mt-24 flex flex-col md:flex-row gap-y-6 items-center justify-center gap-x-6">
              <button
                onClick={handleMethod}
                className="rounded-full bg-radial-gradient w-full md:w-full text-center md:px-10 py-4 text-[16px] font-bold text-white shadow-sm"
              >
                Place an order
              </button>
              <button
                onClick={() => addProductToCart({ ...item, quantity: 1, type: "service" })}
                className="rounded-full w-full md:w-full text-center md:px-10 py-4 text-[16px] font-bold text-red border-red border-2 shadow-sm"
              >
                Add to cart
              </button>
            </div>
          </div>
        </div>
      </div>
      <OrderMethod />
      <OrderSuccessModal />
      <OrderSummaryModal item={item} />
    </div>
  );
};

export default ServiceDetail;
