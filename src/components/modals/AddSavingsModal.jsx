import React, { useState } from "react";
import Modal from "./Modal";
import { ImCancelCircle } from "react-icons/im";
import { useModal } from "../../context/ModalContext";
import SelectInput from "../dashboard/SelectInput";
import TextInput from "../dashboard/TextInput";
import { MdOutlineSavings } from "react-icons/md";
import { FaPlus } from "react-icons/fa6";
import ConfirmationModal from "./ConfirmationModal";
import SuccessModal from "./SuccessModal";
import successImage from "/images/save-success.png";

const AddSavingsModal = () => {
  const {
    isAddSavingsOpen,
    setIsAddSavingsOpen,
    setIsConfirmationOpen,
    setIsSuccessOpen,
    
  } = useModal();

  const [targetTime, setTargetTime] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState();

  const closeModal = () => {
    setIsAddSavingsOpen(false);
  };

  return (
    <Modal isOpen={isAddSavingsOpen} closeModal={closeModal}>
      <div className="absolute md:relative m-auto top-auto bottom-0 md:bottom-auto bg-white md:w-[70vw] lg:w-[50vw] w-full md:max-h-[90%] overflow-y-scroll rounded-[16px] pt-4">
        <div className="flex py-5 items-center justify-between px-8 border-b border-gray-400">
          <div className="flex justify-between">
            <h2 className="text-[15px] md:text-[17px] font-bold">Add to savings</h2>
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
            <SelectInput
              label="Select a target time"
              id="targetTime"
              value={targetTime}
              labelIcon={MdOutlineSavings}
              onChange={(e) => setTargetTime(e.target.value)}
              options={[
                { value: "6 months", label: "6 months" },
                { value: "12 months", label: "12 months" },
                { value: "24 months", label: "24 months" },
              ]}
            />

            <TextInput
              label="Description (What are you saving for?)"
              id="description"
              placeholder="Add description (Optional)"
              value={description}
              labelIcon={MdOutlineSavings}
              onChange={(e) => setDescription(e.target.value)}
            />

            <TextInput
              label="Amount"
              id="amount"
              placeholder="Enter an amount"
              type="number"
              isCash
              isLast
              value={amount}
              labelIcon={MdOutlineSavings}
              onChange={(e) => setAmount(e.target.value)}
              onClear={() => setAmount("")}
            />

            <div className="py-5 flex flex-col gap-8 md:flex-row items-center justify-between px-1  mt-4">
              <h2 className="text-[15px] md:text-[17px] text-black">
                Wallet balance: <span className="font-bold">N12,000,000</span>
              </h2>
              <div className="flex gap-6 items-center justify-between w-full md:w-auto px-1">
                <button className="text-red text-[12px] md:text-[16px] py-5 px-8 border-red border-[2px] rounded-[50px] flex text-center font-bold md:gap-3">
                  <span className="flex items-center text-center" onClick={closeModal}>
                    Cancel
                  </span>
                </button>
                <button
                  className="flex gap-2 text-white text-[12px] md:text-[16px] py-5 px-8 bg-radial-gradient rounded-[50px] justify-center items-center font-bold md:gap-3"
                  onClick={() => setIsConfirmationOpen(true)}
                >
                  <FaPlus />
                  <span className="">Add</span>
                </button>
              </div>
            </div>
          </div>
        </div>
        <ConfirmationModal
          title="Saving confirmation"
          subTitle="Please enter your password to confirm saving"
          action="Confirm and add"
          actionHandler={() => {
            setIsConfirmationOpen(false);
            setIsSuccessOpen(true);
          }}
        />

        <SuccessModal title="Your savings have been added. Good one!" image={successImage} />
      </div>
    </Modal>
  );
};

export default AddSavingsModal;
