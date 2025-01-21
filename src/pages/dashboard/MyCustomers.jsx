import React , {useEffect, useState }from "react";
import SearchInput from "../../components/SearchInput";
import { AiOutlineRise } from "react-icons/ai";
import { BiSort } from "react-icons/bi";
import { PiDotsThree } from "react-icons/pi";
import { CiCircleQuestion } from "react-icons/ci";
import { GiSettingsKnobs } from "react-icons/gi";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { FiPlus } from "react-icons/fi";
import { useAuth } from "../../context/AuthContext";
import ApiSetup from "../../utils/ApiSetup";
import { useModal } from "../../context/ModalContext";
import AddCustomerModal from "../../components/modals/AddCustomerModal";
import AddDebtorModal from "../../components/modals/AddDebtorModal";

const MyCustomers = () => {
  const {userInfo} = useAuth()
  const api = ApiSetup()
  const [totalCustomers, setTotalCustomers] = useState(80);
  const [customersCount, setCustomersCount] = useState();
  const [PSCustomers, setPSCustomers] = useState();
  const [allCustomers, setAllCustomers] = useState([]);
  const [allDebtors, setAllDebtors] = useState([]);
  const { setIsCustomerOpen } = useModal();
  const { setIsDebtorOpen } = useModal();
  const [currentPage, setCurrentPage] = useState(1);
  const [customerPerPage, setCustomerPerPage] = useState(5);

  
  const indexOfLastCustomer = currentPage * customerPerPage;
  const indexOfFirstCustomer = indexOfLastCustomer - customerPerPage;
  const currentCustomers = allCustomers.slice(indexOfFirstCustomer, indexOfLastCustomer);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleModalClose = () => {
    setIsCustomerOpen(false);
    setIsDebtorOpen(false);
  };

  const baseUrl = "https://api.theceoapp.com/"

  useEffect(()=> {
    if(userInfo?.masked_id){
      getTotalCustomers(),
      getAllDebtors(),
      getAllCustomers(),
      getTotalPSCustomers();
      getTotalCustomersCount()
    }
  },[userInfo?.masked_id])
  console.log(userInfo?.masked_id)

  const getTotalCustomersCount = async (days=30) => {
    try {
      const data = {
        u_id: userInfo?.masked_id,
        pivotedate: days,
      };
      const res = await api.post("gettotalcustomerscounts", data);
      // const totalrev = res.data["gettotalrevenue"]
      setCustomersCount(res?.data);
      console.log(res?.data, "counts data")
    } catch (error) {
      console.log(error, "the error");
    }
  };
  
  const getTotalCustomers = async () => {
    try {
      const data = {
        u_id: userInfo?.masked_id,
        pivotedate: 0,
      };
      const res = await api.post("gettotalcustomers", data);
      // const totalrev = res.data["gettotalrevenue"]
      setTotalCustomers(res?.data.totalcustomers);
    } catch (error) {
      console.log(error, "the error");
    }
  };
  

  const getTotalPSCustomers = async () => {
    try {
      const data = {
        u_id: userInfo?.masked_id
      };
      const res = await api.post("gettotalpscustomers", data);
      // const totalrev = res.data["gettotalrevenue"]
      setPSCustomers(res?.data);
    } catch (error) {
      console.log(error, "the error");
    }
  };
  
  const getAllCustomers = async () => {
    try {
      const data = {
        "u_id" : userInfo?.masked_id,
        "paging": "no",
        "pagerow":"50"

      }
      // const res = await api.post("registeruser", {
      // const res = await api.post("getallservices", data)
      // const allsales = res.data["getallservices"]
      // console.log(res,'the result')

      const customers = await api.post("getallcustomers", data)
      
      if (customers?.data) {
        console.log(customers,'the result')
        setAllCustomers(customers?.data.datas);
      }
    } catch (error) {
      console.log(error,'the error')
    }
  }
  const getAllDebtors = async () => {
    try {
      const data = {
        "u_id" : userInfo?.masked_id,
        "paging": "no",
        "pagerow":"50"

      }
      // const res = await api.post("registeruser", {
      // const res = await api.post("getallservices", data)
      // const allsales = res.data["getallservices"]
      // console.log(res,'the result')

      const debtors = await api.post("getalldebtors", data)
      
      if (debtors?.data) {
        console.log(debtors,'the result')
        setAllDebtors(debtors?.data.datas);
      }
    } catch (error) {
      console.log(error,'the error')
    }
  }
  return (
    <div className="flex flex-col w-full h-[90vh] overflow-auto hide-scrollbar">
      <header className="px-6 py-4 border-b md:border-t w-full">
        <span className="font-bold">My Customers</span>
      </header>
      <section className="p-6 flex flex-col gap-4 mb-[70px]">
        <article className="md:hidden">
          <SearchInput />
        </article>
        <article className="flex flex-col md:flex-row gap-4 mt-4 md:mt-0 rounded-md">
          <div className="flex flex-col md:flex-row w-full gap-4 flex-wrap">
            <div className="flex flex-col md:grid md:grid-cols-8 w-full gap-4 flex-wrap">
              <div className="md:col-span-3 pt-2 pl-6 pb-2 pr-2 border rounded flex flex-col gap-5">
                <div className="flex items-center">
                  <div className="flex items-center gap-2 pt-2">
                    <span className="font-bold md:text-xs">
                      Customers
                    </span>
                    <span className="rounded-full bg-green-100 text-xs flex px-1 items-center text-red-200">
                      <AiOutlineRise /> {customersCount?.percChangeCount}%
                    </span>
                  </div>
                  <div className="ml-auto mb-auto">
                    <span className="text-gray-400 ml-auto">
                      <CiCircleQuestion />
                    </span>
                  </div>
                </div>
                <span className="text-xl font-bold">{customersCount?.datedcount}</span>
                <span className="mt-3 text-xs text-gray-400 flex items-center">
                  last 30 days{" "}
                  <PiDotsThree className="ml-auto text-sm bg-gray-100 rounded b-2 text-gray-700" />
                </span>
              </div>
              <div className="md:col-span-3 pt-2 pl-6 pb-2 pr-2 border rounded flex flex-col gap-5">
                <div className="flex items-center">
                  <div className="flex items-center gap-2 pt-2">
                    <span className="font-bold md:text-xs">
                      Total Customers
                    </span>
                    {/* <span className="rounded-full bg-green-100 text-xs flex px-1 items-center text-green-500">
                      <AiOutlineRise /> 
                    </span> */}
                  </div>
                  <div className="ml-auto mb-auto">
                    <span className="text-gray-400 ml-auto">
                      <CiCircleQuestion />
                    </span>
                  </div>
                </div>
                <span className="text-xl font-bold">{totalCustomers}</span>
                <span className="mt-3 text-xs text-gray-400 flex items-center">
                  all time{" "}
                  <PiDotsThree className="ml-auto text-sm bg-gray-100 rounded b-2 text-gray-700" />
                </span>
              </div>
              <div className="md:col-span-2 pt-2 pl-6 pb-2 pr-2 border rounded flex flex-col gap-5">
                <div className="flex items-center">
                  <div className="flex flex-col gap-2 pt-2">
                    <div className="flex flex-col gap-2 font-bold">
                     <span className="md:text-xs">
                        Customers in products
                      </span>
                      <span className="text-xl">
                        {PSCustomers?.productCustomer}
                      </span> 
                    </div>
                    <div className="flex flex-col gap-2 font-bold">
                     <span className="md:text-xs">
                        Customers in service
                      </span>
                      <span className="text-xl">
                        {PSCustomers?.serviceCustomer}
                      </span> 
                    </div>
                  </div>
                  <div className="ml-auto mb-auto">
                    <span className="text-gray-400 ml-auto">
                      <CiCircleQuestion />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </article>
      </section>
      <section className="flex flex-col mb-20 gap-4 px-4">
        <article className="border p-4">
          <div className="py-3 items-center flex justify-between border-b-2">
            <span>Customer list ({allCustomers.length})</span>
            <div className="flex md:gap-5 text-gray-600">
              <div className="md:bg-gray-200 flex h-[36px] md:px-4 px-2 text-sm items-center gap-2 rounded-lg">
                <span className="hidden md:block">Sort/Filter</span>
                <BiSort cursor={"pointer"} />
              </div>
              <div className="md:bg-gray-200 flex h-[36px] md:px-4 px-2 text-sm items-center gap-2 rounded-lg">
                <span className="hidden md:block">Sort order</span>
                <GiSettingsKnobs cursor={"pointer"} className="rotate-90" />
              </div>
            </div>
          </div>
          <article className="pt-5">
            <div className="flex md:hidden text-[10px] mt-4 text-gray-400 gap-1">
              <IoIosInformationCircleOutline />
              <span>Click on a product to view details</span>
            </div>
            {currentCustomers?.map((customer) => (
              <div key={customer?.id} className="grid grid-cols-4 items-center gap-4">
                <div className="flex gap-4 items-center">
                  <img src={`${baseUrl}${customer?.url}`} className="rounded-full h-[40px] w-[40px] font-bold"/>
                  <span className="font-extralight">{customer?.name}</span>
                </div>
                <span className="text-gray-400">
                {customer?.phone}
                </span>
                <span className="cursor-pointer text-blue underline">{customer?.email}</span>
                <span className=" text-sm">
                {customer?.address}
                </span>
              </div>
            ))}
            
          </article>
          <section className="my-8 flex justify-center">
            {allCustomers.length > 0 && (
              <div className="w-[90%] py-2 flex justify-center items-center md:gap-5 gap-3">
                <span className="text-sm">
                  Showing page {currentPage} of {Math.ceil(allCustomers.length / customerPerPage)}
                </span>
                <button
                  className="bg-gray-600 h-[40px] rounded-full flex justify-center items-center w-[40px]"
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  <FaChevronLeft color="white" />
                </button>
                {[...Array(Math.ceil(allCustomers.length / customerPerPage)).keys()].map((pageNumber) => (
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
                  disabled={currentPage === Math.ceil(allCustomers.length / customerPerPage)}
                >
                  <FaChevronRight color="white" />
                </button>
              </div>
            )}
          </section>
          {/* <footer className="my-8 flex justify-center">
            <div className="w-[90%] py-2 flex justify-center items-center md:gap-5 gap-3">
              <span className="text-sm">Showing page</span>
              <button className="bg-gray-600 h-[40px] rounded-full flex justify-center items-center w-[40px]">
                <FaChevronLeft color="white" />
              </button>
              <span>1 of 5</span>
              <button className="bg-gray-600 h-[40px] rounded-full flex justify-center items-center w-[40px]">
                <FaChevronRight color="white" />
              </button>
            </div>
          </footer> */}
        </article>
        <article className="border p-4">
          <div className="py-3 items-center flex justify-between border-b-2">
            <span>Dabtors ({allDebtors.length})</span>
            <div className="flex md:gap-5 text-gray-600">
              <div className="md:bg-gray-200 flex h-[36px] md:px-4 px-2 text-sm items-center gap-2 rounded-lg">
                <span className="hidden md:block">Sort/Filter</span>
                <BiSort cursor={"pointer"} />
              </div>
              <div className="md:bg-gray-200 flex h-[36px] md:px-4 px-2 text-sm items-center gap-2 rounded-lg">
                <span className="hidden md:block">Sort order</span>
                <GiSettingsKnobs cursor={"pointer"} className="rotate-90" />
              </div>
              <div className="flex items-center">
                <button className="bg-gray-200  rounded md:px-4 px-2 py-2
                flex justify-center items-center text-sm"
                onClick={() => setIsDebtorOpen(true)}>
                  add debtor
                </button>
              </div>
            </div>
          </div>
          <article className="pt-5">
            <div className="flex md:hidden text-[10px] mt-4 text-gray-400 gap-1">
              <IoIosInformationCircleOutline />
              <span>Click on a product to view details</span>
            </div>
            {allDebtors?.map((debtor) => (
              <div key={debtor?.id} className="grid grid-cols-5 items-center gap-4 mb-2">
                <div className="flex gap-4 items-center">
                  <span className="font-extralight">{debtor?.name}</span>
                </div>
                <span className="text-gray-400">
                {debtor?.phone}
                </span>
                <span className="">₦{debtor?.totaldebt}</span>
                <span className=" text-sm">
                  11th, Jul, 2024
                </span>
                <span className="flex justify-center items-center rounded bg-red-50 text-red-900 px-6 py-2">
                  Cash Loan
                </span>
              </div>
            ))}
            
          </article>
          
          <footer className="my-8 flex justify-center">
            <div className="w-[90%] py-2 flex justify-center items-center md:gap-5 gap-3">
              <span className="text-sm">Showing page</span>
              <button className="bg-gray-600 h-[40px] rounded-full flex justify-center items-center w-[40px]">
                <FaChevronLeft color="white" />
              </button>
              <span>1 of 5</span>
              <button className="bg-gray-600 h-[40px] rounded-full flex justify-center items-center w-[40px]">
                <FaChevronRight color="white" />
              </button>
            </div>
          </footer>
        </article>
      <article className="relative">
        <button
          className="flex gap-4 rounded-full ml-auto mb-20 md:mb-4 p-4 text-center text-white 
          bg-gradient-to-r from-red-700 to-red-600
          fixed bottom-4 right-4 z-10 shadow-lg hover:scale-105 transition-transform"
          onClick={() => setIsCustomerOpen(true)}
          >
         <FiPlus /> <span className="hidden md:block">Add customer</span>
         </button>
         <AddCustomerModal onClose={handleModalClose} />
         <AddDebtorModal onClose={handleModalClose} />
         {/* <EditSalesTargetModal onClose={handleModalClose} /> */}
      </article>
      </section>
    </div>
  )
}

export default MyCustomers