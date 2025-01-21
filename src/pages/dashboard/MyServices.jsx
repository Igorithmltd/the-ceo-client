import React , {useEffect, useState }from "react";
import SearchInput from "../../components/SearchInput";
import { AiOutlineRise } from "react-icons/ai";
import { BiSort } from "react-icons/bi";
import { PiDotsThree } from "react-icons/pi";
import { CiCircleQuestion } from "react-icons/ci";
import { GiSettingsKnobs } from "react-icons/gi";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { FiPlus } from "react-icons/fi";
import { useAuth } from "../../context/AuthContext";
import ApiSetup, { parseCustomDate } from "../../utils/ApiSetup";
import { useModal } from "../../context/ModalContext";
import AddServiceModal from "../../components/modals/AddServiceModal";
import ServiceDetailsModal from "../../components/modals/ServiceDetailsModal";
import EditServiceModal from "../../components/modals/EditServiceModal";
import moment from 'moment';
import { IoCheckmarkOutline } from "react-icons/io5";

const MyServices = () => {
  const {userInfo} = useAuth()
  const api = ApiSetup()
  const [allServices, setAllServices] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalServiceValue, setTotalServiceValue] = useState("")
  const [servicesPerPage, setServicesPerPage] = useState(5);
  const { setIsServiceOpen } = useModal();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);

  const [currentServices, setCurrentServices] = useState([])

  const [sortValue, setSortValue] = useState('asc')
  const [filterValue, setFilterValue] = useState('date-added')
  
  const { setIsServiceDetailOpen, setCurrentServiceId } = useModal();

  const openServiceDetailModal = (serviceId) => {
    setCurrentServiceId(serviceId);
    setIsServiceDetailOpen(true);
  };

  const baseUrl = "https://api.theceoapp.com/"

  const handleModalClose = () => {
    setIsServiceOpen(false);

  };

  const [serviceSales, setServiceSales] = useState({
    datedSales: 0,
    percentageChange: 0,
    servicesales: 0,
  });


  useEffect(()=> {
    if(userInfo?.masked_id){
      getTotalServiceValue(),
      getTotalServiceCounts(),
      getServiceSales(),
      getAllServices()
    }
  },[userInfo?.masked_id])
  
  const getTotalServiceCounts = async () => {
    try {
      const data = {
        u_id : userInfo?.masked_id,
        pivotedate : 30

      }
      // console.log({data})
      // const res = await api.post("registeruser", {
      const res = await api.post("getdatedtotalservicescounts", data)
      const totalrev = res.data["getdatedtotalservicescounts"]
      console.log(totalrev)
    } catch (error) {
      console.log(error,'the error')
    }
  }


  const getServiceSales = async () => {
    try {
      const data = {
        user_id: userInfo?.masked_id,
        pivotedate: 0,
      };
      const res = await api.post("servicesales", data);
      // const totalrev = res.data["gettotalrevenue"]
      setServiceSales({
        ...serviceSales,
        datedSales: res?.data.datedSales,
        percentageChange: res?.data?.percentageChange,
        servicesales: res?.data?.servicesales,
      });
    } catch (error) {
      console.log(error, "the error");
    }
  };

  const getTotalServiceValue = async () => {
    try {
      const data = {
        u_id: userInfo?.masked_id,
      };
      const res = await api.post("gettotalservicevalue", data);
      setTotalServiceValue({
        ...totalServiceValue,
        totalservicecount: res?.data.totalservicecount,
        totalservicevalue: res?.data?.totalservicevalue,
      });
      console.log(totalServiceValue)
    } catch (error) {
      console.log(error, "the error");
    }
  };

  const getAllServices = async () => {
    try {
      const data = {
        u_id : userInfo?.masked_id

      }
      const services = await api.post("getallservices", data)
      
      if (services?.data) {
        console.log(services,'the result')
        setAllServices(services?.data.datas);
      }
    } catch (error) {
      console.log(error,'the error')
    }
  }

  useEffect(()=>{

    let newServices = [...allServices]
    if(filterValue == 'date-added'){
      newServices = newServices.sort((a, b)=> parseCustomDate(a.date) - parseCustomDate(b.date))
    }else if(filterValue == 'selling-price'){
      newServices = newServices.sort((a, b)=> a.amount - b.amount)
    }else if(filterValue == 'no-of-sales'){
      newServices = newServices.sort((a, b)=> parseInt(a.totalSales) - parseInt(b.totalSales))
    }

    if (sortValue == 'desc') {
      newServices = [...newServices].reverse();
    }
    const indexOfLastService = currentPage * servicesPerPage;
    const indexOfFirstService = indexOfLastService - servicesPerPage;
    const currentServices = newServices.slice(indexOfFirstService, indexOfLastService);

    // const indexOfLastProduct = currentPage * productsPerPage;
    // const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    // const currProducts = newProducts.slice(indexOfFirstProduct, indexOfLastProduct);
    setCurrentServices(currentServices)
  },[currentPage, allServices, sortValue, filterValue])


  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleToggleFilterDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen); // Toggle dropdown visibility
  };

  const handleToggleSortDropdown = () => {
    setIsSortDropdownOpen(!isSortDropdownOpen); // Toggle dropdown visibility
  };

  const handleSort = (value)=>{
    setSortValue(value)
  }
  
  const handleFilter = (value)=>{
    setFilterValue(value)
  }

  return (
    <div className="flex flex-col w-full h-[90vh] overflow-auto hide-scrollbar">
      <header className="px-6 py-4 border-b md:border-t w-full">
        <span className="font-bold">My Service</span>
      </header>
      <section className="p-6 flex flex-col gap-4 mb-[70px]">
        <article className="md:hidden">
          <SearchInput />
        </article>
        <article className="flex flex-col md:flex-row gap-4 mt-4 md:mt-0 rounded-md">
          <div className="flex flex-col md:flex-row w-full gap-4 flex-wrap">
            <div className="flex flex-col md:grid md:grid-cols-3 w-full gap-4 flex-wrap">
              <div className="pt-2 pl-6 pb-2 pr-2 border rounded flex flex-col gap-5">
                <div className="flex items-center">
                  <div className="flex items-center gap-2 pt-2">
                    <span className="font-bold md:text-xs">
                      Total service sales (#)
                    </span>
                    <span className="rounded-full bg-green-100 text-xs flex px-1 items-center text-green-500">
                      <AiOutlineRise /> 6.5%
                    </span>
                  </div>
                  <div className="ml-auto mb-auto">
                    <span className="text-gray-400 ml-auto">
                      <CiCircleQuestion />
                    </span>
                  </div>
                </div>
                <span className="text-xl font-bold">{totalServiceValue?.totalservicecount}</span>
                <span className="mt-3 text-xs text-gray-400 flex items-center">
                  last 30 days{" "}
                  <PiDotsThree className="ml-auto text-sm bg-gray-100 rounded b-2 text-gray-700" />
                </span>
              </div>
              <div className="pt-2 pl-6 pb-2 pr-2 border rounded flex flex-col gap-5">
                <div className="flex items-center">
                  <div className="flex items-center gap-2 pt-2">
                    <span className="font-bold md:text-xs">
                      Total service sales (₦)
                    </span>
                    <span className="rounded-full bg-green-100 text-xs flex px-1 items-center text-green-500">
                      <AiOutlineRise /> {serviceSales?.percentageChange}%
                    </span>
                  </div>
                  <div className="ml-auto mb-auto">
                    <span className="text-gray-400 ml-auto">
                      <CiCircleQuestion />
                    </span>
                  </div>
                </div>
                <span className="text-xl font-bold">₦{serviceSales?.servicesales}</span>
                <span className="mt-3 text-xs text-gray-400 flex items-center">
                  last 30 days{" "}
                  <PiDotsThree className="ml-auto text-sm bg-gray-100 rounded b-2 text-gray-700" />
                </span>
              </div>
              <div className="pt-2 pl-6 pb-2 pr-2 border rounded flex flex-col gap-5">
                <div className="flex items-center">
                  <div className="flex items-center gap-2 pt-2">
                    <span className="font-bold md:text-xs">
                      Total service Value
                    </span>
                  </div>
                  <div className="ml-auto mb-auto">
                    <span className="text-gray-400 ml-auto">
                      <CiCircleQuestion />
                    </span>
                  </div>
                </div>
                <span className="text-xl font-bold">₦{totalServiceValue?.totalservicevalue}</span>
              </div>
            </div>
          </div>
        </article>
      </section>
      <section className="px-6">
        <div className="border p-2">
          <div className="py-3 items-center flex justify-between border-b-2">
            <span>Total Services ({allServices.length})</span>
            <div className="flex md:gap-5 text-gray-600">
              <div className="md:bg-gray-200 flex h-[36px] md:px-4 px-2 text-sm items-center gap-2 rounded-lg relative">
                <span className="hidden md:block">Filter</span>
                <BiSort cursor={"pointer"}
                onClick={handleToggleFilterDropdown}
                 />
                {isDropdownOpen && (
                  <div className="absolute right-[5px] top-[65%] 
                    md:right-0 md:top-[75%] bg-white border 
                      border-gray-300 rounded shadow-lg 
                        mt-1 z-10 w-[150px] md:w-fit">
                    <div 
                      onClick={(e)=> handleFilter('no-of-sales')}
                      className="px-4 py-2 cursor-pointer hover:bg-gray-100 relative" 
                      // onClick={() => handleSelectDays(30)}
                    >
                      {filterValue == 'no-of-sales' && <IoCheckmarkOutline className="absolute right-1" color="green" size={12} />}
                      By no. of sales
                    </div>
                    <div 
                      onClick={(e)=> handleFilter('selling-price')}
                      className="px-4 py-2 cursor-pointer hover:bg-gray-100 relative" 
                      // onClick={() => handleSelectDays(60)}
                    >
                      {filterValue == 'selling-price' && <IoCheckmarkOutline className="absolute right-1" color="green" size={12} />}
                      By selling price
                    </div>
                    <div 
                      onClick={(e)=> handleFilter('date-added')}
                      className="px-4 py-2 cursor-pointer hover:bg-gray-100 relative" 
                      // onClick={() => handleSelectDays(90)}
                    >
                      {filterValue == 'date-added' && <IoCheckmarkOutline className="absolute right-1" color="green" size={12} />}
                      By date added
                    </div>
                  </div>
                )}
              </div>
              <div className="md:bg-gray-200 flex h-[36px] md:px-4 px-2 text-sm items-center gap-2 rounded-lg relative">
                <span className="hidden md:block">Sort order</span>
                <GiSettingsKnobs cursor={"pointer"} className="rotate-90"
                onClick={handleToggleSortDropdown}
                 />
                {isSortDropdownOpen && (
                  <div className="absolute right-[5px] top-[65%] md:right-0 md:top-[75%] bg-white border border-gray-300 rounded shadow-lg mt-1 z-10">
                    <div 
                      className="px-4 py-2 cursor-pointer hover:bg-gray-100 relative" 
                      onClick={() => handleSort('asc')}
                    >
                      {sortValue == 'asc' && <IoCheckmarkOutline className="absolute right-1" color="green" size={12} />}
                      Ascending
                    </div>
                    <div 
                      className="px-4 py-2 cursor-pointer hover:bg-gray-100 relative" 
                      onClick={() => handleSort('desc')}
                    >
                      {sortValue == 'desc' && <IoCheckmarkOutline className="absolute right-1" color="green" size={12} />}
                      Descending
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="pt-5 px-6">
            <div className="flex md:hidden text-[10px] mt-4 text-gray-400 gap-1">
              <IoIosInformationCircleOutline />
              <span>Click on a product to view details</span>
            </div>
            {currentServices.map((service) => (
            <div key={service?.id} className="flex justify-between items-center gap-2 mb-5">
              <div className="flex flex-col md:flex-row bg-rded flex-[3] md:gap-12 py-3 md:items-center">
                <div className="flex flex-col gap-1">
                  {/* let url = `{baseUrl}{service?.url}` */}
                  <img src={`${baseUrl}${service?.url}`} alt="" className="rounded-full w-[60px] h-[60px] " />
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex gap-4 items-center">
                    <h4 className="">{service?.name}</h4>
                    <span className="text-gray-400 text-sm">
                    Added on {moment(service.date, 'DDMMYYYYHHmmss').format('Do MMM, YYYY | h:mm A')}
                    </span>
                  </div>
                  <div>
                    <span className="font-extralight text-xs">Starting from ₦{service?.amount}</span>
                  </div>
                </div>
                
              </div>
              <div className="flex-[1.1] flex items-center justify-between md:px-5">
                <span className="text-sm">{service?.totalSales} sales</span>
                <span 
                  onClick={() => openServiceDetailModal(service?.id)}
                  className="cursor-pointer hidden md:block text-blue underline text-sm"
                  >
                  Views
                </span>
              </div>
            </div>
            ))}
          </div>
          <section className="my-8 flex justify-center mb-20">
            <div className="w-[90%] py-2 flex justify-center items-center md:gap-5 gap-3">
              <span className="text-sm">Showing page {currentPage} of {Math.ceil(allServices.length / servicesPerPage)}</span>
              <button
                className="bg-gray-600 h-[40px] rounded-full flex justify-center items-center w-[40px]"
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <FaChevronLeft color="white" />
              </button>
              {[...Array(Math.ceil(allServices.length / servicesPerPage)).keys()].map((pageNumber) => (
                <button
                  key={pageNumber}
                  className={`bg-gray-600 h-[40px] rounded-full flex justify-center items-center w-[40px] ${
                    pageNumber + 1 === currentPage ? "bg-blue-600" : ""
                  }`}
                  onClick={() => paginate(pageNumber + 1)}
                >
                  {pageNumber + 1}
                </button>
              ))}
              <button
                className="bg-gray-600 h-[40px] rounded-full flex justify-center items-center w-[40px]"
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === Math.ceil(allServices.length / servicesPerPage)}
              >
                <FaChevronRight color="white" />
              </button>
            </div>
          </section>
        </div>
      </section>
      <article className="relative">
        <button
          className="flex gap-4 rounded-full ml-auto mb-20 md:mb-4 p-4 text-center text-white 
          bg-gradient-to-r from-red-700 to-red-600
          fixed bottom-4 right-4 z-10 shadow-lg hover:scale-105 transition-transform"
          onClick={() => setIsServiceOpen(true)}
          >
         <FiPlus /> <span className="hidden md:block">Add new service</span>
         </button>
         <AddServiceModal onClose={handleModalClose} />
         <ServiceDetailsModal onClose={handleModalClose} />
         <EditServiceModal onClose={handleModalClose} />
      </article>
    </div>
  );
};

export default MyServices;
