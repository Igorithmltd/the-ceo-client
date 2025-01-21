import React, { useState } from "react";
import Modal from "./Modal";
import { ImCancelCircle } from "react-icons/im";
import { useModal } from "../../context/ModalContext";
import TextInput from "../dashboard/TextInput";
import SelectInput from "../dashboard/SelectInput";
import SuccessModal from "./SuccessModal";
import successImage from "/images/expenses-success.png";

const EditExpensesModal = () => {
  const { isEditExpensesOpen, setIsEditExpensesOpen, setIsSuccessOpen } = useModal();
  const { isSuccessExpensesOpen, setIsSuccessExpensesOpen } = useModal();

  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState(null);

  const handleSuccessModalOpen = () => {
    setIsEditExpensesOpen(false);
    setIsSuccessExpensesOpen(true);
  };
  const closeModal = () => {
    setIsEditExpensesOpen(false);
  };

  return (
    <Modal isOpen={isEditExpensesOpen} closeModal={closeModal}>
      <div
        className="absolute md:relative m-auto top-[25%] md:top-auto bottom-0 md:bottom-auto 
                    bg-white md:w-[70vw] lg:w-[50vw] w-full md:max-h-[90%] overflow-y-scroll rounded-[16px] pt-4"
      >
        <div className="flex py-5 items-center justify-between px-8 border-b border-gray-400">
          <div className="flex justify-between">
            <h2 className="text-[15px] md:text-[17px] font-bold">Edit expenses</h2>
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
              label="Select expense category"
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              options={[
                { value: "office supplies", label: "Office Supplies" },
                { value: "loan", label: "Loan" },
              ]}
            />

            <TextInput
              label="Edit total expenses"
              id="amount"
              placeholder="Enter an amount"
              type="number"
              value={amount}
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
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>

        <SuccessModal title="Your expense have been successfully added!" image={successImage} />
      </div>
    </Modal>
  );
};

export default EditExpensesModal;
