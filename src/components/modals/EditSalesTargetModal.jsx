import React, { useState } from "react";
import Modal from "./Modal";
import { ImCancelCircle } from "react-icons/im";
import { useModal } from "../../context/ModalContext";
import { FiPlus } from "react-icons/fi";
import SuccessSalesModal from "../../components/modals/SuccessSalesModal";
import ApiSetup from "../../utils/ApiSetup";
import { useAuth } from "../../context/AuthContext";
import SelectInput from "../dashboard/SelectInput";
import TextInput from "../dashboard/TextInput";
import { TbTargetArrow } from "react-icons/tb";

const EditSalesTargetModal = () => {
  const { isSalesTargetOpen, setIsSalesTargetOpen } = useModal();
  const { isSuccessSalesOpen, setIsSuccessSalesOpen } = useModal();

  const api = ApiSetup();
  const { userInfo } = useAuth();
  const { setAppLoading } = useModal();

  const [targetType, setTargetType] = useState("");
  const [targetTime, setTargetTime] = useState("");
  const [amount, setAmount] = useState();

  const handleSumbmit = async () => {
    try {
      if (userInfo?.masked_id) {
        setIsSalesTargetOpen(false);
        setAppLoading(true);
        const formData = new FormData();
        formData.append("user_id", userInfo?.masked_id);
        formData.append("target_type", targetType);
        formData.append("target_time", targetTime);
        formData.append("amount", amount);

        for (let [key, value] of formData.entries()) {
          console.log(`${key}:`, value);
        }
        const data = {
          user_id: userInfo?.masked_id,
          target_type: "sales",
          target_time: "1",
          amount: amount,
        };

        // const res = await api.postFormData("addtarget", formData);
        const res = await api.post("addtarget", data);
        console.log(res.data);
        // setIsSuccessSalesOpen(true);
      }
    } catch (error) {
      setAppLoading(false);
      console.log(error);
    }
  };

  const handleSuccessModalOpen = () => {
    setIsSalesTargetOpen(false);
    setIsSuccessSalesOpen(true);
  };
  const closeModal = () => {
    setIsSalesTargetOpen(false);
  };

  return (
    <Modal isOpen={isSalesTargetOpen} closeModal={closeModal}>
      <div
        className="absolute md:relative m-auto top-[25%] md:top-auto bottom-0 md:bottom-auto 
        bg-white md:w-[70vw] lg:w-[50vw] w-full md:max-h-[90%] overflow-y-scroll rounded-[16px] pt-4"
      >
        <div className="flex py-5 items-center justify-between px-8 border-b border-gray-400">
          <div className="flex justify-between">
            <h2 className="text-[15px] md:text-[17px] font-bold">Add a sales target</h2>
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
              label="Target type"
              id="targetType"
              value={targetType}
              labelIcon={TbTargetArrow}
              onChange={(e) => setTargetType(e.target.value)}
              options={[
                { value: "sales", label: "Sales" },
                { value: "savings", label: "Savings" },
                { value: "expenses", label: "Expenses" },
              ]}
            />

            <SelectInput
              label="Select a target time"
              id="targetTime"
              value={targetTime}
              labelIcon={TbTargetArrow}
              onChange={(e) => setTargetTime(e.target.value)}
              options={[
                { value: "1", label: "1 year" },
              ]}
            />
            <TextInput
              label="How much is your target?"
              id="amount"
              placeholder="Enter an amount"
              type="number"
              value={amount}
              labelIcon={TbTargetArrow}
              isCash
              isLast
              onChange={(e) => setAmount(e.target.value)}
              onClear={(e) => setAmount("")}
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
                  onClick={handleSumbmit}
                >
                  <FiPlus /> <span className="">Add</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default EditSalesTargetModal;
