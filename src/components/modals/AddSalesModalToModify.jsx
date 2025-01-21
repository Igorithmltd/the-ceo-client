import React, { useState } from "react";
import Modal from "./Modal";
import { ImCancelCircle } from "react-icons/im";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useModal } from "../../context/ModalContext";
import { useDesign } from "../../context/DesignContext";
import ApiSetup from "../../utils/ApiSetup";
import { useAuth } from "../../context/AuthContext";
import { useNavigate} from 'react-router-dom'
import {NewSales} from '../designs';
import { Icon } from '@iconify-icon/react';

const AddSalesModalToModify = () => {
  const { isSalesOpen, setIsSalesOpen } = useModal();
  const handleCloseNewSales=()=>{setIsSalesOpen(false);}

  const api = ApiSetup();
  const { userInfo } = useAuth();

  const { setSalesData , setReceiptType, setQuickReceipt, setIdToDownload,  windowSize, currentPage, 
    setLastnavigated } =  useDesign();

    const navigate = useNavigate();




  const closeModal = () => {
    setIsSalesOpen(false);
  };


  const generateNewDimention = (width, height, screenWidth, divWidth, type, ret) => {
    const htwRatio = height / width;   // HEIGHT TO WIDTH RATIO
    const itcRatio = width / divWidth; // ITEM TO CONTAINER RATION
    let newHeight = height;
    let newWidth = width;
    let newDivWidth = divWidth;

    if (screenWidth <= divWidth) {
      newDivWidth = screenWidth - 20
    } else {
      if (divWidth > 600) {
        newDivWidth = 400;
      } else {
        newDivWidth = divWidth - 200;
      }
    }

    if (type === "item") {
      newWidth = itcRatio * newDivWidth;
      newHeight = htwRatio * newWidth;
    } else {
      newWidth = newDivWidth;
      newHeight = htwRatio * newWidth;
    }

    if (ret === "width") {
      return newWidth;
    } else {
      return newHeight;
    }
  }

  const generateNewPosition = (old_width, new_width, old_height, new_height, old_x, old_y, type) => {
    let new_x = 10;
    let new_y = 10;
    if (type === "x") {
        new_x = (old_x * new_width) / old_width;
        return new_x;
    }
    if (type === "y") {
        new_y = (old_y * new_height) / old_height;
        return new_y;
    }
  }





  return (
    <Modal isOpen={isSalesOpen} closeModal={closeModal}>
      <div
        className="absolute md:relative m-auto top-[25%] md:top-auto bottom-0 md:bottom-auto 
        bg-white md:w-[70vw] w-full justify-center md:max-h-[70%] overflow-y-scroll rounded pt-4"
      >
        <div className="flex py-5 items-center justify-between px-8 border-b border-gray-400">
          <div className="flex justify-between">
            <h2>Add new Sales</h2>
          </div>
          <div>
            <IoIosCloseCircleOutline
              className=""
              text-gray-400
              size={25}
              title="close"
              onClick={closeModal}
            />
          </div>
        </div>
        
        <NewSales handleCloseNewSales={handleCloseNewSales} userData={userInfo}  generateNewDimention={generateNewDimention} 
          windowSize={windowSize}  generateNewPosition={generateNewPosition} setReceiptType={setReceiptType}
          setIdToDownload={setIdToDownload} setQuickReceipt={setQuickReceipt} setSalesData={setSalesData}
          setLastnavigated={setLastnavigated} currentPage={currentPage} navigate={navigate}/>
      </div>
    </Modal>
  );
};

export default AddSalesModalToModify;
