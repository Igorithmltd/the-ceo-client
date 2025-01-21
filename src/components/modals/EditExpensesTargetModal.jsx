import React, { useState } from "react";
import Modal from "./Modal";
import { ImCancelCircle } from "react-icons/im";
import { useModal } from "../../context/ModalContext";
import { BsCashCoin } from "react-icons/bs";
import { FiPlus } from "react-icons/fi";
import SelectInput from "../dashboard/SelectInput";
import TextInput from "../dashboard/TextInput";
import successImage from "/images/target-success.png";
import SuccessModal from "./SuccessModal";

const EditExpensesTargetModal = () => {
  const { isExpensesTargetOpen, setIsExpensesTargetOpen, setIsSuccessOpen } = useModal();
  const { isSuccessSalesOpen, setIsSuccessSalesOpen } = useModal();

  const [targetTime, setTargetTime] = useState("");
  const [milestone, setMilestone] = useState("");
  const [amount, setAmount] = useState(null);

  const handleSuccessModalOpen = () => {
    setIsExpensesTargetOpen(false);
    setIsSuccessSalesOpen(true);
  };
  const closeModal = () => {
    setIsExpensesTargetOpen(false);
  };

  return (
    <Modal isOpen={isExpensesTargetOpen} closeModal={closeModal}>
      <div
        className="absolute md:relative m-auto top-[25%] md:top-auto bottom-0 md:bottom-auto 
              bg-white md:w-[70vw] lg:w-[50vw] w-full md:max-h-[90%] overflow-y-scroll rounded-[16px] pt-4"
      >
        <div className="flex py-5 items-center justify-between px-8 border-b border-gray-400">
          <div className="flex justify-between">
            <h2 className="text-[15px] md:text-[17px] font-bold">Add expense target</h2>
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
              labelIcon={BsCashCoin}
              onChange={(e) => setTargetTime(e.target.value)}
              options={[
                { value: "yearly", label: "Yearly target (12 months)" },
                { value: "quarterly", label: "Quarterly target" },
              ]}
            />

            <SelectInput
              label="How many mildstones do you want your target to have?"
              id="milestone"
              value={milestone}
              labelIcon={BsCashCoin}
              onChange={(e) => setMilestone(e.target.value)}
              options={[
                { value: "1", label: "1" },
                { value: "2", label: "2" },
                { value: "3", label: "3" },
                { value: "4", label: "4" },
                { value: "5", label: "5" },
              ]}
            />

            <TextInput
              label="How much is your target?"
              id="amount"
              placeholder="Enter an amount"
              type="number"
              value={amount}
              labelIcon={BsCashCoin}
              isCash
              isLast
              onChange={(e) => setAmount(e.target.value)}
              onClear={() => setAmount("")}
            />

            <div className="py-5 flex items-center justify-end px-1  mt-4">
              <div className="flex gap-6 items-center justify-between w-full md:w-auto px-1">
                <button className="text-red text-[12px] md:text-[16px] py-5 px-8 border-red border-[2px] rounded-[50px] flex text-center font-bold md:gap-3">
                  <span className="flex items-center text-center" onClick={closeModal}>
                    Cancel
                  </span>
                </button>
                <button
                  className="flex gap-2 text-white text-[12px] md:text-[16px] py-5 px-8 bg-radial-gradient rounded-[50px] justify-center items-center font-bold md:gap-3"
                  onClick={() => setIsSuccessOpen(true)}
                >
                  <FiPlus /> <span className="">Add</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <SuccessModal title="Your target have been successfully added!" image={successImage} />
      </div>
    </Modal>
  );
};

export default EditExpensesTargetModal;
