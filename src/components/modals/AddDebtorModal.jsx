import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import { ImCancelCircle } from "react-icons/im";
import { LiaCoinsSolid } from "react-icons/lia";
import { CiCircleQuestion } from "react-icons/ci";
import { FiPlus } from "react-icons/fi";
import { useModal } from "../../context/ModalContext";
import ApiSetup from "../../utils/ApiSetup";
import { useAuth } from "../../context/AuthContext";

const AddDebtorModal = () => {
  const { isDebtorOpen, setIsDebtorOpen } = useModal();
  const api = ApiSetup();
  const { userInfo } = useAuth();
  const { setAppLoading } = useModal();

  const [debtorName, setDebtorName] = useState("");
  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState();
  const [duedate, setDueDate] = useState("");
  const [addedby, setAddedBy] = useState("");
  const [agentid, setAgentId] = useState();
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");

  const closeModal = () => {
    setIsDebtorOpen(false);
  };

  const handleSumbmit = async () => {
    try {
      if (userInfo?.masked_id) {
        setIsDebtorOpen(false);
        setAppLoading(true);
        // const formData = new FormData();
        // formData.append("u_id", userInfo?.masked_id);
        // formData.append("name", debtorName);
        // formData.append("phone", phone);
        // formData.append("addedby", addedby);
        // formData.append("agentid", agentid);
        // formData.append("email", email);
        // formData.append("address", address);
        // formData.append("amount", amount);

        const dateArray = duedate.split("-");
        const year = dateArray[0];
        const month = dateArray[1];
        const day = dateArray[2];
        console.log(duedate)

        // const expiringDateISO = new Date(day, month - 1, year).toISOString();
        const dueDateISO = `${day}-${month}-${year}`;
        console.log(dueDateISO)
        // formData.append("duedate", dueDateISO);
        const data = {
            "u_id": userInfo?.masked_id,
            "amount": amount, 
            "name": debtorName,  
            "phone": phone,
            "duedate": dueDateISO, 
            "addedby": addedby,  
            "agentid": agentid,  
            "address":address,
            "email":email,
          };
        console.log(data)

        // const res = await api.postFormData("adddebtors", formData);
        const res = await api.post("adddebtors", data);
        console.log(res)
        setAppLoading(false);
      }
    } catch (error) {
      setAppLoading(false);
      console.log(error);
    }
  };

  return (
    <Modal isOpen={isDebtorOpen} closeModal={closeModal} >
      <div className="absolute md:relative m-auto top-[25%] md:top-auto bottom-0 md:bottom-auto 
        bg-white md:w-[70vw] w-full md:max-h-[70%] overflow-y-scroll rounded pt-4">
        <div className="flex py-5 items-center justify-between px-8 border-b border-gray-400">
            <div className="flex justify-between">
               <h2>Add a debtor</h2>
                {/*<span className="text-sm text-gray-400">Select a template</span> */}
            </div>
            
            <div>
                <ImCancelCircle className="" text-gray-400 size={25} title="close" onClick={closeModal} />
            </div>
        </div>
        <div className="flex gap-5 mt-5 flex-col md:flex-row">
            <div className="flex-1 flex flex-col px-6 
                text-gray-500 md:h-full overflow-auto text-xs">
                <div className="flex flex-col px-1">
                    <label className="flex gap-4 items-center">
                        <div className="flex border-gray-400 rounded-full border p-2">
                            <LiaCoinsSolid
                                size={20}
                              />
                        </div>
                        <div className="flex gap-2">
                            
                            <span className="text-center">
                                Debtor's name
                            </span>
                            <CiCircleQuestion 
                            className="text-top"
                            size={15} />
                        </div>
                    </label>
                    <div className="flex gap-4">
                        {/*<div className="mx-auto w-1 border-gray-400 h-full">*/}
                        <span className="w-[1px] h-[-1] bg-gray-400 rounded mx-5"></span>
                        {/*</div>*/}
                        <div className="flex px-4 border-gray-400 border rounded w-full items-center relative mb-6 md:mb-10">
                            <input 
                                type="text"
                                value={debtorName}
                                onChange={(e) => setDebtorName(e.target.value)}
                                className="flex-1 py-2 outline-non"
                            />
                            <ImCancelCircle
                                size={15}
                              />
                        </div>
                    </div>
                </div>
                <div className="flex flex-col px-1">
                    <label className="flex gap-4 items-center">
                        <div className="flex border-gray-400 rounded-full border p-2">
                            <LiaCoinsSolid
                                size={20}
                              />
                        </div>
                        <div className="flex gap-2">
                            
                            <span className="text-center">
                                Debtor's phone number
                            </span>
                            <CiCircleQuestion 
                            className="text-top"
                            size={15} />
                        </div>
                    </label>
                    <div className="flex gap-4">
                        {/*<div className="mx-auto w-1 border-gray-400 h-full">*/}
                        <span className="w-[1px] h-[-1] bg-gray-400 rounded mx-5"></span>
                        {/*</div>*/}
                        <div className="flex px-4 border-gray-400 border rounded w-full items-center relative mb-6 md:mb-10">
                            <input 
                                type="text"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className="flex-1 py-2 outline-non"
                             />
                            <ImCancelCircle
                                size={15}
                              />
                        </div>
                    </div>
                </div>
                <div className="flex flex-col px-1">
                    <label className="flex gap-4 items-center">
                        <div className="flex border-gray-400 rounded-full border p-2">
                            <LiaCoinsSolid
                                size={20}
                              />
                        </div>
                        <div className="flex gap-2">
                            
                            <span className="text-center">
                                Amount owed
                            </span>
                            <CiCircleQuestion 
                            className="text-top"
                            size={15} />
                        </div>
                    </label>
                    <div className="flex gap-4">
                        {/*<div className="mx-auto w-1 border-gray-400 h-full">*/}
                        <span className="w-[1px] h-[-1] bg-gray-400 rounded mx-5"></span>
                        {/*</div>*/}
                        <div className="flex px-4 border-gray-400 border rounded w-full items-center relative mb-6 md:mb-10">
                            <input
                                type="number"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                className="flex-1 py-2 outline-non"
                             />
                            <ImCancelCircle
                                size={15}
                              />
                        </div>
                    </div>
                </div>
                <div className="flex flex-col px-1">
                    <label className="flex gap-4 items-center">
                        <div className="flex border-gray-400 rounded-full border p-2">
                            <LiaCoinsSolid
                                size={20}
                              />
                        </div>
                        <div className="flex gap-2">
                            
                            <span className="text-center">
                                Date due
                            </span>
                            <CiCircleQuestion 
                            className="text-top"
                            size={15} />
                        </div>
                    </label>
                    <div className="flex gap-4">
                        {/*<div className="mx-auto w-1 border-gray-400 h-full">*/}
                        <span className="w-[1px] h-[-1] bg-gray-400 rounded mx-5"></span>
                        {/*</div>*/}
                        <div className="flex px-4 border-gray-400 border rounded w-full items-center relative mb-6 md:mb-10">
                            <input
                                value={duedate}
                                onChange={(e) => setDueDate(e.target.value)}
                                placeholder="DD-MM-YYYY"
                                className="flex-1 py-1 border-b-gray-400 border-b outline-none"
                                type="date"
                             />
                        </div>
                    </div>
                </div>
                <div className="flex flex-col px-1">
                    <label className="flex gap-4 items-center">
                        <div className="flex border-gray-400 rounded-full border p-2">
                            <LiaCoinsSolid
                                size={20}
                              />
                        </div>
                        <div className="flex gap-2">
                            
                            <span className="text-center">
                                Debtor's email address
                            </span>
                            <CiCircleQuestion 
                            className="text-top"
                            size={15} />
                        </div>
                    </label>
                    <div className="flex gap-4">
                        {/*<div className="mx-auto w-1 border-gray-400 h-full">*/}
                        <span className="w-[1px] h-[-1] bg-gray-400 rounded mx-5"></span>
                        {/*</div>*/}
                        <div className="flex px-4 border-gray-400 border rounded w-full items-center relative mb-6 md:mb-10">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="flex-1 py-2 outline-non"
                             />
                            <ImCancelCircle
                                size={15}
                              />
                        </div>
                    </div>
                </div>
                <div className="flex flex-col px-1">
                    <label className="flex gap-4 items-center">
                        <div className="flex border-gray-400 rounded-full border p-2">
                            <LiaCoinsSolid
                                size={20}
                              />
                        </div>
                        <div className="flex gap-2">
                            
                            <span className="text-center">
                                Debtor's home address
                            </span>
                            <CiCircleQuestion 
                            className="text-top"
                            size={15} />
                        </div>
                    </label>
                    <div className="flex gap-4">
                        {/*<div className="mx-auto w-1 border-gray-400 h-full">*/}
                        <span className="w-[1px] h-[-1] bg-gray-400 rounded mx-5"></span>
                        {/*</div>*/}
                        <div className="flex px-4 border-gray-400 border rounded w-full items-center relative">
                            <input
                                type="text"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                className="flex-1 py-2 outline-non"
                             />
                            <ImCancelCircle
                                size={15}
                              />
                        </div>
                    </div>
                </div>
                <div className="flex flex-col px-1">
                    <label className="flex gap-4 items-center">
                        <div className="flex border-gray-400 rounded-full border p-2">
                            <LiaCoinsSolid
                                size={20}
                              />
                        </div>
                        <div className="flex gap-2">
                            
                            <span className="text-center">
                                Added By
                            </span>
                            <CiCircleQuestion 
                            className="text-top"
                            size={15} />
                        </div>
                    </label>
                    <div className="flex gap-4">
                        {/*<div className="mx-auto w-1 border-gray-400 h-full">*/}
                        <span className="w-[1px] h-[-1] bg-gray-400 rounded mx-5"></span>
                        {/*</div>*/}
                        <div className="flex px-4 border-gray-400 border rounded w-full items-center relative">
                            <input
                                type="text"
                                value={addedby}
                                onChange={(e) => setAddedBy(e.target.value)}
                                className="flex-1 py-2 outline-non"
                             />
                            <ImCancelCircle
                                size={15}
                              />
                        </div>
                    </div>
                </div>
                <div className="flex flex-col px-1">
                    <label className="flex gap-4 items-center">
                        <div className="flex border-gray-400 rounded-full border p-2">
                            <LiaCoinsSolid
                                size={20}
                              />
                        </div>
                        <div className="flex gap-2">
                            
                            <span className="text-center">
                                Agent ID
                            </span>
                            <CiCircleQuestion 
                            className="text-top"
                            size={15} />
                        </div>
                    </label>
                    <div className="flex gap-4">
                        {/*<div className="mx-auto w-1 border-gray-400 h-full">*/}
                        <span className="w-[1px] h-[-1] bg-gray-400 rounded mx-5"></span>
                        {/*</div>*/}
                        <div className="flex px-4 border-gray-400 border rounded w-full items-center relative">
                            <input
                                type="number"
                                value={agentid}
                                onChange={(e) => setAgentId(e.target.value)}
                                className="flex-1 py-2 outline-non"
                             />
                            <ImCancelCircle
                                size={15}
                              />
                        </div>
                    </div>
                </div>
                <div className="py-5 flex items-center w-full px-1  mt-4 md:px-12">
                    <div className="flex gap-4 items-center ml-auto px-1">
                      <button className="text-red py-2 md:py-4 px-4 md:px-12 border-red border-[2px] rounded-[50px] flex text-center font-bold md:gap-3">
                      <span className="flex items-center text-center">
                         Cancle 
                      </span>
                      </button>
                      <button 
                          className="text-white py-2 md:py-4 px-4 md:px-16 bg-red border-red border-[2px] 
                          rounded-[50px] flex justify-center font-bold md:gap-3"
                          onClick={handleSumbmit}
                          >
                          <FiPlus /> Add
                        </button>  
                    </div>
                    
                </div>
            </div>
        </div>
      </div>
    </Modal>
  );
};

export default AddDebtorModal;
