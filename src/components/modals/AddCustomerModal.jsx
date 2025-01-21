import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import { ImCancelCircle } from "react-icons/im";
import { LiaCoinsSolid } from "react-icons/lia";
import { CiCircleQuestion } from "react-icons/ci";
import { FiPlus } from "react-icons/fi";
import { useModal } from "../../context/ModalContext";
import ApiSetup from "../../utils/ApiSetup";
import { useAuth } from "../../context/AuthContext";

const AddCustomerModal = () => {
  const { isCustomerOpen, setIsCustomerOpen } = useModal();
  const {setIsSuccessExpensesOpen} = useModal();
  const api = ApiSetup();
  const { userInfo } = useAuth();
  const { setAppLoading } = useModal();

  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
//   const [paging , setPaging ] = useState("");
//   const [from, setFrom] = useState("");
//   const [pagerow, setPagerow] = useState("");
  const [file, setFile] = useState([]);
  const [allCustomers, setAllCustomers] = useState([]);

  const closeModal = () => {
    setIsCustomerOpen(false);
  };

  const handleSuccessModalOpen = () => {
    setIsCustomerOpen(false);
    setIsSuccessExpensesOpen(true);
  };

  const handleSumbmit = async () => {
    try {
      if (userInfo?.masked_id) {
        setIsCustomerOpen(false);
        setAppLoading(true);
        const formData = new FormData();
        formData.append("id", userInfo?.masked_id);
        formData.append("type", "newcustomer");
        formData.append("customername", customerName);
        formData.append("phone", phone);
        formData.append("email", email);
        formData.append("address", address)
        formData.append("file", file);

        const res = await api.postFormData("uploadcustomers", formData);
        console.log(res)
        // Create an object to hold the form data
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value; // Populate the object with key-value pairs
        });
        console.log(data)
        setAppLoading(false);
      }
    } catch (error) {
      setAppLoading(false);
      console.log(error);
    }
  };

  return (
    <Modal isOpen={isCustomerOpen} closeModal={closeModal} >
      <div className="absolute md:relative m-auto top-[25%] md:top-auto bottom-0 md:bottom-auto 
        bg-white md:w-[70vw] w-full md:max-h-[70%] overflow-y-scroll rounded pt-4">
        <div className="flex py-5 items-center justify-between px-8 border-b border-gray-400">
            <div className="flex justify-between">
               <h2>Add new customer</h2>
                {/*<span className="text-sm text-gray-400">Select a template</span> */}
            </div>
            
            <div>
                <ImCancelCircle className="" text-gray-400 size={25} title="close" onClick={closeModal} />
            </div>
        </div>
        <div className="flex gap-5 mt-5 flex-col md:flex-row">
            <div className="flex-1 flex flex-col px-6 
                text-gray-500 md:h-full overflow-auto text-xs">
                <div className="flex  items-center justify-center w-full">
                    <div className="bg-[#666666] p-4 md:p-8 
                        md:p-1 aspect-[1/1] flex flex-col 
                        gap-5 justify-center items-center md:w-fit rounded-full">
                        <div className="bg-black md:p-10 bg-opacity-[0.7] rounded-full cursor-pointer">
                            <img src="/images/camera.png" alt=""
                            className="w-[50px]" />
                        </div>
                        <input
                            type="file"
                            accept=".jpg,.jpeg,.png"
                            // value={file}
                            onChange={(e) => setFile(e.target.files[0])} // Change this line
                            className="opacity-0 absolute h-[150px] aspect-[1/1]"
                        />
                    </div>
                </div>
                
                <div className="flex flex-col px-1">
                    <label className="flex gap-4 items-center">
                        <div className="flex border-gray-400 rounded-full border p-2">
                            <img src="/images/customers.png" alt=""
                                className="w-[20px] aspect-[1/1]"
                             />
                        </div>
                        <div className="flex gap-2">
                            
                            <span className="text-center">
                                Customer's name
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
                                value={customerName}
                                onChange={(e) => setCustomerName(e.target.value)}
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
                            <img src="/images/customers.png" alt=""
                                className="w-[20px] aspect-[1/1]"
                             />
                        </div>
                        <div className="flex gap-2">
                            
                            <span className="text-center">
                                Customer's phone number
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
                            <img src="/images/customers.png" alt=""
                                className="w-[20px] aspect-[1/1]"
                             />
                        </div>
                        <div className="flex gap-2">
                            
                            <span className="text-center">
                                Customer's email address
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
                            <img src="/images/customers.png" alt=""
                                className="w-[20px] aspect-[1/1]"
                             />
                            {/* <LiaCoinsSolid
                                size={20}
                              /> */}
                        </div>
                        <div className="flex gap-2">
                            
                            <span className="text-center">
                                Customer's home address
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

export default AddCustomerModal;
