import React, { useState } from "react";
import Modal from "./Modal";
import { ImCancelCircle } from "react-icons/im";
import { useModal } from "../../context/ModalContext";
import SelectInput from "../dashboard/SelectInput";
import TextInput from "../dashboard/TextInput";
import { TbSend } from "react-icons/tb";

const AddMoneyModal = () => {
  const { isAddMoneyOpen, setIsAddMoneyOpen, setIsConfirmTransferOpen } = useModal();

  const [bank, setBank] = useState("");
  const [description, setDescription] = useState("");
  const [usage, setUsage] = useState("");
  const [accountNumber, setAccountNumber] = useState();
  const [amount, setAmount] = useState();

  // console.log(isAddMoneyOpen,'the add money')

  // const handleBackdropClick = (e) => {
  //   if (e.target === e.currentTarget) {
  //     closeModal();
  //   }

  // };
  const closeModal = () => {
    setIsAddMoneyOpen(false);
  };

  return (
    <Modal isOpen={isAddMoneyOpen} closeModal={closeModal}>
      <div className="absolute md:relative m-auto top-[25%] md:top-auto bottom-0 md:bottom-auto bg-white md:w-[70vw] lg:w-[50vw] w-full md:max-h-[90%] overflow-y-scroll rounded-[16px] pt-4">
        <div className="flex py-5 items-center justify-between px-8 border-b border-gray-400">
          <div className="flex justify-between">
            <h2 className="text-[15px] md:text-[17px] font-bold">Send money</h2>
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
              label="Bank"
              id="bank"
              value={bank}
              labelIcon={TbSend}
              onChange={(e) => setBank(e.target.value)}
              options={[
                { value: "First", label: "First" },
                { value: "First", label: "First" },
                { value: "First", label: "First" },
              ]}
            />

            <TextInput
              label="Recipient account number"
              id="accountNumber"
              placeholder="Enter acount number"
              type="number"
              value={accountNumber}
              labelIcon={TbSend}
              onChange={(e) => setAccountNumber(e.target.value)}
            />

            <TextInput
              label="Amount"
              id="amount"
              placeholder="Enter amount"
              type="number"
              isCash
              value={amount}
              labelIcon={TbSend}
              onChange={(e) => setAmount(e.target.value)}
              onClear={() => setAmount("")}
            />

            <TextInput
              label="Description"
              id="description"
              placeholder="Enter description"
              value={description}
              labelIcon={TbSend}
              onChange={(e) => setDescription(e.target.value)}
            />

            <TextInput
              label="What are you spending this money for?"
              id="usage"
              placeholder="Enter what you want to use the money for"
              value={usage}
              labelIcon={TbSend}
              isLast
              onChange={(e) => setUsage(e.target.value)}
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
                  onClick={() => {
                    closeModal();
                    setIsConfirmTransferOpen(true);
                  }}
                >
                  <span className="">Confirm</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default AddMoneyModal;
