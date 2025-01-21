/* eslint-disable react/no-unescaped-entities */
import React, { useState } from "react";
import Modal from "./Modal";
import { ImCancelCircle } from "react-icons/im";
import { CiCircleQuestion } from "react-icons/ci";
import { useModal } from "../../context/ModalContext";
import { LiaCoinsSolid } from "react-icons/lia";
import { TfiAngleDown } from "react-icons/tfi";
import SuccessSalesModal from "../../components/modals/SuccessSalesModal";
import ApiSetup from "../../utils/ApiSetup";
import { useAuth } from "../../context/AuthContext";

const AddSalesModal = () => {
  const { isSalesOpen, setIsSalesOpen } = useModal();
  const { isSuccessSalesOpen, setIsSuccessSalesOpen } = useModal();
  const api = ApiSetup();
  const { userInfo } = useAuth();
  const { setAppLoading } = useModal();

  // const [design, setServiceName] = useState("");
  // const [duration, setDuration] = useState("");
  // const [amount, setAmount] = useState("");
  // const [serviceDescription, setServiceDescription] = useState("");
  // const [pricingType, setPricingType] = useState("");
  // const [milestone, setMilestone] = useState("");
  // const [milestone1, setMilestone1] = useState("");
  // const [milestone2, setMilestone2] = useState("");
  // const [milestone0, setMilestone0] = useState("");
  // const [serviceFiles, setServiceFiles] = useState([]);
  // const [allProducts, setAllProducts] = useState([]);
  
  // const handleSumbmit = async () => {
  //   try {
  //     if (userInfo?.masked_id) {
  //       setIsServiceOpen(false);
  //       setAppLoading(true);
  //       const formData = new FormData();
  //       formData.append("user_id", userInfo?.masked_id);
  //       formData.append("design", "design 1");
  //       formData.append("serviceDescription", "serviceDescription");
  //       formData.append("servicename", design);
  //       formData.append("pricingtype", pricingType);
  //       formData.append("amount", amount);
  //       formData.append("duration", duration);
  //       formData.append("milestone", milestone);
  //       formData.append("milestone1", milestone1);
  //       formData.append("milestone2", milestone2);
  //       formData.append("milestone0", milestone0);

  //       let fileLength = Array.from(serviceFiles).length;
  //       for (let i = 0; i < fileLength; i++) {
  //         formData.append("file" + i, serviceFiles[i]);
  //       }

  //       for (let pair of formData.entries()) {
  //         console.log(pair[0] + ": " + pair[1]);
  //       }
  //       const res = await api.postFormData("uploadservices", formData);
  //       setAppLoading(false);
  //       const totalrev = res.data["uploadservices"];
  //       console.log(res, "the result");
  //     }
  //   } catch (error) {
  //     setAppLoading(false);
  //     console.log(error);
  //   }
  // };

  const handleSuccessModalOpen = async () => {
    setIsSalesOpen(false);
    const reqData = {
      user_id: userInfo?.masked_id,
      pivotedate: 1,
      design: "expandable",
      addedby: userInfo?.agentfullname,
      agentid: userInfo?.u_id,
      total: 540,
      advance: 100,
      amountinword: "",
      balance: 440,
      caddress: "ekwueme",
      cemail: "c@gmail.com",
      cid: "",
      cname: "c name",
      cphone: "08112348248",
      date: "2024-10-7",
      receipt_type: "product",
      registereduser: 'yes',
      addedProduct: [
        {
          id: 0,
          productId: 66,
          productname: 'Frie',
          quantity: 10,
          unitprice: 54,
          costprice: 44,
          amount: 540
        },
      ],
    };

    try {
      await api.post("receiptdata", reqData);
      // setIsSuccessSalesOpen(true);
    } catch (error) {
      console.log(error, "the sales error");
    }
  };
  const closeModal = () => {
    setIsSalesOpen(false);
  };

  return (
    <Modal isOpen={isSalesOpen} closeModal={closeModal}>
      <div
        className="absolute md:relative m-auto top-[25%] md:top-auto bottom-0 md:bottom-auto 
        bg-white md:w-[70vw] w-full md:max-h-[70%] overflow-y-scroll rounded pt-4"
      >
        <div className="flex py-5 items-center justify-between px-8 border-b border-gray-400">
          <div className="flex justify-between">
            <h2>Add new Sales</h2>
          </div>

          <div>
            <ImCancelCircle
              className=""
              text-gray-400
              size={25}
              title="close"
              onClick={closeModal}
            />
          </div>
        </div>
        <div className="flex gap-5 mt-5 flex-col md:flex-row">
          <div className="flex-1 px-6 text-gray-500 md:h-full overflow-auto text-xs">
            <div className="flex flex-col px-1">
              <label className="flex gap-4 items-center">
                <div className="flex border-gray-400 rounded-full border p-2">
                  <LiaCoinsSolid size={20} />
                </div>
                <div className="flex gap-2">
                  <span className="text-center">
                    Did you sell a product or a service
                  </span>
                  <CiCircleQuestion className="text-top" size={15} />
                </div>
              </label>
              <div className="flex gap-4">
                {/*<div className="mx-auto w-1 border-gray-400 h-full">*/}
                <span className="w-[1px] h-[-1] bg-gray-400 rounded mx-5"></span>
                {/*</div>*/}
                <div className="flex items-center relative w-full px-4 border-gray-400 border rounded outline-none mb-6 md:mb-10">
                  <select
                    id="countries"
                    className="flex-1 appearance-none py-2 w-full
                              leading-tight focus:outline-none focus:shadow-outline"
                  >
                    <option selected>--</option>
                    <option value="US">A product</option>
                    <option value="CA">A service</option>
                  </select>
                  <TfiAngleDown size={15} />
                </div>
              </div>
            </div>
            <div className="flex flex-col px-1">
              <label className="flex gap-4 items-center">
                <div className="flex border-gray-400 rounded-full border p-2">
                  <LiaCoinsSolid size={20} />
                </div>
                <div className="flex gap-2">
                  <span className="text-center">
                    Select the product you sold
                  </span>
                  <CiCircleQuestion className="text-top" size={15} />
                </div>
              </label>
              <div className="flex gap-4">
                {/*<div className="mx-auto w-1 border-gray-400 h-full">*/}
                <span className="w-[1px] h-[-1] bg-gray-400 rounded mx-5"></span>
                {/*</div>*/}
                <div className="flex items-center relative w-full px-4 border-gray-400 border rounded outline-none mb-6 md:mb-10">
                  <select
                    id="countries"
                    className="flex-1 appearance-none py-2 w-full
                              leading-tight focus:outline-none focus:shadow-outline"
                  >
                    <option selected>--</option>
                    <option value="US">Oil</option>
                    <option value="CA">Bread</option>
                    <option value="FR">Fish</option>
                    <option value="DE">Car</option>
                  </select>
                  <TfiAngleDown size={15} />
                </div>
              </div>
            </div>
            <div className="flex flex-col px-1">
              <label className="flex gap-4 items-center">
                <div className="flex border-gray-400 rounded-full border p-2">
                  <LiaCoinsSolid size={20} />
                </div>
                <div className="flex gap-2">
                  <span className="text-center">
                    How many did you sell? (Quantity)
                  </span>
                  <CiCircleQuestion className="text-top" size={15} />
                </div>
              </label>
              <div className="flex gap-4">
                {/*<div className="mx-auto w-1 border-gray-400 h-full">*/}
                <span className="w-[1px] h-[-1] bg-gray-400 rounded mx-5"></span>
                {/*</div>*/}
                <div className="flex px-4 border-gray-400 border rounded w-full items-center relative mb-6 md:mb-10">
                  <input className="flex-1 py-2 outline-non" type="number" />
                  <ImCancelCircle size={15} />
                </div>
              </div>
            </div>
            <div className="flex flex-col px-1">
              <label className="flex gap-4 items-center">
                <div className="flex border-gray-400 rounded-full border p-2">
                  <LiaCoinsSolid size={20} />
                </div>
                <div className="flex gap-2">
                  <span className="text-center">How much did you sell it?</span>
                  <CiCircleQuestion className="text-top" size={15} />
                </div>
              </label>
              <div className="flex gap-4">
                {/*<div className="mx-auto w-1 border-gray-400 h-full">*/}
                <span className="w-[1px] h-[-1] bg-gray-400 rounded mx-5"></span>
                {/*</div>*/}
                <div className="flex  pr-4 border-gray-400 border rounded w-full items-center relative mb-6 md:mb-10">
                  <span className="flex items-center px-4 h-full rounded bg-gray-200 border border-gray-400">
                    ₦
                  </span>
                  <input
                    className="flex-1 py-2 pl-4 outline-none w-full"
                    type="number"
                  />
                  <ImCancelCircle size={15} />
                </div>
              </div>
            </div>
            <div className="flex flex-col px-1">
              <label className="flex gap-4 items-center">
                <div className="flex border-gray-400 rounded-full border p-2">
                  <LiaCoinsSolid size={20} />
                </div>
                <div className="flex gap-2">
                  <span className="text-center">Customer's name</span>
                  <CiCircleQuestion className="text-top" size={15} />
                </div>
              </label>
              <div className="flex gap-4">
                {/*<div className="mx-auto w-1 border-gray-400 h-full">*/}
                <span className="w-[1px] h-[-1] bg-gray-400 rounded mx-5"></span>
                {/*</div>*/}
                <div className="flex px-4 border-gray-400 border rounded w-full items-center relative mb-6 md:mb-10">
                  <input className="flex-1 py-2 outline-non" type="text" />
                  <ImCancelCircle size={15} />
                </div>
              </div>
            </div>
            <div className="flex flex-col px-1">
              <label className="flex gap-4 items-center">
                <div className="flex border-gray-400 rounded-full border p-2">
                  <LiaCoinsSolid size={20} />
                </div>
                <div className="flex gap-2">
                  <span className="text-center">Customer's phone number</span>
                  <CiCircleQuestion className="text-top" size={15} />
                </div>
              </label>
              <div className="flex gap-4">
                {/*<div className="mx-auto w-1 border-gray-400 h-full">*/}
                <span className="w-[1px] h-[-1] bg-gray-400 rounded mx-5"></span>
                {/*</div>*/}
                <div className="flex px-4 border-gray-400 border rounded w-full items-center relative mb-6 md:mb-10">
                  <input className="flex-1 py-2 outline-non" type="number" />
                  <ImCancelCircle size={15} />
                </div>
              </div>
            </div>
            <div className="flex flex-col px-1">
              <label className="flex gap-4 items-center">
                <div className="flex border-gray-400 rounded-full border p-2">
                  <LiaCoinsSolid size={20} />
                </div>
                <div className="flex gap-2">
                  <span className="text-center">Customer's email address</span>
                  <CiCircleQuestion className="text-top" size={15} />
                </div>
              </label>
              <div className="flex gap-4">
                {/*<div className="mx-auto w-1 border-gray-400 h-full">*/}
                <span className="w-[1px] h-[-1] bg-gray-400 rounded mx-5"></span>
                {/*</div>*/}
                <div className="flex px-4 border-gray-400 border rounded w-full items-center relative">
                  <input className="flex-1 py-2 outline-non" type="text" />
                  <ImCancelCircle size={15} />
                </div>
              </div>
            </div>
            <div className="flex flex-col px-1">
              <label className="flex gap-4 items-center">
                <div className="flex border-gray-400 rounded-full border p-2">
                  <LiaCoinsSolid size={20} />
                </div>
                <div className="flex gap-2">
                  <span className="text-center">Customer's home address</span>
                  <CiCircleQuestion className="text-top" size={15} />
                </div>
              </label>
              <div className="flex gap-4">
                {/*<div className="mx-auto w-1 border-gray-400 h-full">*/}
                <span className="w-[1px] h-[-1] bg-gray-400 rounded mx-5"></span>
                {/*</div>*/}
                <div className="flex px-4 border-gray-400 border rounded w-full items-center relative">
                  <input className="flex-1 py-2 outline-non" type="text" />
                  <ImCancelCircle size={15} />
                </div>
              </div>
            </div>
            <div className="py-5 flex items-center justify-between px-1  mt-4 md:px-12">
              <button className="text-red py-2 md:py-4 px-4 md:px-8 border-red border-[2px] rounded-[50px] flex justify-center font-bold md:gap-3">
                Scan QR Code
              </button>
              <div className="flex gap-4 items-center justify-end px-1">
                <button className="text-red py-2 md:py-4 px-4 md:px-12 border-red border-[2px] rounded-[50px] flex text-center font-bold md:gap-3">
                  <span className="flex items-center text-center">Cancel</span>
                </button>
                <button
                  className="text-white py-2 md:py-4 px-4 md:px-16 bg-red border-red border-[2px] 
                          rounded-[50px] flex justify-center font-bold md:gap-3"
                  onClick={handleSuccessModalOpen}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default AddSalesModal;
