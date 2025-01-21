// ProductDetail.js
import React from "react";
import { useLocation } from "react-router-dom"; // Import useLocation to get passed state
import { Link } from "react-router-dom";
import SearchInput2 from "../../components/SearchInput2";
import { IoCartOutline } from "react-icons/io5";
import { BiSolidRightArrow } from "react-icons/bi";
import ImageSlide from "../../components/image/ImageSlide";
import OrderMethod from "../../components/modals/OrderMethod";
import { useModal } from "../../context/ModalContext";
import OrderSuccessModal from "../../components/modals/OrderSuccessModal";
import OrderSummaryModal from "../../components/modals/OrderSummaryModal";
import { useCart } from "../../context/CartContext";
import toast from "react-hot-toast";

const ProductDetail = () => {
  const { state } = useLocation();
  const { setCart } = useCart();
  const { item } = state;

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

  return (
    <div className="w-full">
      <div className="bg-[#F9FBFE] w-full">
        <div className="flex justify-between items-center gap-6 mt-8 lg:py-8 lg:mt-[65px] px-6 container mx-auto ">
          <button className={`px-4 py-2 pb-4 font-bold text-2xl text-red border-b-4 border-red`}>
            Products
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

      <div className="container mx-auto px-4 md:mt-6">
        <nav className="flex items-center text-[16px] lg:text-[22px]  font-semibold text-gray-500 my-4">
          <Link to="/user" className="hover:underline">
            Products
          </Link>
          <span className="mx-2 lg:mx-4 size-[18px] lg:size-[28px]">
            <BiSolidRightArrow />
          </span>
          <span className="text-black font-bold">{item.name}</span>
        </nav>

        <div className="flex flex-col md:flex-row">
          <div className="md:w-[33%] aspect-square object-cover rounded-lg">
            <ImageSlide images={item.extraurls} />
          </div>

          <div className="flex flex-col gap-6 mt-4 justify-between p-4 md:pl-12 w-full md:w-2/3 text-[14px] md:text-[17px] font-light  text-black">
            <div className="flex justify-between gap-2">
              <span className="text-[#333333] md:font-normal"> Product Name</span>
              <span className="font-medium"> {item.name}</span>
            </div>
            <div className="flex justify-between gap-2">
              <span className="text-[#333333] md:font-normal"> Price</span>
              <span className="font-medium md:text-[20px]">&#8358; {item.unitsellingprice}</span>
            </div>
            <div className="flex justify-between gap-2">
              <span className="text-[#333333] md:font-normal"> Sales</span>
              <span className="font-medium">&#8358; {item.unitsellingprice}</span>
            </div>
            <div className="flex justify-between gap-2">
              <span className="text-[#333333] md:font-normal"> Product Description</span>
              <span className="font-medium"> {item.description}</span>
            </div>

            {/* Unit Controls */}
            <div className=" md:relative w-[100%] mt-8 md:mt-24 flex flex-col md:flex-row gap-y-6 items-center justify-center gap-x-6">
              <button
                onClick={handleMethod}
                className="rounded-full bg-radial-gradient w-full md:w-auto text-center md:px-36 py-4 text-[16px] font-bold text-white shadow-sm"
              >
                Place an order
              </button>
              <button
                onClick={() => addProductToCart({ ...item, quantity: 1, type: "product" })}
                className="rounded-full w-full md:w-auto text-center md:px-36 py-4 text-[16px] font-bold text-red border-red border-2 shadow-sm"
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

export default ProductDetail;
