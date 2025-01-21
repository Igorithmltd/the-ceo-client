import React, { useState, useEffect } from "react";
import Modal from "./Modal";
import { ImCancelCircle } from "react-icons/im";
import { CiCircleQuestion } from "react-icons/ci";
import { useModal } from "../../context/ModalContext";
import { LiaCoinsSolid } from "react-icons/lia";
import { TfiAngleDown } from "react-icons/tfi";
import { FiPlus } from "react-icons/fi";
import SuccessExpensesModal from "../../components/modals/SuccessExpensesModal";
import ApiSetup from "../../utils/ApiSetup";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-hot-toast";
import { Icon } from "@iconify-icon/react";
import SelectInput from "../dashboard/SelectInput";
import TextInput from "../dashboard/TextInput";

const AddNewBankModal = ({data}) => {
  const api = ApiSetup();
  const { userInfo } = useAuth();
  const { isAddNewBank, setIsAddNewBank } = useModal();
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


  async function getExpensesCategories() {
    const res = await api.post("fetchinappaccount");
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
        setIsAddNewBank(false);
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
    setIsAddNewBank(false);
  };

  return (
    <Modal isOpen={isAddNewBank} closeModal={closeModal}>
      <div className="absolute md:relative m-auto top-[25%] md:top-auto bottom-0 md:bottom-auto bg-white md:w-[70vw] lg:w-[50vw] w-full md:max-h-[90%] overflow-y-scroll rounded-[16px] pt-4">
        <div className="flex py-5 items-center justify-between px-8 border-b border-gray-400">
          <div className="flex justify-between">
            <h2 className="text-[15px] md:text-[17px] font-bold">Get a new bank</h2>
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
          <TextInput
              label="Currency"
              id="description"
              placeholder="Nigerian Naira (#)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <SelectInput
              label="Bank"
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

            <div className="py-5 flex items-center justify-end px-1  mt-4">
              <div className="flex gap-6 items-center justify-between w-full md:w-auto px-1">
                <button
                  className="flex gap-2 text-white text-[12px] md:text-[16px] py-5 px-8 bg-radial-gradient rounded-[50px] justify-center items-center font-bold md:gap-3"
                  //   onClick={handleSumbmit}
                >
                  {/* <FiPlus /> */}
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

export default AddNewBankModal;
