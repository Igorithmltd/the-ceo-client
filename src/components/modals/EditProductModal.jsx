import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import { ImCancelCircle } from "react-icons/im";
import { GrHelp } from "react-icons/gr";
import { useModal } from "../../context/ModalContext";
import ApiSetup from "../../utils/ApiSetup";
import { useAuth } from "../../context/AuthContext";
import FormField from "../dashboard/FormField";
import { FaRegQuestionCircle } from "react-icons/fa";

const EditProductModal = () => {
  const { isEditProductOpen, setIsEditProductOpen, currentProductId } = useModal();
  const api = ApiSetup();
  const { userInfo } = useAuth();
  const { setAppLoading } = useModal();

  const [productName, setProductName] = useState("");
  const [productId, setProductId] = useState("");
  const [sellingPrice, setSellingPrice] = useState("");
  const [costPrice, setCostPrice] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [stock, setStock] = useState("");
  const [expiringDate, setExpiringDate] = useState("");
  const [externalProductCode, setExternalProductCode] = useState("");
  const [productFile, setProductFile] = useState([]);
  const [oldUrl, setOldUrl] = useState("");
  const [editfile, setEditfile] = useState("no");

  const closeModal = () => {
    setIsEditProductOpen(false);
  };

  const baseUrl = "https://api.theceoapp.com/";

  const [product, setProduct] = useState();

  const [dpUrl, setDpUrl] = useState();

  useEffect(() => {
    if (userInfo?.masked_id && currentProductId) {
      getProduct();
    }
  }, [userInfo?.masked_id, currentProductId]);

  // Log product whenever it updates
  useEffect(() => {
    if (product) {
      console.log(product, "product after");
      // Set other states based on product here if needed

      // Set current values
      setProductName(product.name);
      setProductId(product.id);
      setSellingPrice(product.unitsellingprice);
      setCostPrice(product.unitcostprice);
      setProductDescription(product.description);
      setStock(0);
      setExternalProductCode(product.externalcode);
      setExpiringDate(convertToDate(product.expiring_date));
      setOldUrl(product?.url);
      setEditfile("no");

      if (product?.url) {
        setDpUrl(`${baseUrl}${product.url}`);
      } else {
        setDpUrl(""); // Set to an empty string if no URL is available
      }
    }
  }, [product]);

  const getProduct = async () => {
    setAppLoading(true);
    try {
      const data = {
        u_id: userInfo?.masked_id,
        productId: currentProductId,
      };

      console.log(product, "product before");

      console.log(currentProductId, "current id of edit");

      const response = await api.post("getproductbyid", data);

      if (response?.data) {
        console.log(response?.data, "the result");
        setProduct(response?.data.datas);
        // console.log(product, "product after")
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
    return `${formattedYear}-${formattedMonth}-${formattedDay}`; // For example "11/21/2024"
  };

  const handleSumbmit = async () => {
    try {
      if (userInfo?.masked_id) {
        setIsEditProductOpen(false);
        setAppLoading(true);
        const formData = new FormData();
        formData.append("id", userInfo?.masked_id);
        formData.append("type", "oldproduct");
        formData.append("productDescription", productDescription);
        formData.append("productname", productName);
        formData.append("productId", productId);
        formData.append("addstock", stock);
        formData.append("unitsellingprice", sellingPrice);
        formData.append("unitcostprice", costPrice);
        formData.append("externalProductCode", externalProductCode);
        formData.append("oldurl", oldUrl);
        formData.append("editfile", editfile);
        formData.append("file", productFile);

        const dateArray = expiringDate.split("-");
        const year = dateArray[0];
        const month = dateArray[1].padStart(2, "0");
        const day = dateArray[2];
        console.log(expiringDate);

        // const expiringDateISO = new Date(day, month - 1, year).toISOString();
        const expiringDateISO = `${day}-${month}-${year}`;
        console.log(expiringDateISO);
        formData.append("expiring_date", expiringDateISO);
        // Log the FormData values
        for (let [key, value] of formData.entries()) {
          console.log(`${key}:`, value);
        }

        const res = await api.postFormData("uploadproducts", formData);
        console.log(res.data);
        setAppLoading(false);
      }
    } catch (error) {
      setAppLoading(false);
      console.log(error);
    }
  };

  //   const handleFileChange = (event) => {
  //     // Get the selected file(s)
  //     const selectedFile = event.target.files[0]; // if single file selected
  //     // For multiple files, you could use event.target.files
  //     setProductFile(selectedFile); // Save the selected file in the state
  //   };

  // Handle file change
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0]; // Get the first selected file

    if (selectedFile) {
      setProductFile(selectedFile); // Set the selected file in state
      setEditfile("yes"); // Set flag to true (file has been selected)
      // Create a URL for the selected file and set it to dpUrl
      const fileUrl = URL.createObjectURL(selectedFile);
      setDpUrl(fileUrl); // Update dpUrl with the new file URL
    } else {
      setProductFile(null); // If no file is selected, set file to null
      setEditfile("no"); // Set flag to false (no file selected)
    }
  };

  return (
    <Modal isOpen={isEditProductOpen} closeModal={closeModal}>
      <div className="bg-white md:w-[90vw] w-full md:h-[90vh] overflow-auto">
        <div className="border-b md:border-none mb-3">
          <div className="flex pt-5 pb-2 items-center justify-between px-8  ">
            <div className="flex gap-4 ">
              <h2 className="text-[14px] md:text-[17px] font-bold">Edit product</h2>
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
        <div className="flex gap-5 mt-5 flex-col md:flex-row md:h-[450px] ">
          <div className="flex-1 flex justify-center items-center">
            <div className="relative bg-gray-800 aspect-square flex flex-col items-center justify-center w-4/5 rounded-2xl overflow-hidden">
              <img
                src={dpUrl || "/placeholder-image.jpg"} // Use a placeholder if no image is provided
                alt="Product Preview"
                className="absolute top-0 left-0 w-full h-full object-cover"
              />
              <div className="w-full h-full bg-black bg-opacity-[.8] z-[10] grid place-items-center">
                <label
                  htmlFor="file-upload"
                  className="absolute bg-grey p-[30px]  md:p-[50px] rounded-full cursor-pointer flex justify-center items-center"
                >
                  <img src="/images/camera.png" alt="Camera Icon" />
                </label>
              </div>

              <input
                id="file-upload"
                type="file"
                accept=".jpg,.jpeg,.png"
                onChange={(e) => setDpUrl(URL.createObjectURL(e.target.files[0]))} // Update dpUrl dynamically
                className="hidden"
              />

              {/* Caption Text */}
              <p className="absolute bottom-4 text-[14px] font-semibold text-white z-50">Change image</p>
            </div>
          </div>
          <div className="flex-1 px-4 overflow-y-auto">
            <div className="p-2 font-extralight text-gray-500 md:h-full ">
              <FormField
                label="Product Name"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
              />

              <FormField
                label="Selling Price"
                value={sellingPrice}
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

              <div className="md:py-5 my-2 flex items-center justify-center px-1 md:px-12">
                <button
                  onClick={handleSumbmit}
                  className="text-red py-4 my-4 px-4 border-red border-[2px] rounded-[50px] flex justify-center font-semibold text-[14px] md:gap-3 w-2/3 md:w-full"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default EditProductModal;
