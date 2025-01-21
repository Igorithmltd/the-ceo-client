import React from "react";
import { ImCancelCircle } from "react-icons/im";

const Modal = ({ isOpen, closeModal, children, persist }) => {
  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    if(persist){
      return
    }
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <div
      onClick={handleBackdropClick}
      className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50 rounded"
    >
      {/*<ImCancelCircle className="absolute top-[8%] right-[8%]" text-gray-400 size={25} title="close" onClick={closeModal} />*/}

      {children}
      {/* <div className="bg-white rounded-lg shadow-lg w-full md:w-[90vw] relative h-[90%]">
        <button
          onClick={closeModal}
          className="absolute top-0 right-0 mt-2 mr-2 text-gray-500 hover:text-gray-800 focus:outline-none"
        >
          cancel
          &times;
        </button>
        <div className="p-6">
          {children}
        </div>
      </div> */}
    </div>
  );
};

export default Modal;
