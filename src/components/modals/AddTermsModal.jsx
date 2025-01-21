/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import Modal from "./Modal";
import { ImCancelCircle } from "react-icons/im";
import { CiCircleQuestion } from "react-icons/ci";
import { useModal } from "../../context/ModalContext";
import { FiPlus } from "react-icons/fi";
import AutoGenerateTermsModal from "../../components/modals/AutoGenerateTermsModal";
import { useAuth } from "../../context/AuthContext";
import ApiSetup from "../../utils/ApiSetup";
import { toast } from "react-hot-toast";

const AddTermsModal = () => {
    const { userInfo } = useAuth();
    const api = ApiSetup();
    const { setAppLoading } = useModal();

    const {isTermsOpen, setIsTermsOpen, setIsAutoTermsOpen} = useModal()
    const [terms, setTerms] = useState("")

    useEffect(() => {
      if (userInfo?.masked_id) {
        getTerms();
      }
    }, [userInfo?.masked_id, terms]);

    const getTerms = async () => {
      try {
        const data = {
          "user_id": userInfo?.masked_id
        };
        const res = await api.post("get_terms_and_about", data);
        // const totalrev = res.data["gettotalrevenue"]
        setTerms(res?.data?.termsandcondition);
      } catch (error) {
        console.log(error, "the error");
      }
    };

      const handleAutoGenerateModalOpen = () => {
        setIsTermsOpen(false);
        setIsAutoTermsOpen(true);
      };

      const closeModal = () => {
            setIsTermsOpen(false);
        };
    const handleSumbmit = async () => {
      try {
          if (userInfo?.masked_id) {
          setIsTermsOpen(false);
          setAppLoading(true);
          const body_data = {
            user_id: userInfo?.masked_id,
            termsandcondition: terms
          }
                  

          const res = await api.post("updatetermsandconditions", body_data);
          if(res?.data?.message == 'Success'){
            toast.success('Terms and Condition updated successfully')
          }
          setAppLoading(false)

          }
      } catch (error) {
          setAppLoading(false);
          console.log(error);
      }
    };

  return (
    <Modal isOpen={isTermsOpen} closeModal={closeModal} >
      <div className="absolute md:relative m-auto md:top-auto bottom-0 md:bottom-auto 
        bg-white md:w-[60vw] w-full max-h-[80%] overflow-y-scroll rounded pt-4">
        <div className="flex py-5 items-center justify-between px-8 border-b border-gray-400">
            <div className="flex justify-between">
               <h2>Add terms and conditions</h2>
            </div>
            
            <div>
                <ImCancelCircle className=" text-gray-400 font-thin"  size={17} title="close" onClick={closeModal} />
            </div>
        </div>
        <div className="flex gap-5 mt-5 flex-col md:flex-row">
            <div className="flex-1 px-6 md:h-full overflow-auto text-xs">
                <div className="flex flex-col px-1 gap-4">
                    <label className="flex gap-4 items-center justify-between">
                        <div className="flex gap-2">
                            <span className="text-center text-black">
                                Terms and conditions
                            </span>
                            <CiCircleQuestion 
                            className="text-top text-gray-400 font-thin"
                            size={15} />
                        </div>
                        <div className="flex text-gray-400">
                            <span className="ml-auto">
                                0/5000
                            </span>
                        </div>
                    </label>
                    <div className="flex gap-4">
                        <textarea name=""
                          id="" 
                          value={terms}
                            onChange= {(e) => setTerms(e.target.value)}
                          className="flex-1 p-4 min-w-md h-80 md:h-48 border border-black outline-none rounded"
                          placeholder="Write manually...">
                        </textarea>
                    </div>
                </div>
                <div className="py-5 flex items-center justify-between px-1  mt-4 md:px-12">
                    <button 
                        className="text-red py-2 md:py-4 px-4 md:px-8 border-red border-[2px] 
                        rounded-[50px] flex justify-center font-bold md:gap-3"
                          onClick={ handleAutoGenerateModalOpen }>
                        Auto-generate
                    </button>
                    <div className="flex gap-4 items-center justify-end px-1">
                      <button 
                          className="text-white py-2 md:py-4 px-4 md:px-16 bg-red border-red border-[2px] 
                          rounded-[50px] flex justify-center font-bold md:gap-3"
                          onClick={ handleSumbmit }
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

export default AddTermsModal;
