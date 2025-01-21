import React, { useState } from "react";
import Modal from "./Modal";
import { ImCancelCircle } from "react-icons/im";
import { CiCircleQuestion } from "react-icons/ci";
import { useModal } from "../../context/ModalContext";
import { LiaCoinsSolid } from "react-icons/lia";
import { TfiAngleDown } from "react-icons/tfi";
import { FiPlus } from "react-icons/fi";
import SuccessSalesModal from "../../components/modals/SuccessSalesModal";

const AutoGenerateTermsModal = () => {
    const {isAutoTermsOpen, setIsAutoTermsOpen} = useModal()
    const {isSuccessSalesOpen, setIsSuccessSalesOpen} = useModal();

      const handleSuccessModalOpen = () => {
        setIsAutoTermsOpen(false);
        setIsSuccessSalesOpen(true);
      };
      const closeModal = () => {
            setIsAutoTermsOpen(false);
        };

  return (
    <Modal isOpen={isAutoTermsOpen} closeModal={closeModal} >
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
                        <textarea name="" id="" 
                            className="flex-1 p-4 min-w-md h-80 md:h-48 border border-black outline-none rounded"
                            placeholder="Write manually...">
                            1. Introduction

                            Welcome to [Your Website Name]! By accessing this website, you agree to comply with these terms and conditions. If you do not agree, please do not use [Your Website Name].

                            2. Cookies

                            We use cookies to enhance your experience. By using [Your Website Name], you consent to the use of cookies in accordance with our Privacy Policy.

                            3. License

                            [Your Company Name] owns the intellectual property rights for all material on [Your Website Name]. You may access this for personal use, subject to restrictions:

                            Do not republish, sell, rent, sub-license, reproduce, duplicate, or redistribute content from [Your Website Name].
                            4. User Comments

                            Comments reflect the views of the person who posts them, not [Your Company Name].
                            [Your Company Name] is not liable for comments posted on the website.
                            We reserve the right to monitor and remove comments deemed inappropriate or offensive.
                            5. Hyperlinking to our Content

                            The following organizations may link to our Website without prior approval:

                            Government agencies, search engines, news organizations, and online directory distributors.
                            System-wide Accredited Businesses except soliciting non-profit organizations, charity shopping malls, and charity fundraising groups.
                            6. iFrames

                            Without prior approval, you may not create frames around our Webpages that alter the visual presentation or appearance of our Website.

                            7. Content Liability

                            We are not responsible for content appearing on your Website. You agree to protect and defend us against all claims arising from your Website. No link(s) should appear on any Website that may be interpreted as libelous, obscene, or criminal, or which infringes any third-party rights.

                            8. Your Privacy

                            Please read our Privacy Policy.

                            9. Reservation of Rights

                            We reserve the right to request the removal of any link to our Website. You agree to immediately remove all links upon request. We also reserve the right to amend these terms and conditions and its linking policy at any time.

                            10. Removal of links from our website

                            If you find any link on our Website offensive, you are free to contact us. We will consider requests to remove links but are not obligated to do so or to respond directly.

                            11. Disclaimer

                            To the maximum extent permitted by applicable law, we exclude all representations, warranties, and conditions relating to our website and the use of this website. Nothing in this disclaimer will:

                            Limit or exclude our or your liability for death or personal injury;
                            Limit or exclude our or your liability for fraud or fraudulent misrepresentation;
                            Limit any of our or your liabilities in any way that is not permitted under applicable law; or
                            Exclude any of our or your liabilities that may not be excluded under applicable law.
                            The limitations and prohibitions of liability set in this Section and elsewhere in this disclaimer govern all
                             liabilities arising under the disclaimer, including liabilities arising in contract, in tort, and for breach of statutory duty.
                        </textarea>
                    </div>
                </div>
                <div className="py-5 flex items-center justify-between px-1  mt-4 md:px-12">
                    <button 
                        className="text-red py-2 md:py-4 px-4 md:px-8 border-red border-[2px] 
                        rounded-[50px] flex justify-center font-bold md:gap-3">
                        Auto-generate
                    </button>
                    <div className="flex gap-4 items-center justify-end px-1">
                      <button 
                          className="text-white py-2 md:py-4 px-4 md:px-16 bg-red border-red border-[2px] 
                          rounded-[50px] flex justify-center font-bold md:gap-3"
                          onClick={ handleSuccessModalOpen }
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

export default AutoGenerateTermsModal;
