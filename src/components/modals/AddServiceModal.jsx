import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { GrHelp } from "react-icons/gr";
import { TfiAngleDown } from "react-icons/tfi";
import { useModal } from "../../context/ModalContext";
import ApiSetup from "../../utils/ApiSetup";
import { useAuth } from "../../context/AuthContext";
import { FiPlus } from "react-icons/fi";
import { CiCircleQuestion } from "react-icons/ci";

const AddServiceModal = () => {
  const { isServiceOpen, setIsServiceOpen } = useModal();
  const {isSuccessExpensesOpen, setIsSuccessExpensesOpen} = useModal();
  const api = ApiSetup();
  const { userInfo } = useAuth();
  const { setAppLoading } = useModal();

  const [serviceName, setServiceName] = useState("");
  const [serviceType, setServiceType] = useState("");
  const [duration, setDuration] = useState("");
  const [amount, setAmount] = useState("");
  const [serviceDescription, setServiceDescription] = useState("");
  const [pricingType, setPricingType] = useState("");
  const [capacity, setCapacity] = useState("");
  const [spacefor, setSpacefor] = useState("");
  const [milestone, setMilestone] = useState("");
  const [milestone1, setMilestone1] = useState("");
  const [milestone2, setMilestone2] = useState("");
  const [milestone0, setMilestone0] = useState("");
  const [serviceFiles, setServiceFiles] = useState([]);
  const [allProducts, setAllProducts] = useState([]);

  const closeModal = () => {
    setIsServiceOpen(false);
  };

  const handleSumbmit = async () => {
    try {
      if (userInfo?.masked_id) {
        setIsServiceOpen(false);
        setAppLoading(true);
        const formData = new FormData();
        formData.append("id", userInfo?.masked_id);
        formData.append("type", "newservice");
        formData.append("serviceDescription", serviceDescription);
        formData.append("servicename", serviceName);
        formData.append("servicetype", serviceType);
        formData.append("pricingtype", pricingType);
        formData.append("amount", amount);
        formData.append("duration", duration);
        formData.append("capacity", capacity);
        formData.append("spacefor", spacefor);
        formData.append("milestone", milestone);
        formData.append("milestone1", milestone1);
        //formData.append("milestone2", milestone2);
        formData.append("milestone0", milestone0);

        let fileLength = Array.from(serviceFiles).length;
        for (let i = 0; i < fileLength; i++) {
          formData.append("file" + i, serviceFiles[i]);
        }

        for (let pair of formData.entries()) {
          console.log(pair[0] + ': ' + pair[1]);
        }
        const res = await api.postFormData("uploadservices", formData);
        setAppLoading(false);
        const totalrev = res.data["uploadservices"]
        console.log(res,'the result')
      }
    } catch (error) {
      setAppLoading(false);
      console.log(error);
    }
  };
    const handleSuccessModalOpen = () => {
      setIsServiceOpen(false);
      // setIsSuccessExpensesOpen(true);
    };

  return (
    <Modal isOpen={isServiceOpen} closeModal={closeModal}>
      <div className="bg-white md:w-[80vw] w-full h-[80vh] overflow-auto p-6">
        <div className="flex py-5 items-center justify-between md:px-8 relative">
          <div className="flex gap-4">
            <h2 className="font-bold">Add new service</h2>
            <span className="text-sm text-gray-400">
              7th Jul, 2024 | 11:45 AM
            </span>
          </div>
          <div>
            <IoIosCloseCircleOutline
              className="absolute top-0 right-0 font-light"
              text-gray-400
              size={25}
              title="close"
              onClick={closeModal}
            />
          </div>
          {/* <ImCancelCircle size={25} title="close" onClick={()=> setOpen(false)} /> */}
        </div>
        <div className="flex items-center justify-between px-8">
          <span className="text-[12px]">₦</span>
          <CiCircleQuestion size={20} />
        </div>
        <div className="flex gap-5 mt-5 flex-col md:flex-row">
          <div className="flex-1 grid md:grid-cols-2 md:grid-rows-2 gap-6 md:p-6 h-fit">
            <div className="bg-[#666666] p-4 md:p-1 aspect-[1/1] 
              flex flex-col gap-5 justify-center items-center 
              md:w-full rounded relative">
              <div className="bg-black p-5 bg-opacity-[0.7] rounded-full cursor-pointer">
                <img src="/images/camera.png" alt=""
                className="w-[30px]" />
              </div>
              <input
                type="file"
                accept=".jpg,.jpeg,.png"
                onChange={(e) => setServiceFiles(e.target.files)}
                className="opacity-0 absolute h-[150px] aspect-[1/1]"
              />
              <p className="text-sm text-white">Change image | Delete</p>
              <div className="absolute top-2 right-2">
                <img src="/images/camera.png" alt=""
                  className="w-[15px] " />
              </div>
              
            </div>
            <div className="bg-[#666666] p-4 md:p-1 aspect-[1/1] flex flex-col gap-5 justify-center items-center md:w-full rounded">
              <div className="bg-black p-5 bg-opacity-[0.7] rounded-full cursor-pointer">
                <img src="/images/plus.png" alt="" />
              </div>
              <input
                type="file"
                accept=".jpg,.jpeg,.png"
                onChange={(e) => setServiceFiles(e.target.files)}
                className="opacity-0 absolute h-[150px] aspect-[1/1]"
              />
              <p className="text-sm text-white">Add image/video (2 of 4)</p>
            </div>
            <div className="bg-[#666666] p-4 md:p-1 aspect-[1/1] flex flex-col gap-5 justify-center items-center md:w-full rounded">
              <div className="bg-black p-5 bg-opacity-[0.7] rounded-full cursor-pointer">
                <img src="/images/plus.png" alt="" />
              </div>
              <input
                type="file"
                accept=".jpg,.jpeg,.png"
                onChange={(e) => setServiceFiles(e.target.files)}
                className="opacity-0 absolute h-[150px] aspect-[1/1]"
              />
              <p className="text-sm text-white">Add image/video (2 of 4)</p>
            </div>
            <div className="bg-[#666666] p-4 md:p-1 aspect-[1/1] flex flex-col gap-5 justify-center items-center md:w-full rounded">
              <div className="bg-black p-5 bg-opacity-[0.7] rounded-full cursor-pointer">
                <img src="/images/plus.png" alt="" />
              </div>
              <input
                type="file"
                accept=".jpg,.jpeg,.png"
                onChange={(e) => setServiceFiles(e.target.files)}
                className="opacity-0 absolute h-[150px] aspect-[1/1]"
              />
              <p className="text-sm text-white">Add image/video (2 of 4)</p>
            </div>
          </div>
          <div className="flex-1 flex flex-col gap-5 md:gap-0 p-2 font-extralight text-gray-500 md:h-full h-[100vh] overflow-y-auto">
            <div className="flex flex-col gap-5">
              <div className="flex flex-col md:flex-row md:justify-between md:items-end px-1 md:px-4  md:py-3">
                <label className="flex-1">Service name</label>
                <input
                  value={serviceName}
                  onChange={(e) => setServiceName(e.target.value)}
                  className="flex-1 py-1 border-b-gray-400 border-b outline-none"
                  type="text"
                />
              </div>
              <div className="flex flex-col md:flex-row md:justify-between md:items-end px-1 md:px-4  md:py-3">
                <label className="flex-1">Service Type</label>
                <div className="flex-1 flex gap-4">
                    <div className="flex items-center relative w-full px-4 border-gray-400 border rounded outline-none">
                      <select id="serviceType" 
                        value={serviceType}
                        onChange={(e) => setServiceType(e.target.value)}
                        className="flex-1 appearance-none py-2 w-full
                          leading-tight focus:outline-none focus:shadow-outline">
                        <option selected>--</option>
                        <option value="Ongoing">Ongoing</option>
                        <option value="Event">Event</option>
                      </select>
                        <TfiAngleDown
                            size={15}
                          />
                    </div>
                    
                </div>
              </div>
              <div className="flex flex-col md:flex-row md:justify-between md:items-end px-1 md:px-4  md:py-3">
                <label className="flex-1">Pricing type</label>
                <div className="flex-1 flex gap-4">
                    <div className="flex items-center relative w-full px-4 border-gray-400 border rounded outline-none">
                      <select id="countries" 
                        value={pricingType}
                        onChange={(e) => setPricingType(e.target.value)}
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
                {/* <input
                  value={pricingType}
                  onChange={(e) => setPricingType(e.target.value)}
                  className="flex-1 py-1 border-b-gray-400 border-b outline-none"
                  type="text"
                /> */}
              </div>
              <div className="flex flex-col md:flex-row md:justify-between md:items-end px-1 md:px-4  md:py-3">
                <label className="flex-1">Staring from (price)</label>
                <input
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="flex-1 py-1 border-b-gray-400 border-b outline-none"
                  type="int"
                />
              </div>
              <div className="flex flex-col md:flex-row justify-between md:items-end px-1 md:px-4  md:py-3">
                <label className="flex-1">Estimated duration</label>
                <input
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="flex-1 py-1 border-b-gray-400 border-b outline-none"
                  type="text"
                />
              </div>
              <div className="flex flex-col md:flex-row justify-between md:items-end px-1 md:px-4  md:py-3">
                <label className="flex-1">Capacity</label>
                <input
                  value={capacity}
                  onChange={(e) => setCapacity(e.target.value)}
                  className="flex-1 py-1 border-b-gray-400 border-b outline-none"
                  type="int"
                />
              </div>
              <div className="flex flex-col md:flex-row md:justify-between md:items-end px-1 md:px-4  md:py-3">
                <label className="flex-1">Space For</label>
                <div className="flex-1 flex gap-4">
                    <div className="flex items-center relative w-full px-4 border-gray-400 border rounded outline-none">
                      <select id="spacefor" 
                        value={spacefor}
                        onChange={(e) => setSpacefor(e.target.value)}
                        className="flex-1 appearance-none py-2 w-full
                          leading-tight focus:outline-none focus:shadow-outline">
                        <option selected>--</option>
                        <option value="1">Ongoing</option>
                      </select>
                        <TfiAngleDown
                            size={15}
                          />
                    </div>
                    
                </div>
              </div>
              <div className="flex flex-col md:flex-row justify-between md:items-end px-1 md:px-4  md:py-3">
                <label className="flex-1">No. of milestones</label>
                <input
                  value={milestone}
                  onChange={(e) => setMilestone(e.target.value)}
                  className="flex-1 py-1 border-b-gray-400 border-b outline-none"
                  type="int"
                />
              </div>
            </div>
            <div className="flex flex-col w-full gap-5">
               <div className="flex flex-col w-full px-1 md:px-4  md:py-3">
                <label className="flex-1">Milestone 1</label>
                <input
                value={milestone0}
                onChange={(e)=> setMilestone0(e.target.value)}
                  className="flex-1 py-1 border-b-gray-400 border-b outline-none"
                  type="text"
                />
              </div>
              <div className="flex flex-col w-full px-1 md:px-4  md:py-3">
                <label className="flex-1">Milestone 2</label>
                <input
                value={milestone1}
                onChange={(e)=> setMilestone1(e.target.value)}
                  className="flex-1 py-1 border-b-gray-400 border-b outline-none"
                  type="text"
                />
              </div>
              <div className="flex flex-col w-full px-1 md:px-4  md:py-3">
                <label className="flex-1">Milestone 3</label>
                <input
                value={milestone2}
                onChange={(e)=> setMilestone2(e.target.value)}
                  className="flex-1 py-1 border-b-gray-400 border-b outline-none"
                  type="text"
                />
              </div>
              <div className="flex flex-col w-full px-1 md:px-4  md:py-3">
                <label for="textarea">Service Description:</label>
                <textarea id="textarea" 
                value={serviceDescription}
                onChange={(e)=> setServiceDescription(e.target.value)}
                className="flex-1 py-1 border-b-gray-400 border-b outline-none" 
                rows="4"></textarea>
              </div>
            </div>
            <div className="md:py-5 my-2 flex items-center justify-center px-1"> 
              <button
                onClick={handleSumbmit}
                // onClick={handleSuccessModalOpen}
                className="text-red py-4 my-2 px-4 border-red border-[2px] 
                  rounded-[50px] flex justify-center font-bold md:gap-3 w-full"
              >
                Add service
              </button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default AddServiceModal;
