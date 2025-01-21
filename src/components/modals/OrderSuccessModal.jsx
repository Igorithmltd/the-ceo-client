import React from "react";
import Modal from "./Modal";
import { useModal } from "../../context/ModalContext";
import { useNavigate } from "react-router-dom";
import { ImCancelCircle } from "react-icons/im";

const OrderSuccessModal = () => {
  const navigate = useNavigate();
  const { isOrderSuccessOpen, setIsOrderSuccessOpen,  } = useModal();

  const companyName = localStorage.getItem("companyName");

  const closeModal = () => {
    setIsOrderSuccessOpen(false);
    navigate(`/S/${companyName}`);
  };

  return (
    <Modal isOpen={isOrderSuccessOpen} closeModal={closeModal}>
      <div className="relative bg-white w-[90vw] md:w-[600px] max-h-[70%] p-10 rounded-lg">
        <div className="flex flex-col items-center">
          <h2 className="font-bold text-[14px] md:text-[17px] text-center">Order Confirmation</h2>
          <img src="/images/check2-circle.png" className="my-10 size-[100px] md:size-[127px]" alt="" />
        </div>
        <div className="absolute right-4 top-2 md:top-4 cursor-pointer text-grey-40 text-[16px] md:text-[24px]">
          <ImCancelCircle title="close" onClick={closeModal} />
        </div>
        <div className="space-y-8 text-center text-[14px] md:text-[17px] text-[#666666]  mb-10">
          <p>Thank you for your patronage!</p>
          <p>The vendor will contact you shortly to confirm payment and proceed with delivery.</p>
        </div>
        <div className="  w-[100%] flex flex-col md:flex-row gap-6 items-center justify-center ">
          <button className="rounded-full bg-radial-gradient w-full px-4 text-center py-4 text-[16px] font-bold text-white shadow-sm">
            Chat with vendor
          </button>
          <button
            onClick={closeModal}
            className="rounded-full w-full text-center py-4  px-4 text-[16px] font-bold text-red border-red border-2 shadow-sm"
          >
            Okay
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default OrderSuccessModal;
