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

const CreateAdModal = () => {
  const { isAdOpen, setIsAdOpen } = useModal();
  const { isSuccessSalesOpen, setIsSuccessSalesOpen } = useModal();
  const api = ApiSetup();
  const { userInfo } = useAuth();
  const { setAppLoading } = useModal();

  const [adName, setAdName] = useState("");
  const [adType, setAdType] = useState();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  
  const handleSumbmit = async () => {
    try {
      if (userInfo?.masked_id) {
        setIsAdOpen(false);
        setAppLoading(true);
        const formData = new FormData();
        formData.append("user_id", userInfo?.masked_id);
        formData.append("design", "design 1");
        formData.append("serviceDescription", "serviceDescription");
        // formData.append("servicename", design);
        // formData.append("pricingtype", pricingType);
        // formData.append("amount", amount);
        // formData.append("duration", duration);
        // formData.append("milestone", milestone);
        // formData.append("milestone1", milestone1);
        // formData.append("milestone2", milestone2);
        // formData.append("milestone0", milestone0);

        const dateArray = startDate.split("-");
        const year = dateArray[0];
        const month = dateArray[1].padStart(2, "0"); 
        const day = dateArray[2];
        console.log(startDate)

        // const expiringDateISO = new Date(day, month - 1, year).toISOString();
        const startDateISO = `${day}-${month}-${year}`;
        console.log(startDateISO)
        formData.append("startDate", startDateISO);

        // let fileLength = Array.from(serviceFiles).length;
        // for (let i = 0; i < fileLength; i++) {
        //   formData.append("file" + i, serviceFiles[i]);
        // }

        for (let pair of formData.entries()) {
          console.log(pair[0] + ": " + pair[1]);
        }
        const res = await api.postFormData("uploadservices", formData);
        setAppLoading(false);
        const totalrev = res.data["uploadservices"];
        console.log(res, "the result");
      }
    } catch (error) {
      setAppLoading(false);
      console.log(error);
    }
  };

//   const handleSuccessModalOpen = async () => {
//     setIsAdOpen(false);
//     const reqData = {
//       user_id: userInfo?.masked_id,
//       pivotedate: 1,
//       design: "expandable",
//       addedby: userInfo?.agentfullname,
//       agentid: userInfo?.u_id,
//       total: 540,
//       advance: 100,
//       amountinword: "",
//       balance: 440,
//       caddress: "ekwueme",
//       cemail: "c@gmail.com",
//       cid: "",
//       cname: "c name",
//       cphone: "08112348248",
//       date: "2024-10-7",
//       receipt_type: "product",
//       registereduser: 'yes',
//       addedProduct: [
//         {
//           id: 0,
//           productId: 66,
//           productname: 'Frie',
//           quantity: 10,
//           unitprice: 54,
//           costprice: 44,
//           amount: 540
//         },
//       ],
//     };

//     try {
//       await api.post("receiptdata", reqData);
//       // setIsSuccessSalesOpen(true);
//     } catch (error) {
//       console.log(error, "the sales error");
//     }
//   };
  const closeModal = () => {
    setIsAdOpen(false);
  };

  return (
    <Modal isOpen={isAdOpen} closeModal={closeModal}>
      <div
        className="absolute md:relative m-auto top-[25%] md:top-auto bottom-0 md:bottom-auto 
        bg-white md:w-[70vw] w-full md:max-h-[70%] overflow-y-scroll rounded pt-4"
      >
        <div className="flex py-5 items-center justify-between px-8 border-b border-gray-400">
          <div className="flex justify-between">
            <h2>Create ad</h2>
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
                  <span className="text-center">Enter ad name</span>
                  <CiCircleQuestion className="text-top" size={15} />
                </div>
              </label>
              <div className="flex gap-4">
                {/*<div className="mx-auto w-1 border-gray-400 h-full">*/}
                <span className="w-[1px] h-[-1] bg-gray-400 rounded mx-5"></span>
                {/*</div>*/}
                <div className="flex px-4 border-gray-400 border rounded w-full items-center relative mb-6 md:mb-10">
                <input
                  value={adName}
                  onChange={(e) => setAdName(e.target.value)}
                  className="flex-1 py-1 border-b-gray-400 border-b outline-none"
                  type="text"
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
                  <span className="text-center">
                    AdType
                  </span>
                  <CiCircleQuestion className="text-top" size={15} />
                </div>
              </label>
              <div className="flex gap-4">
                {/*<div className="mx-auto w-1 border-gray-400 h-full">*/}
                <span className="w-[1px] h-[-1] bg-gray-400 rounded mx-5"></span>
                {/*</div>*/}
                <div className="flex items-center relative w-full px-4 border-gray-400 border rounded outline-none">
                    <select id="countries" 
                    value={adType}
                    onChange={(e) => setAdType(e.target.value)}
                    className="flex-1 appearance-none py-2 w-full
                        leading-tight focus:outline-none focus:shadow-outline">
                    <option selected>--</option>
                    <option value="Fixed Price">Fixed Price</option>
                    </select>
                    <TfiAngleDown
                        size={15}
                        />
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
                    Start Date
                  </span>
                  <CiCircleQuestion className="text-top" size={15} />
                </div>
              </label>
              <div className="flex gap-4">
                {/*<div className="mx-auto w-1 border-gray-400 h-full">*/}
                <span className="w-[1px] h-[-1] bg-gray-400 rounded mx-5"></span>
                {/*</div>*/}
                <div className="flex px-4 border-gray-400 border rounded w-full items-center relative mb-6 md:mb-10">
                <input
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    placeholder="DD-MM-YYYY"
                    className="flex-1 py-1 border-b-gray-400 border-b outline-none"
                    type="date"
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
                  <span className="text-center">
                    End Date
                  </span>
                  <CiCircleQuestion className="text-top" size={15} />
                </div>
              </label>
              <div className="flex gap-4">
                {/*<div className="mx-auto w-1 border-gray-400 h-full">*/}
                <span className="w-[1px] h-[-1] bg-gray-400 rounded mx-5"></span>
                {/*</div>*/}
                <div className="flex px-4 border-gray-400 border rounded w-full items-center relative mb-6 md:mb-10">
                <input
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    placeholder="DD-MM-YYYY"
                    className="flex-1 py-1 border-b-gray-400 border-b outline-none"
                    type="date"
                />
                  <ImCancelCircle size={15} />
                </div>
              </div>
            </div>
            <div className="py-5 flex items-center justify-between px-1  mt-4 md:px-12">
                <div className="flex gap-2">
                    <CiCircleQuestion className="text-top" size={15} />
                    <span className="text-center">
                        Estimated Cost: 
                    </span>
                </div>
              <div className="flex gap-4 items-center justify-end px-1">
                <button className="text-red py-2 md:py-4 px-4 md:px-12 border-red border-[2px] rounded-[50px] flex text-center font-bold md:gap-3">
                  <span className="flex items-center text-center">Cancel</span>
                </button>
                <button
                  className="text-white py-2 md:py-4 px-4 md:px-16 bg-red border-red border-[2px] 
                          rounded-[50px] flex justify-center font-bold md:gap-3"
                  onClick={handleSumbmit}
                >
                  Lunch
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default CreateAdModal;
