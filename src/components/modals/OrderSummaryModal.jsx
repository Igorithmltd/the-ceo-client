import React, { useState } from "react";
import Modal from "./Modal";
import { useModal } from "../../context/ModalContext";
import PhoneInput from "react-phone-number-input";
import flags from "react-phone-number-input/flags";
import { ImCancelCircle } from "react-icons/im";
import { useCart } from "../../context/CartContext";

const OrderSummaryModal = ({ item }) => {
  const { isOrderSummaryOpen, setIsOrderSummaryOpen, setIsOrderMethodOpen, setIsOrderSuccessOpen } =
    useModal();
  const { cart, setCart } = useCart();
  const [value, setValue] = useState();

  const closeModal = () => {
    setIsOrderSummaryOpen(false);
  };

  const handleSuccess = () => {
    setIsOrderSuccessOpen(true);
    setIsOrderSummaryOpen(false);
    setIsOrderMethodOpen(false);
  };

  const accountDetails = JSON.parse(localStorage.getItem("accountDetails")) || [];

  let data;
  if (item) {
    data = {
      name: item.name,
      amount: item.amount || item.unitsellingprice,
      total: item.amount || item.unitsellingprice,
      type: item.milestone ? "Service" : "Product",
      charges: 0,
    };
  } else {
    data = {
      name: cart.map((item) => item.name).join(", "),
      amount: cart.reduce((total, item) => {
        const quantity = item.quantity || 0;
        const price = parseFloat(item.amount || item.unitsellingprice || 0);
        return total + quantity * price;
      }, 0),
      total: cart.reduce((total, item) => {
        const quantity = item.quantity || 0;
        const price = parseFloat(item.amount || item.unitsellingprice || 0);
        return total + quantity * price;
      }, 0),
      type: "Product",
      charges: 0,
    };
  }

  console.log(cart);

  return (
    <Modal isOpen={isOrderSummaryOpen} closeModal={closeModal}>
      <div className="relative flex flex-col md:flex-row gap-x-6 md:justify-between bg-white w-full h-full max-w-[95vw] md:max-w-[70vw] max-h-[95vh] overflow-auto p-4 md:p-8">
        <div className=" w-full h-full md:overflow-y-auto">
          {/* Product Details */}

          <h2 className="border-b mb-6 font-bold text-[14px] md:text-[17px]">
            Make payment for order
          </h2>

          <div className="absolute right-6 top-4 md:top-6 cursor-pointer text-grey-40 text-[16px] md:text-[24px]">
            <ImCancelCircle title="close" onClick={closeModal} />
          </div>

          <div className="flex flex-col gap-8">
            <div className="hidden md:flex gap-4 w-full">
              <img
                src="https://via.placeholder.com/150"
                alt="Main Product"
                className="w-64 h-64 aspect-square object-cover rounded-md"
              />
              <div className="flex flex-col gap-2">
                <img
                  src="https://via.placeholder.com/60"
                  alt="Thumbnail 1"
                  className="w-16 h-16 aspect-square object-cover rounded-md"
                />
                <img
                  src="https://via.placeholder.com/60"
                  alt="Thumbnail 2"
                  className="w-16 h-16 object-cover rounded-md"
                />
              </div>
            </div>
            <div className="hidden md:block pr-6">
              <div className="mb-6 ">
                <h2 className="text-[16px] text-[#8390B3] font-medium mb-8">Order details</h2>
                <div className="flex flex-col gap-6 mt-4 justify-between w-full text-[14px] md:text-[17px] font-light  text-black">
                  <div className="flex justify-between gap-2">
                    <span className="text-[#333333] md:font-normal"> Purchace type</span>
                    <span className="font-medium"> {data?.type}</span>
                  </div>
                  {item ? (
                    <div className="flex justify-between gap-2">
                      <span className="text-[#333333] md:font-normal"> Product Name</span>
                      <span className="font-medium"> {data?.name}</span>
                    </div>
                  ) : (
                    <>
                      <div className="flex justify-between gap-2">
                        <span className="text-[#333333] md:font-normal"> Quantity</span>
                        <span className="font-medium"> {cart.length}</span>
                      </div>
                      <div className="flex justify-between gap-2">
                        <span className="text-[#333333] md:font-normal">
                          Products ({cart.length})
                        </span>
                        <span className="font-medium">{data?.name}</span>
                      </div>
                    </>
                  )}
                  <div className="flex justify-between gap-2">
                    <span className="text-[#333333] md:font-normal"> Amount</span>
                    <span className="font-medium">&#8358; {data?.amount}</span>
                  </div>
                  <div className="flex justify-between gap-2">
                    <span className="text-[#333333] md:font-normal"> Charges</span>
                    <span className="font-medium">&#8358; {data?.charges}</span>
                  </div>

                  <div className="flex justify-between gap-2 mt-8">
                    <span className="text-[#333333] md:font-normal"> Total</span>
                    <span className="font-medium">&#8358; {data?.total}</span>
                  </div>
                </div>
              </div>

              <hr className="my-16 border" />

              <div className="mb-6">
                <h2 className="text-[16px] text-[#8390B3] font-medium mb-8">Payment details</h2>
                <div className="flex flex-col gap-6 mt-4 justify-between text-[14px] md:text-[17px] font-light  text-black">
                  <div className="flex justify-between gap-2">
                    <span className="text-[#333333] md:font-normal"> Bank</span>
                    <span className="font-medium"> {accountDetails.bankname}</span>
                  </div>
                  <div className="flex justify-between gap-2">
                    <span className="text-[#333333] md:font-normal"> Account name</span>
                    <span className="font-medium">{accountDetails.accountname}</span>
                  </div>
                  <div className="flex justify-between gap-2">
                    <span className="text-[#333333] md:font-normal">Account number</span>
                    <span className="font-medium">{accountDetails.accountnumber}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex md:hidden gap-2 mb-4">
              <img
                src="https://via.placeholder.com/60"
                alt="Thumbnail 1"
                className="w-1/3 aspect-square object-cover rounded-md"
              />
              <img
                src="https://via.placeholder.com/60"
                alt="Thumbnail 1"
                className="w-1/3 aspect-square object-cover rounded-md"
              />
              <img
                src="https://via.placeholder.com/60"
                alt="Thumbnail 2"
                className="w-1/3 aspect-square object-cover rounded-md"
              />
            </div>
          </div>
        </div>

        <div className="">
          {/* Order Details */}
          <div className="md:hidden">
            <div className="mb-6">
              <h2 className="text-[16px] text-[#8390B3] font-medium mb-8">Order details</h2>
              <div className="flex flex-col gap-6 mt-4 justify-between  md:pl-12 w-full md:w-2/3 text-[14px] md:text-[17px] font-light  text-black">
                <div className="flex justify-between gap-2">
                  <span className="text-[#333333] md:font-normal"> Purchase type</span>
                  <span className="font-medium md:text-[20px]">{data?.type}</span>
                </div>
                {item ? (
                  <div className="flex justify-between gap-2">
                    <span className="text-[#333333] md:font-normal"> Product Name</span>
                    <span className="font-medium"> {data?.name}</span>
                  </div>
                ) : (
                  <>
                    <div className="flex justify-between gap-2">
                      <span className="text-[#333333] md:font-normal"> Quantity</span>
                      <span className="font-medium"> {cart.length}</span>
                    </div>
                    <div className="flex justify-between gap-2">
                      <span className="text-[#333333] md:font-normal">
                        Products ({cart.length})
                      </span>
                      <span className="font-medium">{data?.name}</span>
                    </div>
                  </>
                )}
                <div className="flex justify-between gap-2">
                  <span className="text-[#333333] md:font-normal"> Amount</span>
                  <span className="font-medium">&#8358; {data?.amount}</span>
                </div>
                <div className="flex justify-between gap-2">
                  <span className="text-[#333333] md:font-normal"> Charges</span>
                  <span className="font-medium">&#8358; {data?.charges}</span>
                </div>

                <div className="flex justify-between gap-2 mt-8">
                  <span className="text-[#333333] md:font-normal"> Total</span>
                  <span className="font-medium">&#8358; {data?.total}</span>
                </div>
              </div>
            </div>

            <hr className="my-16 border" />

            <div className="mb-6">
              <h2 className="text-[16px] text-[#8390B3] font-medium mb-8">Payment details</h2>
              <div className="flex flex-col gap-6 mt-4 justify-between  md:pl-12 w-full md:w-2/3 text-[14px] md:text-[17px] font-light  text-black">
                <div className="flex justify-between gap-2">
                  <span className="text-[#333333] md:font-normal"> Bank</span>
                  <span className="font-medium"> {accountDetails.bankname}</span>
                </div>
                <div className="flex justify-between gap-2">
                  <span className="text-[#333333] md:font-normal"> Account name</span>
                  <span className="font-medium md:text-[20px]">{accountDetails.accountname}</span>
                </div>
                <div className="flex justify-between gap-2">
                  <span className="text-[#333333] md:font-normal">Account number</span>
                  <span className="font-medium">{accountDetails.accountnumber}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-col-reverse md:px-6">
            <p className="mt-6 text-[14px] md:text-[17px md:text-[16px]] font-medium text-[#333333]">
              Send exactly <strong>&#8358; {data?.total}</strong> to the account on{" "}
              <span className="text-[#8390B3]">"Payment details"</span> to pay for your order. The
              vendor will contact you shortly to confirm payment and proceed with delivery.
            </p>

            <form className="flex flex-col text-[14px] gap-6 mt-8 md:mt-2">
              <div className="flex flex-col  mb-4 w-full justify-between">
                <div className="flex items-center w-full">
                  <label className="text-[12px] md:text-[16px]">Please enter your name</label>
                </div>
                <input
                  type="text"
                  placeholder="Enter your your fullname"
                  className="mt-2  w-full h-[44px] px-4 py-3 bg-[#F1F1F1] border-b-gray-500 border"
                />
              </div>

              <div className="flex flex-col  mb-4 w-full justify-between">
                <div className="flex items-center w-full ">
                  <label className="text-[12px] md:text-[16px]">
                    Please enter your home address
                  </label>
                </div>
                <input
                  type="text"
                  placeholder="Enter your home address"
                  className="mt-2  w-full h-[44px]  px-4 py-3 bg-[#F1F1F1] border-b-gray-500 border"
                />
              </div>

              <div className="flex flex-col md:gap-0 gap-1 justify-between mt-[5px] mb-4">
                <label className="w-fit md:w-1/5 md:mt-auto text-[12px] md:text-[16px]" htmlFor="">
                  Phone no.
                </label>
                <div className="border-b border-gray-400 w-full">
                  <PhoneInput
                    international
                    placeholder="9000000000"
                    value={value}
                    onChange={setValue}
                    flags={flags}
                    defaultCountry="NG"
                    className="phone-input mr-0 bg-gray-300 md:w-full"
                  />
                </div>
              </div>
              <div className="flex flex-col  mb-4 w-full justify-between">
                <div className="flex items-center w-full">
                  <label className="text-[12px] md:text-[16px]">Email address</label>
                </div>
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="mt-2  w-full h-[44px] px-4 py-3 bg-[#F1F1F1] border-b-gray-500 border"
                />
              </div>
            </form>
          </div>
          <div className=" md:relative w-[100%] mt-8 md:mt-8 flex flex-col md:flex-row gap-y-6 items-center justify-center gap-x-6">
            <button
              onClick={handleSuccess}
              className="rounded-full bg-radial-gradient w-full md:w-1/2 text-center md:px-6 py-4 text-[16px] font-bold text-white shadow-sm"
            >
              I have sent it
            </button>
            <button className="rounded-full w-full md:w-1/2 text-center md:px-6 py-4 text-[16px] font-bold text-red border-red border-2 shadow-sm">
              Send receipt to vendor
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default OrderSummaryModal;
