import React from "react";
import Modal from "./Modal";
import { ImCancelCircle } from "react-icons/im";
import { useModal } from "../../context/ModalContext";

const OrderMethod = () => {
  const { isOrderMethodOpen, setIsOrderMethodOpen, setIsOrderSummaryOpen } = useModal();

  const closeModal = () => {
    setIsOrderMethodOpen(false);
  };

  const handleOpenSummary = () => {
    setIsOrderMethodOpen(false);
    setIsOrderSummaryOpen(true);
  };

  return (
    <Modal isOpen={isOrderMethodOpen} closeModal={closeModal}>
      <div className="relative bg-white  rounded-lg p-12">
        <div className="absolute right-4 top-2 md:top-4 cursor-pointer text-grey-40 text-[16px] md:text-[24px]">
          <ImCancelCircle title="close" onClick={closeModal} />
        </div>
        <div className="  w-[100%] flex flex-col gap-y-6 items-center justify-center ">
          <button
            onClick={handleOpenSummary}
            className="rounded-full bg-radial-gradient w-full px-4 text-center py-4 text-[16px] font-bold text-white shadow-sm"
          >
            Purchase here
          </button>
          <button className="rounded-full w-full text-center py-4  px-4 text-[16px] font-bold text-red border-red border-2 shadow-sm">
            Contact vendor on Whatsapp
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default OrderMethod;
