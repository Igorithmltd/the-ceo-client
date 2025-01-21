import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import { ImCancelCircle } from "react-icons/im";
import { GrHelp } from "react-icons/gr";
import { useModal } from "../../context/ModalContext";
import ApiSetup from "../../utils/ApiSetup";
import { useAuth } from "../../context/AuthContext";
import FormField from "../dashboard/FormField";
import { FaRegQuestionCircle } from "react-icons/fa";

const AddProductModal = () => {
  const { isProductOpen, setIsProductOpen } = useModal();
  const api = ApiSetup();
  const { userInfo } = useAuth();
  const { setAppLoading } = useModal();

  const [productName, setProductName] = useState("");
  const [sellingPrice, setSellingPrice] = useState("");
  const [costPrice, setCostPrice] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [stock, setStock] = useState("");
  const [expiringDate, setExpiringDate] = useState("");
  const [externalProductCode, setExternalProductCode] = useState("");
  const [productFiles, setProductFiles] = useState([]);
  const [allProducts, setAllProducts] = useState([]);

  const closeModal = () => {
    setIsProductOpen(false);
  };

  //   useEffect(() => {
  //     if (userInfo?.masked_id) {
  //       getProducts();
  //     }
  //     async function getProducts() {
  //       const { data } = await api.post("getallproducts",{
  //         u_id: userInfo?.masked_id,
  //       });
  //       if (data?.datas) {
  //         setAllProducts(data?.datas);
  //       }
  //       console.log(data)
  //     }
  //   }, [userInfo?.masked_id]);

  const handleSumbmit = async () => {
    try {
      if (userInfo?.masked_id) {
        setIsProductOpen(false);
        setAppLoading(true);
        const formData = new FormData();
        formData.append("id", userInfo?.masked_id);
        formData.append("type", "newproduct");
        formData.append("productDescription", productDescription);
        formData.append("productname", productName);
        formData.append("stock", stock);
        formData.append("unitsellingprice", sellingPrice);
        formData.append("unitcostprice", costPrice);
        formData.append("externalProductCode", externalProductCode);

        const dateArray = expiringDate.split("-");
        const year = dateArray[0];
        const month = dateArray[1].padStart(2, "0");
        const day = dateArray[2];
        console.log(expiringDate);

        // const expiringDateISO = new Date(day, month - 1, year).toISOString();
        const expiringDateISO = `${day}-${month}-${year}`;
        console.log(expiringDateISO);
        formData.append("expiring_date", expiringDateISO);
        // formData.append("expiring_date", expiringDate);

        let fileLength = Array.from(productFiles).length;
        for (let i = 0; i < fileLength; i++) {
          formData.append("file" + i, productFiles[i]);
        }
        console.log(formData.values());
        const res = await api.postFormData("uploadproducts", formData);
        console.log(res.data);
        setAppLoading(false);
      }
    } catch (error) {
      setAppLoading(false);
      console.log(error);
    }
  };

  return (
    <Modal isOpen={isProductOpen} closeModal={closeModal}>
      <div className="bg-white md:w-[90vw] w-full md:h-[90vh]">
        <div className="border-b md:border-none mb-3">
          <div className="flex pt-5 pb-2 items-center justify-between px-8  ">
            <div className="flex gap-4 ">
              <h2 className="text-[14px] md:text-[17px] font-bold">Add new product</h2>
              <span className="text-[13px] md:text-[14px] text-[#999999]">
                7th Jul, 2024 | 11:45 AM
              </span>
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
          <div className="flex items-center justify-between px-8">
            <span className="text-[14px]">₦</span>
            <FaRegQuestionCircle size={16} color="#999999" />
          </div>
        </div>
        <div className="flex gap-5  flex-col md:flex-row md:h-[450px]">
          <div className="flex-1 flex justify-center items-center">
            <div className="bg-grey-40 p-8 aspect-square md:p-1 md:h-full flex flex-col gap-4 justify-center items-center w-4/5 rounded-2xl">
              <label
                htmlFor="file-upload"
                className="bg-grey p-[30px]  md:p-[50px] bg-opacity-[0.7] rounded-full cursor-pointer flex justify-center items-center"
              >
                <img src="/images/camera.png" alt="Camera Icon" className="w-[55px] md:w-[87px]" />
              </label>

              <input
                id="file-upload"
                type="file"
                accept=".jpg,.jpeg,.png"
                onChange={(e) => setProductFiles(e.target.files)}
                className="hidden"
              />

              <p className="text-[14px] font-medium text-white">Add product images (Up to 5)</p>
            </div>
          </div>
          <div className="flex-1 px-4 overflow-y-auto">
            <div className="p-2 font-extralight text-gray-500 md:h-full ">
              <FormField
                label="Product Name"
                value={productName}
                required
                onChange={(e) => setProductName(e.target.value)}
              />

              <FormField
                label="Selling Price"
                value={sellingPrice}
                required
                onChange={(e) => setSellingPrice(e.target.value)}
              />

              <FormField
                label="Cost Price"
                value={costPrice}
                onChange={(e) => setCostPrice(e.target.value)}
              />

              <FormField
                label="Product Expiry date"
                value={expiringDate}
                type="date"
                onChange={(e) => setExpiringDate(e.target.value)}
              />

              <FormField
                label="Total Quantity in Stock"
                value={stock}
                required
                onChange={(e) => setStock(e.target.value)}
              />

              <FormField
                label="External Product Code"
                value={externalProductCode}
                onChange={(e) => setExternalProductCode(e.target.value)}
              />

              <FormField
                label="Product Description"
                value={productDescription}
                onChange={(e) => setProductDescription(e.target.value)}
              />

              <div className="flex justify-between gap-5 items-center px-1 mt-8 md:px-12  md:py-3 text-[14px] text-gray-400">
                The information you enter here is visible only to you
              </div>

              <FormField
                label="Product Serial Number"
                value={externalProductCode}
                onChange={(e) => setExternalProductCode(e.target.value)}
              />

              <FormField
                label="Private Note"
                value={externalProductCode}
                onChange={(e) => setExternalProductCode(e.target.value)}
              />

              <div className="md:py-5 my-2 flex items-center justify-center px-1 md:px-12">
                <button
                  onClick={handleSumbmit}
                  className="text-red py-4 my-4 px-4 border-red border-[2px] rounded-[50px] flex justify-center font-semibold text-[14px] md:gap-3 w-2/3 md:w-full"
                >
                  Add Product
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default AddProductModal;
