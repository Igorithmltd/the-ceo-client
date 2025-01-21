import React from 'react'
import Modal from "./Modal";
import { ImCancelCircle } from "react-icons/im";
import { TfiWallet } from "react-icons/tfi";
import { GrHelp } from "react-icons/gr";
import { useModal } from "../../context/ModalContext";

const ConfirmPlaceOrder = () => {
    const { isConfirmPlaceOrderOpen, setIsConfirmPlaceOrderOpen } = useModal()
  
    const handleBackdropClick = (e) => {
      if (e.target === e.currentTarget) {
        closeModal();
      }
  
    };
    const closeModal = () => {
          setIsConfirmPlaceOrderOpen(false);
      };
  
  return (
    
    <Modal isOpen={isConfirmPlaceOrderOpen}>
      <div className="bg-white md:w-[90vw] w-full h-[90vh] rounded-lg">
        <div className="flex py-5 items-center justify-between px-8">
          <div className="flex items-center font-black">
            <h2>Send money</h2>
          </div>
          <div>
              <ImCancelCircle className="" text-gray-400 size={25} title="close" onClick={closeModal} />
          </div>
          {/* <ImCancelCircle size={25} title="close" onClick={()=> setOpen(false)} /> */}
        </div>
        <hr className="h-4 font-black" />
        <div className="flex mt-5 flex-col md:flex-col overflow-hidden h-[95%] w-full pl-[12px]">
          <section className="my-10 py-4 flex mx-auto w-[90%] justify-end">
            <button onClick={() => setIsConfirmPlaceOrderOpen(true)} className="bg-red-800 py-4 px-6 text-white rounded-[50px] flex md:gap-3">Confirm</button>
          </section>
        </div>
      </div>
    </Modal>
  )
}

export default ConfirmPlaceOrder
