import React, { useEffect, useState } from "react";
import SearchInput from "../../components/SearchInput";
import { AiOutlineRise } from "react-icons/ai";
import { AiOutlineFall } from "react-icons/ai";
import { PiDotsThree } from "react-icons/pi";
import { CiCircleQuestion } from "react-icons/ci";
import Bartest from "../../components/charts/Bartest";
import Linetest from "../../components/charts/Linetest";
import { PiOfficeChairLight } from "react-icons/pi";
import { TfiWallet } from "react-icons/tfi";
import { FiPlus } from "react-icons/fi";
import { TfiWorld } from "react-icons/tfi";
import { MdOutlineContentCopy } from "react-icons/md";
import { HiMiniLockClosed } from "react-icons/hi2";
import { HiOutlineSwitchVertical } from "react-icons/hi";
import { TfiAnnouncement } from "react-icons/tfi";
import { GrStatusGood } from "react-icons/gr";
import { Link } from "react-router-dom";
import {
  Past, Current
} from "../../components/charts/dataset";
import AddAboutModal from "../../components/modals/AddAboutModal";
import AutoGenerateAboutModal from "../../components/modals/AutoGenerateAboutModal";
import AddTermsModal from "../../components/modals/AddTermsModal";
import AutoGenerateTermsModal from "../../components/modals/AutoGenerateTermsModal";
import CreateAdModal from "../../components/modals/CreateAdModal";
import EditSalesTargetModal from "../../components/modals/EditSalesTargetModal";
import { useModal } from "../../context/ModalContext";
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses, chartsGridClasses } from '@mui/x-charts';
import { useAuth } from "../../context/AuthContext";
import ApiSetup, { baseUrl, clientUrl } from "../../utils/ApiSetup";

const MyWebsite = () => {
  const api = ApiSetup();

  const {isSalesOpen, setIsAdOpen, setIsTermsOpen, setIsAboutOpen, setIsSuccessSalesOpen, setIsSalesTargetOpen} = useModal();
  const {userInfo} = useAuth();
  const {isSuccessSalesOpen} = useModal();
  const {isSalesTargetOpen} = useModal()
  const {isAboutOpen} = useModal()
  const {isTermsOpen} = useModal()
  const [about, setAbout] = useState("")
  const [terms, setTerms] = useState("")
  const [visitors, setVisitors] = useState()
  const [visitorsBarchart, setVisitorsBarchart] = useState()
  const [companyName, setCompanyName] = useState('')
  const [companyAddress, setCompanyAddress] = useState('')
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (userInfo?.masked_id) {
      getAbout();
      getTerms();
      getVisitorsCount();
      getVisitorsBarcart();
    }
  }, [userInfo?.masked_id, terms, about]);

  useEffect(()=>{
    const c_name = userInfo?.companyname
    const clientUrl = 'http://localhost:5173/'
    if(c_name){
      const addressName = clientUrl+ 's/'+c_name.split(' ').join('_')
      setCompanyAddress(addressName)
    }
  },[userInfo])

  console.log()

  
  const handleModalAboutOpen = () => {
    setIsAboutOpen(true);
  };

  const handleModalTermsOpen = () => {
    setIsTermsOpen(true);
  };

  const createAdModal = () => {
    setIsAdOpen(true);
  };

  const handleSuccessModalClose = () => {
    setIsSuccessSalesOpen(false);
  };
  const handleModalClose = () => {
    setIsAboutOpen(false);
    setIsSuccessSalesOpen(false);
    setIsSalesTargetOpen(false);

  };



  const handleEditSalesTargetModalClose = () => {
    setIsSalesTargetOpen(false);
  };

  const getVisitorsCount = async (days=3) => {
    try {
      const data = {
        "u_id": userInfo?.masked_id,
        "pivotedate":days,
      };

      const res = await api.post("gettotalvisitorscounts", data);
      // const totalrev = res.data["gettotalrevenue"]
      setVisitors(res?.data);
    } catch (error) {
      console.log(error, "the error");
    }
  };

  const getVisitorsBarcart = async (days=7) => {
    try {
      const data = {
        "user_id": userInfo?.masked_id,
        "pivotedate":days,
      };
      const res = await api.post("visitorsbarchart", data);
      // const totalrev = res.data["gettotalrevenue"]
      setVisitorsBarchart(res?.data?.visitorsbardata);
    } catch (error) {
      console.log(error, "the error");
    }
  };

  const getAbout = async () => {
    try {
      const data = {
        "user_id": userInfo?.masked_id
      };
      const res = await api.post("getabout", data);
      // const totalrev = res.data["gettotalrevenue"]
      setAbout(res?.data?.about);
    } catch (error) {
      console.log(error, "the error");
    }
  };

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


  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(companyAddress);
      setCopied(true);

      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };


  return (
    <div className="flex flex-col w-full h-[90vh] overflow-auto hide-scrollbar">
      <header className="px-6 py-4 border-b md:border-t w-full">
        <span className="font-bold">My Website</span>
      </header>
      <section className="p-6 flex flex-col gap-4 mb-[70px]">
        <article className="md:hidden">
          <SearchInput />
        </article>
        <article className="flex items-center justify-between p-4 bg-gray-200 text-xs md:text-sm rounded">
          <TfiWorld />
          <span className="flex gap-1 items-center">
            <HiMiniLockClosed className="text-gray-600" /> 
            <a target="_black" className="hidden md:block" href={companyAddress}>{companyAddress}</a>
            <a target="_black" className=" md:hidden" href={companyAddress}>{companyAddress.slice(0, 30)}</a>
            
            {copied && <span className="ml-5 flex items-center">Copied <GrStatusGood color="green" size={22} className="ml-1" /></span>}
          </span>
          <span className="flex gap-4 items-center">
              <span className="hidden md:block"> Copy link</span> <MdOutlineContentCopy className="text-blue-600" onClick={handleCopy} />
          </span>
          
        </article>
        <article className="flex flex-col gap-4 mt-4 md:mt-0 rounded-md">
          <div className="flex flex-col md:flex-row gap-4 flex-wrap">
            <div className="flex flex-col md:grid md:grid-cols-5 w-full gap-4 flex-wrap">
              <div className="md:col-span-2 pt-2 pl-6 pb-2 pr-2 border rounded flex flex-col gap-2">
                <div className="flex items-center">
                  <div className="flex items-center gap-2 pt-2">
                    <span className="font-bold md:text-xs">Visitors</span>
                    <span className="rounded-full bg-green-100 text-xs flex px-1 items-center text-green-500">
                      <AiOutlineRise /> {visitors?.percChangeCount}%
                    </span>
                  </div>
                  <div className="ml-auto mb-auto">
                    <span className="text-gray-400 ml-auto">
                      <CiCircleQuestion />
                    </span>
                  </div>
                </div>
                <span className="text-xl font-bold">+{visitors?.visitorsDaysCount}</span>
                <span className="mt-3 text-xs text-gray-400 flex items-center">
                  Today{" "}
                  <PiDotsThree className="ml-auto text-sm bg-gray-100 rounded b-2 text-gray-700" />
                </span>
              </div>
              <div className="pt-2 pl-6 pb-2 pr-2 border rounded flex flex-col gap-2">
                <div className="flex items-center">
                  <div className="flex items-center gap-2 pt-2">
                    <span className="font-bold md:text-xs">Total Visitors</span>
                  </div>
                  <div className="ml-auto mb-auto">
                    <span className="text-gray-400 ml-auto">
                      <CiCircleQuestion />
                    </span>
                  </div>
                </div>
                <span className="text-xl font-bold">{visitors?.totalvisitors}</span>
                <span className="mt-3 text-xs text-gray-400 flex items-center">
                  {" "}
                  {/* <PiDotsThree className="hidden ml-auto text-sm bg-transparent rounded b-2 text-gray-700" /> */}
                  <div className="h-4"></div>
                </span>
              </div>
              <div 
                className="md:col-span-2 pt-2 pl-6 pb-2 pr-2 
                border rounded flex flex-col gap-2 text-blue-700"
                onClick={createAdModal}>
                <div className="flex items-center">
                  <div className="flex items-center justify-center gap-2 pt-2 w-full">
                    <span className="font-bold md:text-xs">Advertise your business</span>
                  </div>
                  <div className="ml-auto mb-auto">
                    <span className="text-gray-400 ml-auto">
                      <CiCircleQuestion />
                    </span>
                  </div>
                </div>
                <span className="flex justify-center">
                  <TfiAnnouncement
                    size={45}
                   />
                </span>
              </div>
            </div>
          </div>
        </article>
        <article className="shadow-md mb-4 md:mb-0 overflow-x-auto whitespace-nowrap md:w-full">
          <div className= "flex flex-col">
            <div className="md:w-full py-3 flex gap-5 md:ps-[30px] items-center">
              <h1 className="font-bold text-sm md:text-lg">This weeks Visitors</h1>
              <div className="flex-1 md:gap-3 gap-2 flex items-center justify-end med:pe-5 text-[10px] md:text-[12px]">
                  <div className="flex items-center gap-1">
                      <input type="radio" name="level" />
                      <label htmlFor="">Previous year</label>
                  </div>
                  <div className="flex items-center gap-1">
                      <input type="radio" name="level" />
                      <label htmlFor="">Current level</label>
                  </div>
                  <select className="outline-none border py-1 px-2 rounded-xl" name="" id="">
                      <option value="">This month</option>
                  </select>
              </div>
            </div>
            <BarChart
               className="!w-[460px] md:!w-auto"
              // width={500}
              height={300}
              series={[
                { data: Current, id: 'uvId', stack: 'total', color: 'rgba(6, 34, 103, 0.9)' },
                { data: Past, id: 'pvId', stack: 'total', color:"#d9d4d4" },
                
              ]}
              xAxis={[{ 
                data: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], 
                scaleType: 'band' }]}
              grid={{ horizontal: true }}
              sx={{
                  // [`.${lineElementClasses.root}, .${markElementClasses.root}`]: {
                  //   strokeWidth: 2,
                  // },
                  // [`.${markElementClasses.root}:not(.${markElementClasses.highlighted})`]: {
                  //   fill: '#fff',
                  //   scale: '0.0',
                  // },
                  // [`& .${markElementClasses.highlighted}`]: {
                  //   stroke: 'none',
                  // },
                  [`& .${axisClasses.tick}`]: {
                    display: 'none', // This will hide the axis ticks
                  },
                  [`& .${axisClasses.line}`]: {
                    display: 'none', // This will hide the axis lines
                  },
                  [`& .${chartsGridClasses.line}`]: { 
                    strokeDasharray: '5 3', 
                    strokeWidth: 2 
                  },
                  '& .MuiBar-root': {
                    // minHeight: '800px',
                    backgroundColor: 'purple', 
                    transition: 'background-color 0.3s ease', 
                  '&:hover': {
                    backgroundColor: '#ff9800', 
                  }
                  },
                }}
            />
          </div>
          
        </article>
        <article className="flex flex-col p-6 shadow-md">
          <div className="font-bold">
            <span>Terms and condition</span>
          </div>
          <div className="flex items-center overflow-y-auto">
            <span className="h-[200px] md:h-[150px] flex p-2">
              {terms}
            </span>
          </div>
          <div className="flex w-full">
            <button
                className="px-2 py-1 text-center ml-auto"
                onClick={handleModalTermsOpen}
                > 
                click to edit
              </button>
          </div>
        </article>
        <article className="flex flex-col p-6 shadow-md">
          <div className="font-bold">
            <span>About</span>
          </div>
          <div className="flex items-center overflow-y-auto">
            <span className="h-[200px] md:h-[150px] flex p-2">
              {about}
            </span>
          </div>
          <div className="flex w-full">
            <button
                className="px-2 py-1 text-center ml-auto"
                onClick={handleModalAboutOpen}
                > 
                click to edit
              </button>
          </div>
        </article>
        <article>
          <AddAboutModal onClose={handleModalClose} />
          <AutoGenerateAboutModal onClose={handleModalClose} />
          <AddTermsModal onClose={handleModalClose} />
          <AutoGenerateTermsModal onClose={handleModalClose} />
          <CreateAdModal onClose={handleModalClose} />
        </article>
      </section>
      
    </div>
  );
};

export default MyWebsite;
