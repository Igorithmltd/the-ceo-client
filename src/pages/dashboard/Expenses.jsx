import React, { useState, useRef, useEffect } from "react";
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
import { HiOutlineSwitchVertical } from "react-icons/hi";
import { Link } from "react-router-dom";
import { dataset, dataset2, projectedData, actualData } from "../../components/charts/dataset";
import AddExpensesModal from "../../components/modals/AddExpensesModal";
import SuccessExpensesModal from "../../components/modals/SuccessExpensesModal";
import EditExpensesModal from "../../components/modals/EditExpensesModal";
import EditExpensesTargetModal from "../../components/modals/EditExpensesTargetModal";
import { useModal } from "../../context/ModalContext";
import DonutChart from "../../components/charts/DonutChart";
import { useAuth } from "../../context/AuthContext";
import ApiSetup, { roundToTwoDecimals } from "../../utils/ApiSetup";
import { convertObjToArray, extractValues } from "../../utils/helpers";
import { BarChart } from "@mui/x-charts/BarChart";
import { axisClasses, chartsGridClasses } from "@mui/x-charts";
import StatCard from "../../components/dashboard/StatCard";

const Expenses = () => {
  const { isExpensesOpen, setIsExpensesOpen } = useModal();
  const { isSuccessExpensesOpen, setIsSuccessExpensesOpen } = useModal();
  const { isEditExpensesOpen, setIsEditExpensesOpen } = useModal();
  const { isExpensesTargetOpen, setIsExpensesTargetOpen } = useModal();

  const { userInfo } = useAuth();
  const api = ApiSetup();

  const [expenses, setExpenses] = useState([]);
  const [expensesRatio, setExpensesRatio] = useState();
  const [netIncome, setNetIncome] = useState();
  const [expensesStatus, setExpensesStatus] = useState();
  const [expenseBarchart, setExpenseBarchart] = useState(null);

  const [days, setDays] = useState(30); // Default value
  const [daysR, setDaysR] = useState(30);
  const [daysI, setDaysI] = useState(30);
  const [daysS, setDaysS] = useState(30);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State to manage dropdown visibility
  const [isRatioDropdownOpen, setIsRatioDropdownOpen] = useState(false);
  const [isIncomeDropdownOpen, setIsIncomeDropdownOpen] = useState(false);
  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);
  const dropdownRef = useRef(null); // Reference for the dropdown

  const handleToggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen); // Toggle dropdown visibility
  };

  const handleToggleDropdown_ratio = () => {
    setIsRatioDropdownOpen(!isRatioDropdownOpen); // Toggle dropdown visibility
  };

  const handleToggleDropdown_net_income = () => {
    setIsIncomeDropdownOpen(!isIncomeDropdownOpen); // Toggle dropdown visibility
  };

  const handleToggleDropdown_status = () => {
    setIsStatusDropdownOpen(!isStatusDropdownOpen); // Toggle dropdown visibility
  };

  const handleSelectDays = (value) => {
    setDays(value);
    setIsDropdownOpen(false); // Close dropdown after selection
  };
  
  const handleSelectDays_ratio = (value) => {
    setDaysR(value); // Update days state
    getExpensesRatio(value);
    setIsRatioDropdownOpen(false); // Close dropdown after selection
  };
  const handleSelectDays_net_income = (value) => {
    setDaysI(value);
    getNetIncome(days);
    setIsIncomeDropdownOpen(false); // Close dropdown after selection
  };
  const handleSelectDays_status = (value) => {
    setDaysS(value); // Update days state
    getExpensesStatus(days);
    setIsStatusDropdownOpen(false); // Close dropdown after selection
  };
  useEffect(() => {
    if (userInfo?.masked_id) {
      getTopExpenses(), getExpensesRatio(), getNetIncome(), getExpensesStatus();
      getExpenseBarchart();
    }
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [userInfo?.masked_id]);

  //routing patterns / resources

  async function getExpensesRatio(days = 30) {
    const res = await api.post("expensesratio", {
      user_id: userInfo?.masked_id,
      pivotedate: days,
    });
    setExpensesRatio(res?.data);
    console.log(res, "the expenses ratio");
  }

  async function getNetIncome(days = 30) {
    const res = await api.post("netincome", {
      user_id: userInfo?.masked_id,
      pivotedate: days,
    });
    setNetIncome(res?.data);
    console.log(res, "the net income");
  }

  async function getExpensesStatus(days = 30) {
    const res = await api.post("expenses_status", {
      user_id: userInfo?.masked_id,
      pivotedate: days,
    });
    setExpensesStatus(res?.data.expenses_status);
    console.log(res, "the expenses status");
  }

  async function getTopExpenses() {
    const res = await api.post("gettopexpenses", {
      user_id: userInfo?.masked_id,
      limit: 6,
      pivotedate: 30,
    });
    console.log(res, "the top expenses");
  }

  const getExpenseBarchart = async () => {
    try {
      const data = {
        user_id: userInfo?.masked_id,
        pivotedate: 0,
      };
      const res = await api.post("expensesbarchart", data);
      // const totalrev = res.data["gettotalrevenue"]
      setExpenseBarchart(res?.data?.expensesbardata);
    } catch (error) {
      console.log(error, "the error");
    }
  };

  const handleModalOpen = () => {
    setIsExpensesOpen(true);
  };

  const handleEditSalesTargetModalOpen = () => {
    setIsSalesTargetOpen(true);
  };

  const handleEditExpensesModalOpen = () => {
    setIsEditExpensesOpen(true);
  };

  const handleEditExpensesTargetModalOpen = () => {
    setIsExpensesTargetOpen(true);
  };

  const handleSuccessModalClose = () => {
    setIsSuccessExpensesOpen(false);
  };
  const handleModalClose = () => {
    setIsExpensesOpen(false);
    setIsSuccessExpensesOpen(false);
    setIsSalesTargetOpen(false);
    setIsEditExpensesOpen(false);
    setIsExpensesTargetOpen(false);
  };

  const handleEditExpensesTargetModalClose = () => {
    setIsExpensesTargetOpen(false);
  };

  const handleEditExpensesModalClose = () => {
    setIsEditExpensesOpen(false);
  };

  const Past = extractValues(expenseBarchart?.earlier);
  const Current = extractValues(expenseBarchart?.selected);
  console.log(expensesRatio,'the expense')
  return (
    <div
      className="flex flex-col w-full h-[90vh] overflow-auto hide-scrollbar"
      // onClick={setIsDropdownOpen(false)}
    >
      <header className="px-6 py-4 border-b md:border-t w-full">
        <span className="font-semibold text-[19px]">Expenses</span>
      </header>
      <section className="p-6 flex flex-col gap-4 mb-[70px]">
        <article className="md:hidden">
          <SearchInput />
        </article>
        <article className="flex flex-col gap-4 mt-4 md:mt-0 rounded-md">
          <div className="flex flex-col md:flex-row gap-4 flex-wrap">
            <div className="flex flex-col md:grid md:grid-cols-4 w-full gap-4 flex-wrap">
              <div className="pt-2 pl-6 pb-2 pr-2 border rounded flex flex-col gap-2 relative">
                <div className="flex items-center">
                  <div className="flex items-center gap-2 pt-2">
                    <span className="font-bold md:text-xs">Total Expenses</span>
                    <span className="rounded-full bg-green-100 text-xs flex px-1 items-center text-green-500">
                      <AiOutlineRise /> 22.0%
                    </span>
                  </div>
                  <div className="ml-auto mb-auto">
                    <span className="text-gray-400 ml-auto">
                      <CiCircleQuestion />
                    </span>
                  </div>
                </div>
                <span className="text-xl font-bold">&#8358;15,528,600</span>
                <span className="mt-3 text-xs text-gray-400 flex items-center">
                  last {days} days{" "}
                    <PiDotsThree 
                      className="ml-auto text-sm bg-gray-100 rounded b-2 text-gray-700 cursor-pointer"
                      onClick={handleToggleDropdown}
                     />
                </span>
                {isDropdownOpen && (
                  <div className="absolute right-[5px] top-[65%] md:right-0 md:top-[75%] bg-white border border-gray-300 rounded shadow-lg mt-1 z-10">
                    <div 
                      className="px-4 py-2 cursor-pointer hover:bg-gray-100" 
                      onClick={() => handleSelectDays(30)}
                    >
                      30 days
                    </div>
                    <div 
                      className="px-4 py-2 cursor-pointer hover:bg-gray-100" 
                      onClick={() => handleSelectDays(60)}
                    >
                      60 days
                    </div>
                    <div 
                      className="px-4 py-2 cursor-pointer hover:bg-gray-100" 
                      onClick={() => handleSelectDays(90)}
                    >
                      90 days
                    </div>
                  </div>
                )}
              </div>
              <div className="pt-2 pl-6 pb-2 pr-2 border rounded flex flex-col gap-2 relative" ref={dropdownRef}>
                <div className="flex items-center">
                  <div className="flex items-center gap-2 pt-2">
                    <span className="font-bold md:text-xs">Expenses Ratio</span>
                    <span className="rounded-full bg-green-100 text-xs flex px-1 items-center text-green-500">
                      <AiOutlineRise /> {expensesRatio?.percentage_difference}%
                    </span>
                  </div>
                  <div className="ml-auto mb-auto">
                    <span className="text-gray-400 ml-auto">
                      <CiCircleQuestion />
                    </span>
                  </div>
                </div>
                <span className="text-xl font-bold">{expensesRatio?.expensesratio?.toFixed(2)}%</span>
                <span className="mt-3 text-xs text-gray-400 flex items-center">
                  last {daysR} days{" "}
                    <PiDotsThree 
                      className="ml-auto text-sm bg-gray-100 rounded b-2 text-gray-700 cursor-pointer"
                      onClick={handleToggleDropdown_ratio}
                     />
                </span>
                {isRatioDropdownOpen && (
                  <div className="absolute right-[5px] top-[65%] md:right-0 md:top-[75%] bg-white border border-gray-300 rounded shadow-lg mt-1 z-10">
                    <div 
                      className="px-4 py-2 cursor-pointer hover:bg-gray-100" 
                      onClick={() => handleSelectDays_ratio(30)}
                    >
                      30 days
                    </div>
                    <div 
                      className="px-4 py-2 cursor-pointer hover:bg-gray-100" 
                      onClick={() => handleSelectDays_ratio(60)}
                    >
                      60 days
                    </div>
                    <div 
                      className="px-4 py-2 cursor-pointer hover:bg-gray-100" 
                      onClick={() => handleSelectDays_ratio(90)}
                    >
                      90 days
                    </div>
                  </div>
                )}
              </div>
              <div className="pt-2 pl-6 pb-2 pr-2 border rounded flex flex-col gap-2 relative">
                <div className="flex items-center">
                  <div className="flex items-center gap-2 pt-2">
                    <span className="font-bold md:text-xs">Net Income</span>
                    <span className="rounded-full bg-green-100 text-xs flex px-1 items-center text-green-500">
                      <AiOutlineRise /> {netIncome?.percentage_difference}%
                    </span>
                  </div>
                  <div className="ml-auto mb-auto">
                    <span className="text-gray-400 ml-auto">
                      <CiCircleQuestion />
                    </span>
                  </div>
                </div>
                <span className="text-xl font-bold">+ ₦{netIncome?.income}</span>
                <span className="mt-3 text-xs text-gray-400 flex items-center">
                  last {daysI} days{" "}
                    <PiDotsThree 
                      className="ml-auto text-sm bg-gray-100 rounded b-2 text-gray-700 cursor-pointer"
                      onClick={handleToggleDropdown_net_income}
                     />
                </span>
                {isIncomeDropdownOpen && (
                  <div className="absolute right-[5px] top-[65%] md:right-0 md:top-[75%] bg-white border border-gray-300 rounded shadow-lg mt-1 z-10">
                    <div 
                      className="px-4 py-2 cursor-pointer hover:bg-gray-100" 
                      onClick={() => handleSelectDays_net_income(30)}
                    >
                      30 days
                    </div>
                    <div 
                      className="px-4 py-2 cursor-pointer hover:bg-gray-100" 
                      onClick={() => handleSelectDays_net_income(60)}
                    >
                      60 days
                    </div>
                    <div 
                      className="px-4 py-2 cursor-pointer hover:bg-gray-100" 
                      onClick={() => handleSelectDays_net_income(90)}
                    >
                      90 days
                    </div>
                  </div>
                )}
              </div>
              <div className="pt-2 pl-6 pb-2 pr-2 border rounded flex flex-col gap-2 relative">
                <div className="flex items-center">
                  <div className="flex items-center gap-2 pt-2">
                    <span className="font-bold md:text-xs">Expenses Status</span>
                    {/* <span className="rounded-full bg-green-100 text-xs flex px-1 items-center text-green-500">
                      <AiOutlineFall /> 5.5%
                    </span> */}
                  </div>
                  <div className="ml-auto mb-auto">
                    <span className="text-gray-400 ml-auto">
                      <CiCircleQuestion />
                    </span>
                  </div>
                </div>
                <span className="text-xl font-bold">{expensesStatus}</span>
                <span className="mt-3 text-xs text-gray-400 flex items-center">
                  last {daysS} days{" "}
                    <PiDotsThree 
                      className="ml-auto text-sm bg-gray-100 rounded b-2 text-gray-700 cursor-pointer"
                      onClick={handleToggleDropdown_status}
                     />
                </span>
                {isStatusDropdownOpen && (
                  <div className="absolute right-[5px] top-[65%] md:right-0 md:top-[75%] bg-white border border-gray-300 rounded shadow-lg mt-1 z-10">
                    <div 
                      className="px-4 py-2 cursor-pointer hover:bg-gray-100" 
                      onClick={() => handleSelectDays_status(30)}
                    >
                      30 days
                    </div>
                    <div 
                      className="px-4 py-2 cursor-pointer hover:bg-gray-100" 
                      onClick={() => handleSelectDays_status(60)}
                    >
                      60 days
                    </div>
                    <div 
                      className="px-4 py-2 cursor-pointer hover:bg-gray-100" 
                      onClick={() => handleSelectDays_status(90)}
                    >
                      90 days
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </article>

        <article className="shadow-md overflow-x-auto my-4 md:mb-0">
          {/* <Barchart labels={sampleLabel} title='Expense' data={sampleData}  /> */}
          {/* <Bartest height={300} title="This Month's Sales" data={dataset} /> */}
          <div className="overflow-x-auto w-[1000px] md:w-full">
            <div className="w-[1000px] md:w-full py-3 flex gap-5 md:px-[30px] items-center">
              <h1 className="font-bold text-[16px] md:text-[18px]">This year Expenses</h1>
              <div className="flex-1 md:gap-3 gap-2 flex items-center justify-end med:pe-5 text-[10px] md:text-[12px]">
                <div className="flex items-center gap-1 ">
                  <span className="w-4 h-4 bg-gray-400 rounded"></span>
                  <label htmlFor="">Previous year</label>
                </div>
                <div className="flex items-center gap-1">
                  <span className="w-4 h-4 bg-[#45598d] rounded"></span>
                  <label htmlFor="">Current level</label>
                </div>
                {/* <select className="outline-none border py-1 px-2 rounded-xl" name="" id="">
                        <option value="">This month</option>
                    </select> */}
              </div>
            </div>
            <BarChart
              className="md:!w-auto"
              height={300}
              series={[
                { data: Current, id: "uvId", stack: "total", color: "rgba(6, 34, 103, 0.9)" },
                { data: Past, id: "pvId", stack: "total", color: "#d9d4d4" },
              ]}
              xAxis={[
                {
                  data: [
                    "January",
                    "February",
                    "March",
                    "April",
                    "May",
                    "June",
                    "July",
                    "August",
                    "September",
                    "October",
                    "November",
                    "December",
                  ],
                  scaleType: "band",
                },
              ]}
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
                  display: "none", // This will hide the axis ticks
                },
                [`& .${axisClasses.line}`]: {
                  display: "none", // This will hide the axis lines
                },
                [`& .${chartsGridClasses.line}`]: {
                  strokeDasharray: "5 3",
                  strokeWidth: 2,
                },
                "& .MuiBar-root": {
                  // minHeight: '800px',
                  backgroundColor: "purple",
                  transition: "background-color 0.3s ease",
                  "&:hover": {
                    backgroundColor: "#ff9800",
                  },
                },
              }}
            />
          </div>
        </article>

        <article className="flex-col md:flex-row flex p-2 gap-8">
          <div className="py-4 overflow-x-auto md:overflow-visible md:w-[60%] text-blue shadow-md rounded-md">
            <div className="pl-8 pr-10 flex gap-5 items-center justify-center w-[600px] md:w-full">
              <h1 className="font-bold text-[14px]">Expenses Target vs Reality</h1>
              <button
                className="text-[12px] rounded-full bg-gray-200 px-3 py-2  text-center text-blue-700 ml-auto"
                onClick={handleEditExpensesTargetModalOpen}
              >
                {" "}
                + Edit target
              </button>
            </div>
            <div className="">
              <Linetest height={300} projectedData={projectedData} actualData={actualData} />
            </div>

            <div className="w-[600px] md:w-full flex flex-col gap-4 pl-8 pr-10 text-[12px] font-medium">
              <div className="flex w-full  items-center text-black">
                <div className="flex gap-2 items-center">
                  <span className="w-4 h-4 bg-[#45bdea] rounded"></span>
                  <span>Reality</span>
                </div>
                <div className="flex gap-2 ml-auto items-center">
                  <span className="w-4 h-4 bg-[#45bdea] rounded-full"></span>
                  <span className="font-semibold">₦1,000,003 in spent so far</span>
                </div>
              </div>
              <div className="flex w-full  items-center text-black">
                <div className="flex gap-2 items-center">
                  <span className="w-4 h-4 bg-[#45598d] rounded"></span>
                  <span>Sales target</span>
                </div>
                <div className="flex gap-2 ml-auto items-center font-semibold">
                  <span>₦3,000,003 target by year end</span>
                </div>
              </div>
              <div className="flex w-full  items-center text-black">
                <div className="flex gap-2 items-center">
                  <span className="w-4 h-4 bg-[#45598d] rounded"></span>
                  <span>Target description</span>
                </div>
                <div className="flex gap-2 ml-auto items-center font-normal">
                  <span>Spend ₦3,000,003 for household feeding</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col w-full md:w-[40%] px-5 py-4 shadow-md rounded-md overflow-x-auto">
            <div className="w-fit md:w-full">
              <div className="flex gap-8 justify-between items-center whitespace-nowrap py-3">
                <h3 className="font-bold text-[13px]">Top Expenses</h3>
                <select className="outline-none border py-1 px-2 rounded-full" name="" id="">
                  <option value="">This month</option>
                  <option value="">Last month</option>
                </select>
              </div>
              <table className="min-w-full divide-y divide-gray-200 mt-2">
                <thead className="text-[12px] whitespace-nowrap">
                  <tr>
                    <th scope="col" className="text-left font-medium text-gray-500">
                      #
                    </th>
                    <th scope="col" className="px-6 py-3 text-left font-medium text-gray-500">
                      Category
                    </th>
                    <th scope="col" className="px-6 py-3 text-center font-medium text-gray-500">
                      Expenses(₦)
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="whitespace-nowrap text-[12px] text-gray-900 font-bold">1</td>
                    <td className="px-6 py-4 whitespace-nowrap text-[12px] text-gray-900">
                      Office supplies
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-[12px] text-center text-gray-900">
                      <span className="text-[12px]">₦1,000,003</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="whitespace-nowrap text-[12px] text-gray-900 font-bold">2</td>
                    <td className="px-6 py-4 whitespace-nowrap text-[12px] text-gray-900">
                      Utilities
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-[12px] text-center text-gray-900">
                      <span className="text-[12px]">₦542,800</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="whitespace-nowrap text-[12px] text-gray-900">3</td>
                    <td className="px-6 py-4 whitespace-nowrap text-[12px] text-gray-900">
                      Rent/Leas
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-[12px] text-center text-gray-900">
                      <span className="text-[12px]">₦350,000</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="whitespace-nowrap text-[12px] text-gray-900">4</td>
                    <td className="px-6 py-4 whitespace-nowrap text-[12px] text-gray-900">
                      Ralaries/Wages
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-[12px] text-center text-gray-900">
                      <span className="text-[12px]">₦350,000</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="whitespace-nowrap text-[12px] text-gray-900">5</td>
                    <td className="px-6 py-4 whitespace-nowrap text-[12px] text-gray-900">
                      Marketting/Advertising
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-[12px] text-center text-gray-900">
                      <span className="text-[12px]">₦350,000</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="whitespace-nowrap text-[12px] text-gray-900">6</td>
                    <td className="px-6 py-4 whitespace-nowrap text-[12px] text-gray-900">
                      Meals/Entertainment
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-[12px] text-center text-gray-900">
                      <span className="text-[12px]">₦350,000</span>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="w-full flex mt-6">
                <button
                  className="text-[12px] rounded-full bg-[#C1C8D9] px-3 py-2  text-center text-[#45598D] ml-auto"
                  onClick={handleEditExpensesModalOpen}
                >
                  {" "}
                  Edit expenses
                </button>
              </div>
            </div>
          </div>
        </article>

        <article className="flex flex-col md:flex-row md:gap-x-12 p-6 shadow-md text-[13px] font-medium">
          <div className="flex md:w-3/4 flex-col">
            <header className=" font-bold">
              <span>Top Expenses</span>
            </header>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 my-12">
              <div className="flex items-center gap-4 max-w-fit">
                <span className="w-8 h-8 rounded-full bg-red"></span>
                <span className="">Office supplies(42%)</span>
              </div>
              <div className="flex items-center gap-4 max-w-fit">
                <span className="w-8 h-8 rounded-full bg-gray-200"></span>
                <span className="">Rent/Lease(12%)</span>
              </div>
              <div className="flex items-center gap-4 max-w-fit">
                <span className="w-8 h-8 rounded-full bg-blue-200"></span>
                <span className="">Marketting/Advertising(18%)</span>
              </div>
              <div className="flex items-center gap-4 max-w-fit">
                <span className="w-8 h-8 rounded-full bg-red-300"></span>
                <span className="">loan(23%)</span>
              </div>
              <div className="flex items-center gap-4 max-w-fit">
                <span className="w-8 h-8 rounded-full bg-gray-500"></span>
                <span className="">Salaries/Wages(19%)</span>
              </div>
              <div className="flex items-center gap-4 max-w-fit">
                <span className="w-8 h-8 rounded-full bg-blue-100"></span>
                <span className="">Meals/Entertainment(28%)</span>
              </div>
            </div>
          </div>
          <div className="flex md:w-1/4 items-center justify-center">
            <DonutChart className="ml-auto justify-center w-full" />
          </div>
        </article>

        <article className="relative">
          <button
            className="flex items-center gap-4 rounded-full ml-auto mb-20 md:mb-4 p-4 bg-radial-gradient  md:w-auto text-center md:px-5 py-4 text-[36px] md:text-[16px] font-bold text-white fixed  bottom-6 md:bottom-4 right-4 z-10 shadow-lg hover:scale-105 transition-transform"
            onClick={handleModalOpen}
          >
            <FiPlus /> <span className="hidden md:block">Add Expenses</span>
          </button>
          <AddExpensesModal onClose={handleModalClose} />
          <SuccessExpensesModal onClose={handleModalClose} />
          <EditExpensesModal onClose={handleModalClose} />
          <EditExpensesTargetModal onClose={handleModalClose} />
        </article>
      </section>
    </div>
  );
};

export default Expenses;
