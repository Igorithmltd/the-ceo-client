import React, { useState } from "react";
import Modal from "./Modal";
import { ImCancelCircle } from "react-icons/im";
import { useModal } from "../../context/ModalContext";

const ConfirmationModal = ({ title, subTitle, action, actionHandler }) => {
  const { isConfirmationOpen, setIsConfirmationOpen } = useModal();

  const [password, setPassword] = useState("");

  const closeModal = () => {
    setIsConfirmationOpen(false);
  };

  return (
    <Modal isOpen={isConfirmationOpen} closeModal={closeModal}>
      <div className="absolute md:relative m-auto top-[25%] md:top-auto bottom-0 md:bottom-auto bg-white md:w-[50vw] w-[70vw] lg:w-[30vw] h-[30%]  md:h-auto rounded-[16px] pt-4 text-center">
        <div className="flex items-center justify-end px-8 ">
          <ImCancelCircle
            className="size-[16px] md:size-[24px] text-grey-40 cursor-pointer"
            title="close"
            onClick={closeModal}
          />
        </div>
        <h2 className="text-[15px] md:text-[17px] font-bold">{title}</h2>

        <p className="text-[13px] md:text-[15px] mt-4">{subTitle}</p>

        <input
          type="text"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          className="border-[#898989] border-2 rounded-[8px] py-2 ps-4 h-[42px] w-[80%] my-6 text-[14px] md:text-[16px]"
        />

        <button
          className="flex gap-2 text-white text-[12px] w-[70%] mx-auto mb-8 md:text-[16px] py-5 px-8 bg-radial-gradient rounded-[50px] justify-center items-center font-bold md:gap-3"
          onClick={actionHandler}
        >
          <span className="">{action}</span>
        </button>
      </div>
    </Modal>
  );
};

export default ConfirmationModal;
