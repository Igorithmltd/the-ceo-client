import React from "react";
import Modal from "./Modal";
import { useModal } from "../../context/ModalContext";

const SuccessModal = ({ title, image }) => {
  const { isSuccessOpen, setIsSuccessOpen } = useModal();

  const closeModal = () => {
    setIsSuccessOpen(false);
  };

  return (
    <Modal isOpen={isSuccessOpen} closeModal={closeModal}>
      <div className="absolute md:relative m-auto top-[25%] md:top-auto bottom-0 md:bottom-auto bg-white md:w-[50vw] w-[80vw] lg:w-[30vw] h-[35%]  md:h-auto rounded-[16px] pt-4 text-center">
        <h2 className="text-[15px] md:text-[17px] font-bold my-4">{title}</h2>

        <img src={image} alt="success image" className="mx-auto my-8" />

        <button
          className="flex gap-2 text-white text-[12px] w-[70%] mx-auto mb-8 md:text-[16px] py-5 px-8 bg-radial-gradient rounded-[50px] justify-center items-center font-bold md:gap-3"
          onClick={closeModal}
        >
          <span className="">Okay</span>
        </button>
      </div>
    </Modal>
  );
};

export default SuccessModal;
