import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { BiSolidRightArrow } from "react-icons/bi";
import SearchInput2 from "../../components/SearchInput2";
import { useCart } from "../../context/CartContext";
import { toast } from "react-hot-toast";
import CartItem from "../../components/user-website/CartItem";
import { useModal } from "../../context/ModalContext";
import OrderMethod from "../../components/modals/OrderMethod";
import OrderSuccessModal from "../../components/modals/OrderSuccessModal";
import OrderSummaryModal from "../../components/modals/OrderSummaryModal";

const Cart = () => {
  const { cart, setCart } = useCart();
  const { setIsOrderMethodOpen } = useModal();

  const navigate = useNavigate();

  const handleNavigateToDetail = (item) => {
    // Navigate with state to pass item data

    if (item.type === "product") {
      navigate(`/user/product/${item.id}`, { state: { item } });
    } else if (item.type === "service") {
      navigate(`/user/service/${item.id}`, { state: { item } });
    }
  };

  const handleDelete = (payload) => {
    const itemIdx = cart.findIndex((c) => c.name == payload.name && c.type == payload.type);

    if (itemIdx > -1) {
      cart.splice(itemIdx, 1);
      localStorage.setItem("ceo-user-shop", JSON.stringify(cart));
      setCart(cart);
      toast.error("Item removed from cart");
      window.location.reload();
    }
  };

  const handleMethod = () => {
    setIsOrderMethodOpen(true);
  };

  const companyName = localStorage.getItem("companyName");

  return (
    <div className="p-6 container mx-auto mt-8 lg:mt-[65px]">
      <div className="mb-4">
        {/* Breadcrumbs */}
        <div className="flex justify-between">
          <div className="flex space-x-6 mb-6">
            <button className={`px-4 py-2 pb-4 font-bold text-2xl text-red border-b-4 border-red`}>
              Cart
            </button>
          </div>
          <div className="hidden md:block md:w-2/5">
            <SearchInput2 />
          </div>
        </div>
        <nav className="flex items-center text-[16px] lg:text-[22px]  font-semibold text-gray-500 my-4">
          <Link to={`/S/${companyName}`} className="hover:underline">
            Home
          </Link>
          <span className="mx-2 lg:mx-4 size-[18px] lg:size-[28px]">
            <BiSolidRightArrow />
          </span>
          <span className="text-black font-bold">Cart</span>
        </nav>
        <div className="p-4">
          {cart.length === 0 ? (
            <p className="text-gray-500">Your cart is empty.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4 ">
              {cart.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  handleDelete={handleDelete}
                  handleNavigateToDetail={handleNavigateToDetail}
                  handleMethod={handleMethod}
                />
              ))}
            </div>
          )}
        </div>
      </div>
      <section className="my-10 py-4 flex mx-auto w-[90%] justify-center">
        <button
          onClick={handleMethod}
          className="rounded-full bg-radial-gradient w-full md:w-auto text-center md:px-36 py-4 text-[16px] font-bold text-white shadow-sm"
        >
          Order all
        </button>
      </section>

      <OrderMethod />
      <OrderSuccessModal />
      <OrderSummaryModal />
    </div>
  );
};

export default Cart;
