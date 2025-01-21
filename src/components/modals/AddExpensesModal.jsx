import React, { useState, useEffect } from "react";
import Modal from "./Modal";
import { ImCancelCircle } from "react-icons/im";
import { useModal } from "../../context/ModalContext";
import { FiPlus } from "react-icons/fi";
import ApiSetup from "../../utils/ApiSetup";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-hot-toast";
import SelectInput from "../dashboard/SelectInput";
import TextInput from "../dashboard/TextInput";
import SuccessModal from "./SuccessModal";
import successImage from "/images/expenses-pending.png";

const AddExpensesModal = () => {
  const api = ApiSetup();
  const { userInfo } = useAuth();
  const { isExpensesOpen, setIsExpensesOpen, setIsSuccessExpensesOpen, setIsSuccessOpen } =
    useModal();
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState();
  const [amount, setAmount] = useState();
  const [description, setDescription] = useState("");

  // const handleBackdropClick = (e) => {
  //     if (e.target === e.currentTarget) {
  //       closeModal();getexpensescategory
  //     }
  //   };
  useEffect(() => {
    if (userInfo?.masked_id) {
      getExpensesCategories();
    }
  }, []);

  console.log(userInfo);

  async function getExpensesCategories() {
    const res = await api.post("getexpensescategory");
    setCategories(res?.data?.expensescategory);
    console.log(categories, "the categories");
  }
  const handleSuccessModalOpen = async () => {
    try {
      const formData = new FormData();
      const data = {
        user_id: userInfo?.masked_id,
        addedby: userInfo?.agentfullname,
        addedby_id: userInfo?.agentid,
        category: category,
        description: description,
        amount: amount,
      };
      //   formData.append('user_id', userInfo.masked_id)
      //   formData.append('addedby', username)
      //   formData.append('addedby_id', +userInfo.u_id)
      //   formData.append('amount', +amount)
      //   formData.append('description', description)
      //   formData.append('category', category)
      console.log(data);

      const res = await api.post("addexpenses", data);
      if (res?.data?.message == "success") {
        setIsExpensesOpen(false);
        setIsSuccessExpensesOpen(true);
      } else {
        return toast.error("Something went wrong. Please try again later");
      }
      setDescription("");
      setAmount("");
      setCategory("");
    } catch (error) {
      console.log(error, "the error");
    }
  };
  const closeModal = () => {
    setIsExpensesOpen(false);
  };

  return (
    <Modal isOpen={isExpensesOpen} closeModal={closeModal}>
      <div className="absolute md:relative m-auto top-[25%] md:top-auto bottom-0 md:bottom-auto bg-white md:w-[70vw] lg:w-[50vw] w-full md:max-h-[90%] overflow-y-scroll rounded-[16px] pt-4">
        <div className="flex py-5 items-center justify-between px-8 border-b border-gray-400">
          <div className="flex justify-between">
            <h2 className="text-[15px] md:text-[17px] font-bold">Add an expense</h2>
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
              label="What category did you spend on?"
              id="categories"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              options={
                Array.isArray(categories)
                  ? categories.map((cat) => ({
                      key: cat.id,
                      value: cat.name,
                      label: cat.name,
                    }))
                  : []
              }
            />

            <TextInput
              label="How much did you spend?"
              id="amount"
              placeholder="Enter an amount"
              type="number"
              value={amount}
              isCash
              onChange={(e) => setAmount(e.target.value)}
              onClear={() => setAmount("")}
            />

            <TextInput
              label="Description"
              id="description"
              placeholder="Enter description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <TextInput
              label="Bank name"
              id="bank_name"
              placeholder="Enter bank name"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <TextInput
              label="Bank account number"
              id="account_number"
              placeholder="Enter bank account number"
              value={description}
              type="number"
              isLast
              onChange={(e) => setDescription(e.target.value)}
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
                  <FiPlus /> <span className="">Request to add</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <SuccessModal
          title="Your expense request have been sent and awaiting approval"
          image={successImage}
        />
      </div>
    </Modal>
  );
};

export default AddExpensesModal;
