import React, { useEffect, useState } from "react";
import SearchInput from "../../components/SearchInput";
import { AiOutlineRise } from "react-icons/ai";
import { BiSort } from "react-icons/bi";
import { PiDotsThree } from "react-icons/pi";
import { CiCircleQuestion } from "react-icons/ci";
import { GiSettingsKnobs } from "react-icons/gi";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { useModal } from "../../context/ModalContext";
import { useAuth } from "../../context/AuthContext";
import ApiSetup, { formatCustomDate, parseCustomDate } from "../../utils/ApiSetup";
import ProductDetailsModal from "../../components/modals/ProductDetailsModal";
import EditProductModal from "../../components/modals/EditProductModal";
import { IoCheckmarkOutline } from "react-icons/io5";
import StatCard from "../../components/dashboard/StatCard";
import { MdOutlineRemoveRedEye } from "react-icons/md";

const MyProducts = () => {
  const { userInfo } = useAuth();
  const [allProducts, setAllProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(5);
  const [sortValue, setSortValue] = useState("asc");
  const [filterValue, setFilterValue] = useState("date-added");

  const api = ApiSetup();

  const [currentProducts, setCurrentProducts] = useState([]);

  const baseUrl = "https://api.theceoapp.com/";

  useEffect(() => {
    if (userInfo?.masked_id) {
      getProducts(), getProductSales(), getTotalProductValue();
    }
  }, [userInfo?.masked_id]);

  const { setIsProductOpen } = useModal();
  const { setIsProductDetailOpen, setCurrentProductId } = useModal();

  const openProductDetailModal = (productId) => {
    setCurrentProductId(productId);
    setIsProductDetailOpen(true);
  };

  useEffect(() => {
    let newProducts = [...allProducts];
    if (filterValue == "date-added") {
      newProducts = newProducts.sort((a, b) => parseCustomDate(a.date) - parseCustomDate(b.date));
    } else if (filterValue == "selling-price") {
      newProducts = newProducts.sort((a, b) => a.unitsellingprice - b.unitsellingprice);
    } else if (filterValue == "no-of-sales") {
      newProducts = newProducts.sort((a, b) => parseInt(a.numofsales) - parseInt(b.numofsales));
    }

    if (sortValue == "desc") {
      newProducts = [...newProducts].reverse();
    }

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currProducts = newProducts.slice(indexOfFirstProduct, indexOfLastProduct);
    setCurrentProducts(currProducts);
  }, [currentPage, allProducts, sortValue, filterValue]);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const [productSales, setProductSales] = useState({
    datedSales: 0,
    percentageChange: 0,
    productsales: 0,
  });

  const [totalProductValue, setTotalProductValue] = useState({
    datedSales: 0,
    percentageChange: 0,
    productsales: 0,
  });

  const getProducts = async () => {
    try {
      const data = {
        u_id: userInfo?.masked_id,
      };
      const products = await api.post("getallproducts", data);

      if (products?.data) {
        setAllProducts(products?.data.datas);
      }
    } catch (error) {
      console.log(error, "the error");
    }
  };

  const getProductSales = async () => {
    try {
      const data = {
        user_id: userInfo?.masked_id,
        pivotedate: 0,
      };
      const res = await api.post("productsales", data);
      // const totalrev = res.data["gettotalrevenue"]
      setProductSales({
        ...productSales,
        datedSales: res?.data.datedSales,
        percentageChange: res?.data?.percentageChange,
        productsales: res?.data?.productsales,
      });
    } catch (error) {
      console.log(error, "the error");
    }
  };

  const getTotalProductValue = async () => {
    try {
      const data = {
        u_id: userInfo?.masked_id,
      };
      const res = await api.post("gettotalproductvalues", data);
      setTotalProductValue({
        ...totalProductValue,
        totalproductcount: res?.data.totalproductcount,
        totalproductvalues: res?.data?.totalproductvalues,
      });
    } catch (error) {
      console.log(error, "the error");
    }
  };
  const handleModalClose = () => {
    setIsProductDetailOpen(false);
  };

  const [days, setDays] = useState(30);
  const [days_total_sales_naira, setDays_total_sales_naira] = useState(30);
  const [isDropdownOpen_total_sales, setIsDropdownOpen_total_sales] = useState(false);
  const [isDropdownOpen_total_sales_naira, setIsDropdownOpen_total_sales_naira] = useState(false);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);

  const handleSelectDays = (value) => {
    setDays(value);
    setIsDropdownOpen_total_sales(false); // Close dropdown after selection
  };

  const handleSelectDays_total_sales_naira = (value) => {
    setDays_total_sales_naira(value);
    setIsDropdownOpen_total_sales_naira(false); // Close dropdown after selection
  };

  const handleToggleDropdown = () => {
    setIsDropdownOpen_total_sales(!isDropdownOpen_total_sales); // Toggle dropdown visibility
  };

  const handleToggleDropdown_total_sales_naira = () => {
    setIsDropdownOpen_total_sales_naira(!isDropdownOpen_total_sales_naira); // Toggle dropdown visibility
  };

  const handleToggleFilterDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen); // Toggle dropdown visibility
  };

  const handleToggleSortDropdown = () => {
    setIsSortDropdownOpen(!isSortDropdownOpen); // Toggle dropdown visibility
  };

  const handleSort = (value) => {
    setSortValue(value);
  };

  const handleFilter = (value) => {
    setFilterValue(value);
  };

  console.log(allProducts[0], "product name");

  return (
    <div className="flex flex-col w-full h-[90vh] overflow-auto hide-scrollbar">
      <header className="px-6 py-4 border-b md:border-t w-full">
        <span className="font-semibold text-[19px]">My Products</span>
      </header>
      <section className="p-6 flex flex-col gap-4 mb-[20px]">
        <article className="md:hidden">
          <SearchInput />
        </article>
        <article className="flex flex-col md:flex-row gap-4 mt-4 md:mt-0 rounded-md">
          <div className="flex flex-col md:flex-row w-full gap-4 flex-wrap">
            <div className="flex flex-col md:grid md:grid-cols-3 w-full gap-4 flex-wrap">
              <StatCard
                title="Total product sales"
                value={totalProductValue?.totalproductcount}
                percentageChange={6.5}
                days={days}
                isCash={false}
                onToggleDropdown={handleToggleDropdown}
                isDropdownOpen={isDropdownOpen_total_sales}
                onSelectDays={handleSelectDays}
              />

              <StatCard
                title="Total product sales (₦)"
                value={productSales?.productsales}
                percentageChange={productSales?.percentageChange}
                days={days_total_sales_naira}
                onToggleDropdown={handleToggleDropdown_total_sales_naira}
                isDropdownOpen={isDropdownOpen_total_sales_naira}
                onSelectDays={handleSelectDays_total_sales_naira}
              />

              <div className="pt-2 pl-6 pb-2 pr-2 w-full border rounded flex flex-col gap-2">
                <div className="flex items-center">
                  <div className="flex items-center gap-2 pt-2 text-[13px]">
                    <span className="font-bold ">Total Stock Valu</span>
                    <MdOutlineRemoveRedEye />
                  </div>
                  <div className="ml-auto mb-auto">
                    <span className="text-gray-400 ml-auto text-[16px]">
                      <CiCircleQuestion />
                    </span>
                  </div>
                </div>
                <span className="text-[23px] font-bold mt-6 ">
                  ₦{totalProductValue?.totalproductvalues}
                </span>
              </div>
            </div>
          </div>
        </article>
      </section>
      <section className="px-6 mb-[70px]">
        <div className="border p-2">
          <div className="p-3 items-center flex justify-between border-b-2">
            <span className="text-[14px] md:text-[16px] font-bold">
              Total Products ({allProducts.length})
            </span>
            <div className="flex md:gap-5 text-[#4D4D4D]">
              <div
                className="md:bg-grey-5 flex md:py-1 md:px-4 px-2 text-[13px] font-bold cursor-pointer items-center gap-2 rounded-[3px] relative"
                onClick={handleToggleFilterDropdown}
              >
                <span className="hidden md:block">Filter</span>
                <GiSettingsKnobs size={16.25} className="rotate-90" />
                {isDropdownOpen && (
                  <div
                    className="absolute right-[-50px] top-[85%] 
                    md:right-[-50%] md:top-[100%] bg-white border 
                      border-gray-300 rounded shadow-lg 
                        mt-1 z-10 min-w-[150px] md:w-fit"
                  >
                    <div
                      onClick={(e) => handleFilter("no-of-sales")}
                      className="px-4 py-2 cursor-pointer hover:bg-gray-100 relative"
                    >
                      {filterValue == "no-of-sales" && (
                        <IoCheckmarkOutline className="absolute right-1" color="green" size={12} />
                      )}
                      By no. of sales
                    </div>
                    <div
                      onClick={(e) => handleFilter("selling-price")}
                      className="px-4 py-2 cursor-pointer hover:bg-gray-100 relative"
                    >
                      {filterValue == "selling-price" && (
                        <IoCheckmarkOutline className="absolute right-1" color="green" size={12} />
                      )}
                      By selling price
                    </div>
                    <div
                      onClick={(e) => handleFilter("date-added")}
                      className="px-4 py-2 cursor-pointer hover:bg-gray-100 relative"
                    >
                      {filterValue == "date-added" && (
                        <IoCheckmarkOutline className="absolute right-1" color="green" size={12} />
                      )}
                      By date added
                    </div>
                  </div>
                )}
              </div>
              <div
                className="md:bg-grey-5 flex md:py-[5px] md:px-4 px-2 text-[13px] font-bold cursor-pointer items-center gap-2 rounded-[3px] relative"
                onClick={handleToggleSortDropdown}
              >
                <span className="hidden md:block">Sort order</span>
                <BiSort size={16.25} />
                {isSortDropdownOpen && (
                  <div
                    className="absolute right-[-20px] top-[85%] 
                  md:right-[5%] md:top-[100%] bg-white border 
                    border-gray-300 rounded shadow-lg 
                      mt-1 z-10 min-w-4  md:w-fit"
                  >
                    <div
                      className="px-4 py-2 cursor-pointer hover:bg-gray-100 relative"
                      onClick={() => handleSort("asc")}
                    >
                      {sortValue == "asc" && (
                        <IoCheckmarkOutline className="absolute right-1" color="green" size={12} />
                      )}
                      Ascending
                    </div>
                    <div
                      className="px-4 py-2 cursor-pointer hover:bg-gray-100 relative"
                      onClick={() => handleSort("desc")}
                    >
                      {sortValue == "desc" && (
                        <IoCheckmarkOutline className="absolute right-1" color="green" size={12} />
                      )}
                      Descending
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="pt-5 px-2 md:px-6">
            <div className="flex items-center justify-center md:hidden text-[12px] my-4 text-[#8390B3] gap-1">
              <IoIosInformationCircleOutline />
              <span>Click on a product to view details</span>
            </div>
            {currentProducts.map((product) => (
              <div key={product?.id} className="flex justify-between gap-2 mb-5">
                <div className="flex flex-[5] md:flex-[3] gap-4 md:gap-12 py-3 md:items-center">
                  <div className="">
                    {/* let url = `{baseUrl}{service?.url}` */}
                    <img
                      src={`${baseUrl}${product?.url}`}
                      alt=""
                      className="rounded-full size-[28px] md:size-[56px]"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="flex gap-4 items-center">
                      <h4
                        className="text-[14px] md:text-[16px] font-bold"
                        onClick={() => openProductDetailModal(product?.id)}
                      >
                        {product?.name}
                      </h4>
                      <span className="hidden md:block text-gray-400 text-[14px]">
                        Added on {formatCustomDate(product?.date)}
                      </span>
                    </div>
                    <div>
                      <span className="font-extralight text-[14px]">
                        ₦{product?.unitsellingprice}
                      </span>
                    </div>
                    <span className="md:hidden text-gray-400 text-[11px]">
                      Added on {formatCustomDate(product?.date)}
                    </span>
                  </div>
                </div>
                <div className="flex-[1.1] flex md:items-center justify-between md:px-5">
                  <span className="text-[14px] md:text-[17px] text-[#838383]">
                    {product?.numofsales} sales
                  </span>
                  <span
                    onClick={() => openProductDetailModal(product?.id)}
                    className="cursor-pointer hidden md:block text-[#4647AB] underline text-[16px]"
                  >
                    View
                  </span>
                </div>
              </div>
            ))}
          </div>
          <section className="my-8 flex justify-center">
            {allProducts.length > 0 && (
              <div className="w-[90%] py-2 flex justify-center items-center md:gap-5 gap-3">
                <span className="text-[14px]">
                  Showing page {currentPage} of {Math.ceil(allProducts.length / productsPerPage)}
                </span>
                <button
                  className="bg-gray-600 h-[40px] rounded-full flex justify-center items-center w-[40px]"
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  <FaChevronLeft color="white" />
                </button>
                {[...Array(Math.ceil(allProducts.length / productsPerPage)).keys()].map(
                  (pageNumber) => (
                    <button
                      key={pageNumber}
                      className={`bg-gray-600 h-[40px] rounded-full flex justify-center items-center w-[40px] ${
                        pageNumber + 1 === currentPage ? "bg-blue-600" : ""
                      }`}
                      onClick={() => paginate(pageNumber + 1)}
                    >
                      {pageNumber + 1}
                    </button>
                  )
                )}
                <button
                  className="bg-gray-600 h-[40px] rounded-full flex justify-center items-center w-[40px]"
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === Math.ceil(allProducts.length / productsPerPage)}
                >
                  <FaChevronRight color="white" />
                </button>
              </div>
            )}
          </section>
        </div>
      </section>
      <section className="relative">
        <button
          onClick={() => setIsProductOpen(true)}
          className="flex items-center gap-4 rounded-full ml-auto mb-20 md:mb-4 p-4 bg-radial-gradient  md:w-auto text-center md:px-5 py-4 text-[36px] md:text-[16px] font-bold text-white fixed  bottom-6 md:bottom-4 right-4 z-10 shadow-lg hover:scale-105 transition-transform"
        >
          <FaPlus /> <span className="hidden md:block">Add new product</span>
        </button>

        <ProductDetailsModal onClose={handleModalClose} />
        <EditProductModal onClose={handleModalClose} />
      </section>
    </div>
  );
};

export default MyProducts;
