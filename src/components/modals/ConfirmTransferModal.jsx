import React from "react";
import Modal from "./Modal";
import { ImCancelCircle } from "react-icons/im";
import { useModal } from "../../context/ModalContext";
import successImage from "/images/send-success.png";
import SuccessModal from "./SuccessModal";
import ValueField from "../dashboard/ValueField";
import { TbSend } from "react-icons/tb";
import ConfirmationModal from "./ConfirmationModal";

const ConfirmTransferModal = () => {
  const {
    isConfirmTransferOpen,
    setIsConfirmTransferOpen,
    setIsConfirmationOpen,
    setIsSuccessOpen,
    setIsAddMoneyOpen,
  } = useModal();

  const closeModal = () => {
    setIsConfirmTransferOpen(false);
  };

  return (
    <Modal isOpen={isConfirmTransferOpen} closeModal={closeModal}>
      <div className="absolute md:relative m-auto bottom-0 md:bottom-auto bg-white md:w-[70vw] lg:w-[50vw] w-full md:max-h-[90%] overflow-y-scroll rounded-[16px] pt-4">
        <div className="flex py-5 items-center justify-between px-8 border-b border-gray-400">
          <div className="flex justify-between">
            <h2 className="text-[15px] md:text-[17px] font-bold">Confirm your transfer</h2>
          </div>

          <div>
            <ImCancelCircle
              className="size-[16px] md:size-[24px] text-grey-40 cursor-pointer"
              title="close"
              onClick={closeModal}
            />
          </div>
        </div>

        <div className="flex gap-5 mt-5 flex-col md:flex-row">
          <div className="flex-1 px-6 text-gray-500 md:h-full overflow-auto text-xs">
            <ValueField label="Bank" value="Zenith Bank" labelIcon={TbSend} />
            <ValueField
              label="Recipient Account Number"
              value={
                <p className="flex justify-between">
                  {" "}
                  <span>22701 65474</span>{" "}
                  <span className="text-[#45598D]">Onyeka Joel Mgbikeh</span>
                </p>
              }
              labelIcon={TbSend}
            />
            <ValueField label="Amount" value="₦20,000" labelIcon={TbSend} />
            <ValueField
              label="What are you sending this money for?"
              value="Office Supplies"
              labelIcon={TbSend}
            />
            <ValueField
              label="Description"
              value="Money for the Table, Chair and Lampstand"
              labelIcon={TbSend}
              isLast
            />
            <div className="flex gap-6 items-center justify-end w-full md:w-auto px-1 my-4">
              <button className="text-red text-[12px] md:text-[16px] py-5 px-8 border-red border-[2px] rounded-[50px] flex text-center font-bold md:gap-3">
                <span
                  className="flex items-center text-center"
                  onClick={() => {
                    closeModal();
                    setIsAddMoneyOpen(true);
                  }}
                >
                  Back
                </span>
              </button>
              <button
                className="flex gap-2 text-white text-[12px] md:text-[16px] py-5 px-8 bg-radial-gradient rounded-[50px] justify-center items-center font-bold md:gap-3"
                onClick={() => setIsConfirmationOpen(true)}
              >
                <span className="">Send money</span>
              </button>
            </div>
          </div>
        </div>

        <ConfirmationModal
          title="Saving confrimation"
          subTitle="Please enter your password to confirm saving"
          action="Confirm and add"
          actionHandler={() => {
            setIsConfirmationOpen(false);
            setIsSuccessOpen(true);
          }}
        />
        <SuccessModal title="Your money have been successfully sent!" image={successImage} />
      </div>
    </Modal>
  );
};

export default ConfirmTransferModal;
