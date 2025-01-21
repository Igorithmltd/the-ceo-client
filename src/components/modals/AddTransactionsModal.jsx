import React, { useState } from "react";
import Modal from "./Modal";
import { ImCancelCircle } from "react-icons/im";
import { TfiWallet } from "react-icons/tfi";
import { GrHelp } from "react-icons/gr";
import { useModal } from "../../context/ModalContext";

const AddTransactionsModal = () => {
    const {isTransactionsOpen, setIsTransactionsOpen} = useModal()
    console.log(isTransactionsOpen,'the add Transactions')
    const handleBackdropClick = (e) => {
      if (e.target === e.currentTarget) {
        closeModal();
      }


    };
    const closeModal = () => {
          setIsTransactionsOpen(false);
      };

  return (
    <Modal isOpen={isTransactionsOpen}>
      <div className="bg-white md:w-[90vw] w-full h-[40vh] rounded-lg">
        <div className="flex py-5 items-center justify-between px-8">
          <div className="flex flex-col md:flex-row md:gap-5 items-center">
            <h2>Fund wallet</h2>
          </div>
          <ImCancelCircle size={25} title="close" onClick={()=> setIsTransactionsOpen(false)} />
        </div>
        <hr className="h-4 font-black" />
        <div className="flex mt-5 flex-col md:flex-col overflow-hidden h-[90%] w-full pl-[12px]">
          <div className="flex w-[100%] h-[20%]">
            <div className="flex flex-col justify-between items-center w-[12%]">
              <div className="rounded-full p-4 border">
                <TfiWallet size={34} />
              </div>
            </div>
            <div className="flex flex-col justify-around items-left w-[90%] h-full">
              <h4 className="font-black flex items-center gap-4">How much do you want to add?<span className="text-grey-300 rounded-full p-2 border border-grey-200"><GrHelp size={10} /></span></h4>
              <div className="relative border border-black rounded-lg w-[90%]">
                <div className="absolute top-2 left-0 flex items-center pl-3">
                  <button id="dropdownButton" className="h-full text-sm flex text-black focus:outline-none">
                    <span id="dropdownSpan">₦</span>
                  </button>
                  <div className="h-6 border-l border-black ml-2"></div>
                </div>
                <input
                  type="text"
                  className="w-full h-full pl-20 bg-transparent placeholder:text-black text-black text-sm border rounded-md px-3 py-2"
                  placeholder="Enter the amount"
                />
              </div>
            </div>
          </div>
          <section className="my-10 py-4 flex mx-auto w-[90%] justify-end">
            <button onClick={() => setIsTransactionsOpen(true)} className="bg-red-800 py-4 px-6 text-white rounded-[50px] flex md:gap-3">Continue</button>
          </section>
        </div>
      </div>
    </Modal>
  );
};

export default AddTransactionsModal;
