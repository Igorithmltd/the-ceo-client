import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { GrHelp } from "react-icons/gr";
import { useModal } from "../../context/ModalContext";
import ApiSetup from "../../utils/ApiSetup";
import { useAuth } from "../../context/AuthContext";

const ServiceDetailsModal = () => {
  const { isServiceDetailOpen, 
        setIsServiceDetailOpen, 
        currentServiceId,
        setIsEditServiceOpen
    } = useModal();
  
  const api = ApiSetup();
  const { userInfo } = useAuth();
  const { setAppLoading } = useModal();

  const [service, setService] = useState();

  const closeModal = () => {
    setIsServiceDetailOpen(false);
  };

  const editServiceModal = () => {
    setIsServiceDetailOpen(false);
    setIsEditServiceOpen(true);
  };

  const baseUrl = "https://api.theceoapp.com/"

  useEffect(() => {
    if (userInfo?.masked_id && currentServiceId) {
      getService();
    }
  }, [userInfo?.masked_id, currentServiceId]);

  const getService = async () => {
    setAppLoading(true);
    try {
      const data = {
        "u_id": userInfo?.masked_id,
        "serviceId": currentServiceId  
      };

      const response = await api.post("getservicebyid", data);

      if (response?.data) {
        console.log(response?.data, 'the result');
        setService(response?.data.datas);
      }
    } catch (error) {
      console.log(error, 'the error');
    } finally {
      setAppLoading(false);
    }
  };

  function formatDate(dateString) {
    // Extract day, month, year, hours, and minutes from the string
    const day = dateString.slice(0, 2);
    const month = dateString.slice(2, 4);
    const year = dateString.slice(4, 8);
    const hours = dateString.slice(8, 10);
    const minutes = dateString.slice(10, 12);

    // Convert month number to month name
    const monthNames = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun", 
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    const monthIndex = parseInt(month, 10) - 1; // Convert to zero-based index
    const monthName = monthNames[monthIndex];

    // Convert hours to 12-hour format
    const hour12 = hours % 12 || 12; // Convert 0 to 12
    const ampm = hours >= 12 ? 'PM' : 'AM';

    // Add suffix to the day
    const daySuffix = (d) => {
        if (d >= 11 && d <= 13) return 'th'; // Special case for 11, 12, 13
        switch (d % 10) {
            case 1: return 'st';
            case 2: return 'nd';
            case 3: return 'rd';
            default: return 'th';
        }
    };

    // Format the final date string
    const formattedDate = `${parseInt(day, 10)}${daySuffix(parseInt(day, 10))} ${monthName}, ${year} | ${hour12}: ${minutes} ${ampm}`;
    
    return formattedDate;
}

// const dateString = "15112024150238";
// const formatted = formatDate(dateString);
// console.log(formatted); // Output: "15th Nov, 2024 | 03:02 PM"

  return (
    <Modal isOpen={isServiceDetailOpen} closeModal={closeModal}>
      <div className="bg-white md:w-[80vw] w-full h-[80vh] overflow-auto p-6">
      <div className="flex py-5 items-center justify-between md:px-8 relative">
          <div className="flex gap-4">
            <h2 className="font-bold">{service?.name}</h2>
            <span className="text-sm text-gray-400">
              {/* Added on {formatDate(service?.date)} */}
              Added on {service?.date}
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
          <GrHelp size={10} />
        </div>
        <div className="flex gap-5 mt-5 flex-col md:flex-row">
        <div className="flex-1 grid md:grid-cols-2 md:grid-rows-2 gap-6 md:p-6 h-fit">
            <div className="bg-[#666666] p-4 md:p-1 aspect-[1/1] 
              flex flex-col gap-5 justify-center items-center 
              md:w-full rounded relative">
              <img src={`${baseUrl}${service?.url}`} alt=""
                className="w-fit" />
              <div className="absolute top-2 right-2">
                <img src="/images/camera.png" alt=""
                  className="w-[15px] " />
              </div>
            </div>
            {service?.extraurl.map((imagePath, index) => (
            <div key={index} className="bg-[#666666] p-4 md:p-1 aspect-[1/1] 
                flex flex-col gap-5 justify-center items-center 
                md:w-full rounded relative">
              <img src={`${baseUrl}${imagePath}`} alt={`Service Image ${index + 1}`} />
              <div className="absolute top-2 right-2">
                <img src="/images/camera.png" alt=""
                  className="w-[15px] " />
              </div>
            </div>
            ))}
          </div>
          <div className="flex-1 flex flex-col gap-5 p-2 font-extralight text-gray-500 md:h-full h-[100vh] overflow-y-auto">
            <div className="flex flex-col gap-5">
              <div className="flex flex-col md:flex-row md:justify-between md:items-end px-1 md:px-4  md:py-3">
                <label className="flex-1">Service name</label>
                <span className="flex-1 py-1 border-b-gray-400 border-b outline-none">{service?.name}</span>
              </div>
              <div className="flex flex-col md:flex-row md:justify-between md:items-end px-1 md:px-4  md:py-3">
                <label className="flex-1">Service Type</label>
                <span className="flex-1 py-1 border-b-gray-400 border-b outline-none">{service?.service_type}</span>
              </div>
              <div className="flex flex-col md:flex-row md:justify-between md:items-end px-1 md:px-4  md:py-3">
                <label className="flex-1">Pricing type</label>
                <span className="flex-1 py-1 border-b-gray-400 border-b outline-none">{service?.pricing_type}</span>
              </div>
              <div className="flex flex-col md:flex-row md:justify-between md:items-end px-1 md:px-4  md:py-3">
                <label className="flex-1">Staring from (price)</label>
                <span className="flex-1 py-1 border-b-gray-400 border-b outline-none">{service?.amount}</span>
              </div>
              <div className="flex flex-col md:flex-row justify-between md:items-end px-1 md:px-4  md:py-3">
                <label className="flex-1">Estimated duration</label>
                <span className="flex-1 py-1 border-b-gray-400 border-b outline-none">{service?.duration}</span>
              </div>
              <div className="flex flex-col md:flex-row justify-between md:items-end px-1 md:px-4  md:py-3">
                <label className="flex-1">Capacity</label>
                <span className="flex-1 py-1 border-b-gray-400 border-b outline-none">{service?.capacity}</span>
              </div>
              <div className="flex flex-col md:flex-row md:justify-between md:items-end px-1 md:px-4  md:py-3">
                <label className="flex-1">Space For</label>
                <span className="flex-1 py-1 border-b-gray-400 border-b outline-none">{service?.spacefor}</span>
              </div>
              <div className="flex flex-col md:flex-row justify-between md:items-end px-1 md:px-4  md:py-3">
                <label className="flex-1">No. of milestones</label>
                <span className="flex-1 py-1 border-b-gray-400 border-b outline-none">{service?.milestone}</span>
              </div>
            </div>
            
            <div className="flex flex-col w-full gap-5">
            {service?.milestonelist.map((milestone) => (
               <div key={milestone?.id} className="flex flex-col w-full px-1 md:px-4  md:py-3">
                <label className="flex-1">Milestone</label>
                <span className="flex-1 py-1 border-b-gray-400 border-b outline-none">{milestone?.value}</span>
              </div>
            ))}
              <div className="flex flex-col w-full px-1 md:px-4  md:py-3">
                <span>Service Description:</span>
                <span className="flex-1 py-1 border-b-gray-400 border-b outline-none">{service?.description}</span>
              </div>
            </div>
            <div className="md:py-5 my-2 flex items-center justify-center px-1 md:px-12"> 
              <button 
                onClick={() => editServiceModal()}
                className="text-red py-4 my-2 px-4 border-red border-[2px] rounded-[50px] flex justify-center font-bold md:gap-3 w-full"
              >
                Edit service
              </button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ServiceDetailsModal;


