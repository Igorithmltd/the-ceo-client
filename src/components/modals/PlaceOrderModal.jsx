import React from 'react'
import Modal from "./Modal";
import { ImCancelCircle } from "react-icons/im";
import { useModal } from "../../context/ModalContext";

const PlaceOrderModal = () => {
    const { isPlaceOrderOpen, setIsPlaceOrderOpen } = useModal()
    const { isConfirmPlaceOrderOpen, setIsConfirmPlaceOrderOpen } = useModal();

    const handleSuccessModalOpen = () => {
        setIsPlaceOrderOpen(false);
        setIsConfirmPlaceOrderOpen(true);
    };
    const closeModal = () => {
        setIsPlaceOrderOpen(false);
    };
    return (
        <Modal isOpen={isPlaceOrderOpen} closeModal={closeModal} >
            <div className="absolute md:relative m-auto top-[25%] md:top-auto bottom-0 md:bottom-auto 
        bg-white md:w-[30vw] w-full md:max-h-[70%] overflow-x-hidden rounded-lg pt-4">
                <div className="flex py-1 items-center justify-end px-2">

                    <div>
                        <ImCancelCircle className="text-gray-400" size={25} title="close" onClick={closeModal} />
                    </div>
                </div>
                <div className="flex gap-5 mt-2 mb-5 flex-col p-5">
                    {/* <div className="py-5 flex items-center justify-between px-1  mt-4 md:px-12"> */}
                        <button
                            className="text-white py-2 md:py-4 px-4 md:px-16 bg-red border-red border-[2px] 
                          rounded-[50px] flex justify-center font-bold md:gap-3"
                            onClick={handleSuccessModalOpen}
                        >
                            Purchase here
                        </button>
                        <button className="text-red py-2 md:py-4 px-4 md:px-8 border-red border-[2px] mb-3 rounded-[50px] flex justify-center font-bold md:gap-3">Contact Vendor</button>

                    {/* </div> */}
                </div>
            </div>
        </Modal>
    )
}

export default PlaceOrderModal
