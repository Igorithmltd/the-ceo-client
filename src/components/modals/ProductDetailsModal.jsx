import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import { ImCancelCircle } from "react-icons/im";
import { GrHelp } from "react-icons/gr";
import { useModal } from "../../context/ModalContext";
import ApiSetup, { formatCustomDate } from "../../utils/ApiSetup";
import { useAuth } from "../../context/AuthContext";
import PropTypes from "prop-types"; // Import PropTypes
import DetailRow from "../dashboard/DetailRow";
import { FaRegQuestionCircle } from "react-icons/fa";

const ProductDetailsModal = () => {
  const {
    isProductDetailOpen,
    setIsProductDetailOpen,
    currentProductId,
    setCurrentProductId,
    setIsEditProductOpen,
  } = useModal();
  const api = ApiSetup();
  const { userInfo } = useAuth();
  const { setAppLoading } = useModal();
  const { setIsProductOpen } = useModal();

  const [product, setProduct] = useState();

  const closeModal = () => {
    setIsProductDetailOpen(false);
    setCurrentProductId(null);
  };

  const editProductModal = () => {
    setIsProductDetailOpen(false);
    setIsEditProductOpen(true);
  };

  const baseUrl = "https://api.theceoapp.com/";

  useEffect(() => {
    if (userInfo?.masked_id && currentProductId) {
      getProduct();
    }
  }, [userInfo?.masked_id, currentProductId]);

  // console.log(currentProductId, "current id")

  const getProduct = async () => {
    setAppLoading(true);
    try {
      const data = {
        u_id: userInfo?.masked_id,
        productId: currentProductId,
      };

      const response = await api.post("getproductbyid", data);

      if (response?.data) {
        console.log(response?.data, "the result");
        setProduct(response?.data.datas);
      }
    } catch (error) {
      console.log(error, "the error");
    } finally {
      setAppLoading(false);
    }
  };

  const convertToDate = (dateString) => {
    if (!dateString) {
      return "No product selected"; // Return a default value or handle as needed
    }
    // Extract day, month, year from the string
    const day = dateString.substring(0, 2); // "21"
    const month = dateString.substring(2, 4); // "11"
    const year = dateString.substring(4, 8); // "2024"

    // Create a new Date object using the parsed values
    const formattedDate = new Date(`${year}-${month}-${day}`);

    // Get the month, day, and year
    const formattedMonth = formattedDate.getMonth() + 1; // getMonth() returns 0-indexed months (Jan = 0, Feb = 1, ...)
    const formattedDay = formattedDate.getDate(); // getDate() returns the day of the month
    const formattedYear = formattedDate.getFullYear(); // getFullYear() returns the full year

    // Return the formatted date string
    return `${formattedMonth}/${formattedDay}/${formattedYear}`; // For example "11/21/2024"
  };

  return (
    <Modal isOpen={isProductDetailOpen} closeModal={closeModal}>
      <div className="bg-white md:w-[90vw] w-full md:h-[90vh] overflow-auto">
        <div className="border-b md:border-none mb-3">
          <div className="flex pt-5 pb-2 items-center justify-between px-8  ">
            <div className="flex gap-4 ">
              <h2 className="text-[14px] md:text-[17px] font-bold">{product?.name}</h2>
              {product && (
                <span className="text-[13px] md:text-[14px] text-[#999999]">
                  Added on {formatCustomDate(product?.date)}
                </span>
              )}
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
          <div className="flex items-center justify-between px-8 mb-5">
            <span className="text-[14px]">₦{product?.unitsellingprice}</span>
            <FaRegQuestionCircle size={16} color="#999999" />
          </div>
        </div>
        <div className="flex gap-5 mt-5 flex-col md:flex-row md:h-[450px]">
          <div className="flex-1 flex justify-center items-center">
            <div className="aspect-square flex flex-col gap-5 justify-center items-center w-[85%] rounded-2xl">
              <img src={`${baseUrl}${product?.url}`} alt="" className="w-[85%]" />
            </div>
          </div>
          <div className="flex-1 flex flex-col gap-4 md:gap-2 p-2 px-4 font-extralight text-gray-500 md:h-full h-[100vh] overflow-y-auto">
            <DetailRow label="Product Name" value={product?.name} />
            <DetailRow label="Selling Price" value={product?.unitsellingprice} />
            <DetailRow label="Cost Price" value={product?.unitcostprice} />
            <DetailRow label="Expiry Date" value={convertToDate(product?.expiring_date)} />
            <DetailRow label="Total Quantity in Stock" value={product?.stock} />
            <DetailRow label="External Product Code" value={product?.externalcode} />
            <DetailRow label="Product Description" value={product?.description} />

            <div className="md:py-5 my-2 flex items-center justify-center px-1 md:px-12">
              <button
                onClick={() => editProductModal()}
                className="text-red py-4 my-4 px-4 border-red border-[2px] rounded-[50px] flex justify-center font-semibold text-[14px] md:gap-3 w-2/3 md:w-full"
              >
                Edit product information
              </button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ProductDetailsModal;
