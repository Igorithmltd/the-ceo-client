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
import { HiOutlineSwitchVertical } from "react-icons/hi";
import { Link } from "react-router-dom";
import { dataset, dataset2, projectedData, actualData } from "../../components/charts/dataset";
import AddSalesModal from "../../components/modals/AddSalesModal";

import AddSalesModalToModify from "../../components/modals/AddSalesModalToModify";

import SuccessSalesModal from "../../components/modals/SuccessSalesModal";
import EditSalesTargetModal from "../../components/modals/EditSalesTargetModal";
import { useModal } from "../../context/ModalContext";
import { useAuth } from "../../context/AuthContext";
import ApiSetup from "../../utils/ApiSetup";
import { convertObjToArray, extractValues } from "../../utils/helpers";
import { BarChart } from "@mui/x-charts/BarChart";
import { axisClasses, chartsGridClasses } from "@mui/x-charts";
import StatCard from "../../components/dashboard/StatCard";

const Sales = () => {
  const { isSalesOpen, setIsSalesOpen } = useModal();
  const { isSuccessSalesOpen, setIsSuccessSalesOpen } = useModal();
  const { isSalesTargetOpen, setIsSalesTargetOpen } = useModal();
  const api = ApiSetup();
  const { userInfo } = useAuth();
  const [topProducts, setTopProducts] = useState([]);
  const [topServices, setTopServices] = useState([]);
  const [saleVsReality, setSaleVsReality] = useState([]);
  const [salesBarchartData, setSalesBarchartData] = useState(null);
  const [productSales, setProductSales] = useState({
    datedSales: 0,
    percentageChange: 0,
    productsales: 0,
  });
  const [serviceSales, setServiceSales] = useState({
    datedSales: 0,
    percentageChange: 0,
    servicesales: 0,
  });

  const [totalRevenueData, setTotalRevenueData] = useState({
    percentageChange: 0,
    totalRevenue: 0,
    revenueDated: 0,
  });
  const [totalSalesData, setTotalSalesData] = useState({
    percentageChange: 0,
    datedSales: 0,
    totalSales: 0,
  });

  const [salesTarget, setSalesTarget] = useState([]);
  const [target, setTarget] = useState([]);
  const [realityTarget, setRealityTarget] = useState([]);
  const [displayProductSwitch, setDisplayProductSwitch] = useState(true);

  const [daysR, setDaysR] = useState(30);
  const [daysS, setDaysS] = useState(30);
  const [daysPs, setDaysPs] = useState(30);
  const [daysSs, setDaysSs] = useState(30);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State to manage dropdown visibility
  const [isSalesDropdownOpen, setIsSalesDropdownOpen] = useState(false);
  const [isProductSalesDropdownOpen, setIsProductSalesDropdownOpen] = useState(false);
  const [isServiceSalesDropdownOpen, setIsServiceSalesDropdownOpen] = useState(false);

  const handleToggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen); // Toggle dropdown visibility
  };

  const handleToggleDropdown_product_sales = () => {
    setIsProductSalesDropdownOpen(!isProductSalesDropdownOpen); // Toggle dropdown visibility
  };

  const handleToggleDropdown_sales = () => {
    setIsSalesDropdownOpen(!isSalesDropdownOpen); // Toggle dropdown visibility
  };

  const handleToggleDropdown_service_sales = () => {
    setIsServiceSalesDropdownOpen(!isServiceSalesDropdownOpen); // Toggle dropdown visibility
  };

  const handleSelectDays = (value) => {
    setDaysR(value);
    getTotalRevenue(daysR);
    setIsDropdownOpen(false); // Close dropdown after selection
  };
  const handleSelectDays_product_sales = (value) => {
    setDaysPs(value); // Update days state
    getProductSales(value);
    setIsProductSalesDropdownOpen(false); // Close dropdown after selection
  };
  const handleSelectDays_sales = (value) => {
    setDaysS(value);
    getTotalSales(daysS);
    setIsSalesDropdownOpen(false); // Close dropdown after selection
  };
  const handleSelectDays_service_sales = (value) => {
    setDaysSs(value); // Update days state
    getServiceSales(daysSs);
    setIsServiceSalesDropdownOpen(false); // Close dropdown after selection
  };

  useEffect(() => {
    if (userInfo?.masked_id) {
      getTotalRevenue();
      getTopSales();
      getTotalSales();
      getTargetReality();
      getProductSales();
      getServiceSales();
      getSalesBarchart();
      getSalesTarget();
    }
  }, [userInfo?.masked_id]);

  console.log(userInfo);

  const getTotalRevenue = async (days = 30) => {
    try {
      const data = {
        user_id: userInfo?.masked_id,
        pivotedate: days,
      };
      const res = await api.post("datedtotalrevenue", data);
      // const totalrev = res.data["gettotalrevenue"]
      setTotalRevenueData({
        ...totalRevenueData,
        totalRevenue: res?.data?.totalRevenue,
        percentageChange: res?.data?.percentageChange,
        revenueDated: res?.data?.revenueDated,
      });
    } catch (error) {
      console.log(error, "the error");
    }
  };
  const getTotalSales = async (days = 30) => {
    try {
      const data = {
        user_id: userInfo?.masked_id,
        pivotedate: days,
      };
      const res = await api.post("totalsales", data);
      // const totalrev = res.data["gettotalrevenue"]
      setTotalSalesData({
        ...totalSalesData,
        totalSales: res?.data?.totalsales,
        percentageChange: res?.data?.percentageChange,
        datedSales: res?.data?.datedSales,
      });
    } catch (error) {
      console.log(error, "the error");
    }
  };
  const getServiceSales = async (days = 30) => {
    try {
      const data = {
        user_id: userInfo?.masked_id,
        pivotedate: days,
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

  const getProductSales = async (days = 30) => {
    try {
      const data = {
        user_id: userInfo?.masked_id,
        pivotedate: days,
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

  const getSalesTarget = async (days = 30) => {
    try {
      const data = {
        user_id: userInfo?.masked_id,
        pivotedate: days,
      };
      const res = await api.post("gettargets", data);
      setTarget(res?.data);
      console.log(target, "sales target");
      // const totalrev = res.data["gettotalrevenue"]
      // setProductSales({
      //   ...productSales,
      //   datedSales: res?.data.datedSales,
      //   percentageChange: res?.data?.percentageChange,
      //   productsales: res?.data?.productsales,
      // });
    } catch (error) {
      console.log(error, "the error");
    }
  };

  // const getTotalRevenue = async () => {
  //   try {
  //     const data = {
  //       u_id : userInfo?.masked_id
  //     }
  //     console.log({data})
  //     // const res = await api.post("registeruser", {
  //     const res = await api.post("gettotalrevenue", data)
  //     const totalrev = res.data["gettotalrevenue"]
  //     console.log(res,'the result')
  //   } catch (error) {
  //     console.log(error,'the error')
  //   }
  // }

  async function getTopSales() {
    try {
      const res = await api.post("gettopsales", {
        limit: 3,
        user_id: userInfo?.masked_id,
      });

      setTopProducts(res?.data?.top_product);
      setTopServices(res?.data?.top_service);
    } catch (error) {
      console.log(error);
    }
  }

  async function getTargetReality() {
    const res = await api.post("targetvsrealsales", {
      user_id: userInfo?.masked_id,
      pivotedate: 0,
    });
    const salesRealityM = convertObjToArray(res?.data?.finalRealData).map((d) => d.col);
    const targetRealityM = convertObjToArray(res?.data?.finalTargetData).map((d) => d.col);
    setSalesTarget(salesRealityM);
    setRealityTarget(targetRealityM);
  }

  const getSalesBarchart = async () => {
    try {
      const data = {
        user_id: userInfo?.masked_id,
        pivotedate: 0,
      };
      const res = await api.post("salesbarchart", data);
      // const totalrev = res.data["gettotalrevenue"]
      setSalesBarchartData(res?.data?.salesbardata);
      console.log(salesBarchartData);
    } catch (error) {
      console.log(error, "the error");
    }
  };

  // user_id, pivotedate
  // const totalSales = async () => {
  //   try {
  //     const data = {
  //       user_id : userInfo?.masked_id,
  //       pivotedate : 30
  //     }
  //     console.log({data})
  //     // const res = await api.post("registeruser", {
  //     const res = await api.post("totalsales", data)
  //     const totalrev = res.data["totalsales"]
  //     console.log(totalrev,'the result')
  //   } catch (error) {
  //     console.log(error,'the error')
  //   }
  //   }

  // receiptdata
  const addSales = async () => {
    try {
      const data = {
        user_id: userInfo?.masked_id,
        pivotedate: 30,
      };
      console.log({ data });
      // const res = await api.post("registeruser", {
      const res = await api.post("receiptdata", data);
      const totalrev = res.data["receiptdata"];
    } catch (error) {
      console.log(error, "the error");
    }
  };

  const handleModalOpen = () => {
    setIsSalesOpen(true);
  };

  const handleEditSalesTargetModalOpen = () => {
    setIsSalesTargetOpen(true);
  };

  const handleSuccessModalClose = () => {
    setIsSuccessSalesOpen(false);
  };
  const handleModalClose = () => {
    setIsSalesOpen(false);
    setIsSuccessSalesOpen(false);
    setIsSalesTargetOpen(false);
  };

  const handleEditSalesTargetModalClose = () => {
    setIsSalesTargetOpen(false);
  };

  const Past = extractValues(salesBarchartData?.earlier);
  const Current = extractValues(salesBarchartData?.selected);

  return (
    <div className="flex flex-col w-full h-[90vh] overflow-auto hide-scrollbar">
      <header className="px-6 py-4 border-b md:border-t w-full">
        <span className="font-semibold text-[19px]">Sales</span>
      </header>
      <section className="p-6 flex flex-col gap-4 mb-[70px]">
        <article className="md:hidden">
          <SearchInput />
        </article>

        <article className="flex flex-col gap-4 mt-4 md:mt-0 rounded-md">
          <div className="flex flex-col md:flex-row gap-4 flex-wrap">
            <div className="flex flex-col md:grid md:grid-cols-4 w-full gap-4 flex-wrap">
              <StatCard
                title="Total Revenue"
                value={totalRevenueData?.totalRevenue}
                percentageChange={totalRevenueData?.percentageChange}
                days={daysR}
                onToggleDropdown={handleToggleDropdown}
                isDropdownOpen={isDropdownOpen}
                onSelectDays={handleSelectDays}
              />
              <StatCard
                title="Total Sales"
                value={totalSalesData?.totalSales}
                percentageChange={totalSalesData?.percentageChange}
                days={daysS}
                onToggleDropdown={handleToggleDropdown_sales}
                isDropdownOpen={isSalesDropdownOpen}
                onSelectDays={handleSelectDays_sales}
              />
              <StatCard
                title="Product Sales"
                value={productSales?.productsales}
                percentageChange={productSales?.percentageChange}
                isCash={false}
                days={daysPs}
                onToggleDropdown={handleToggleDropdown_product_sales}
                isDropdownOpen={isProductSalesDropdownOpen}
                onSelectDays={handleSelectDays_product_sales}
              />
              <StatCard
                title="Service Sales"
                value={serviceSales?.servicesales}
                percentageChange={serviceSales?.percentageChange}
                isCash={false}
                days={daysSs}
                onToggleDropdown={handleToggleDropdown_service_sales}
                isDropdownOpen={isServiceSalesDropdownOpen}
                onSelectDays={handleSelectDays_service_sales}
              />
            </div>
          </div>
        </article>

        <article className="shadow-md overflow-x-auto my-4 md:mb-0">
          {/* <Bartest
            height={300}
            title="Sales"
            data={convertObjToArray(salesBarchartData?.selected)}
            /> */}
          <div className="overflow-x-auto w-[1000px] md:w-full">
            <div className="w-[1000px] md:w-full py-3 flex gap-5 md:px-[30px] items-center">
              <h1 className="font-bold text-[16px] md:text-[18px]">This year sales</h1>
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
              // width={500}
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
              <h1 className="font-bold text-[14px] text-[#1c1c1c]">Sales Target vs Reality</h1>
              <button
                className="text-[12px] rounded-full bg-gray-200 px-3 py-2  text-center text-blue-700 ml-auto"
                onClick={handleEditSalesTargetModalOpen}
              >
                {" "}
                + Edit target
              </button>
            </div>
            <div className="">
              <Linetest height={300} projectedData={realityTarget} actualData={salesTarget} />
            </div>
            <div className="w-[600px] md:w-full flex flex-col gap-4 pl-8 pr-10 text-[12px] font-medium">
              <div className="flex w-full  items-center text-black">
                <div className="flex gap-2 items-center">
                  <span className="w-4 h-4 bg-[#45bdea] rounded"></span>
                  <span>Reality</span>
                </div>
                <div className="flex gap-2 ml-auto items-center">
                  <span className="w-4 h-4 bg-[#45bdea] rounded-full"></span>
                  <span className="font-semibold">₦1,000,003 in revenue so far</span>
                </div>
              </div>
              <div className="flex w-full  items-center text-black">
                <div className="flex gap-2 items-center">
                  <span className="w-4 h-4 bg-[#45598d] rounded"></span>
                  <span>Sales target</span>
                </div>
                <div className="flex gap-2 ml-auto items-center font-semibold">
                  <span>₦3,000,003 in revenue by end of the year</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col w-full md:w-[40%] px-5 py-4 shadow-md rounded-md overflow-x-auto">
            <div className="w-fit md:w-full">
              <div className="flex gap-8 justify-between items-center whitespace-nowrap py-3">
                <h3 className="font-bold text-[13px]">
                  Top {displayProductSwitch ? "Products" : "Services"}
                </h3>
                <span className="flex gap-4 items-center cursor-pointer bg-gray-100 rounded-full hover:underline ml-auto px-4 py-2">
                  <span
                    className="flex gap-1 text-[11px] "
                    onClick={() => setDisplayProductSwitch(!displayProductSwitch)}
                  >
                    Switch to {displayProductSwitch ? "services" : "products"}{" "}
                    <HiOutlineSwitchVertical />
                  </span>
                </span>
              </div>
              <table className="min-w-full divide-y divide-gray-200 mt-2">
                <thead className="text-[12px] whitespace-nowrap">
                  <tr>
                    <th scope="col" className="text-left font-medium text-gray-500">
                      #
                    </th>
                    <th scope="col" className="px-6 py-3 text-left font-medium text-gray-500">
                      Name
                    </th>
                    <th scope="col" className="px-6 py-3 text-center font-medium text-gray-500">
                      No. of sales
                    </th>
                    <th scope="col" className="px-6 py-3 text-center font-medium text-gray-500">
                      Sales(₦)
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {displayProductSwitch
                    ? topProducts.map((s) => (
                        <tr key={s?.id}>
                          <td className="whitespace-nowrap text-[12px] text-gray-900 font-bold">
                            {s?.id}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-[12px] text-gray-900">
                            {s?.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-center text-[12px] text-gray-900 font-bold">
                            {s?.quantity}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-[12px] text-gray-900">
                            <span className="text-[12px]">{s?.values}</span>
                          </td>
                        </tr>
                      ))
                    : topServices.map((s) => (
                        <tr key={s?.id}>
                          <td className="whitespace-nowrap text-[12px] text-gray-900 font-bold">
                            {s?.id}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-[12px] text-gray-900">
                            {s?.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-center text-[12px] text-gray-900 font-bold">
                            {s?.quantity}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-[12px] text-gray-900">
                            <span className="text-[12px]">{s?.values}</span>
                          </td>
                        </tr>
                      ))}
                </tbody>
              </table>
            </div>
          </div>
        </article>
        <article className="relative">
          <button
            className="flex items-center gap-4 rounded-full ml-auto mb-20 md:mb-4 p-4 bg-radial-gradient  md:w-auto text-center md:px-5 py-4 text-[36px] md:text-[16px] font-bold text-white fixed  bottom-6 md:bottom-4 right-4 z-10 shadow-lg hover:scale-105 transition-transform"
            onClick={handleModalOpen}
          >
            <FiPlus /> <span className="hidden md:block">Add Sales</span>
          </button>
          {/* <AddSalesModal  /> */}
          <AddSalesModalToModify onClose={handleModalClose} />
          <SuccessSalesModal onClose={handleModalClose} />
          <EditSalesTargetModal onClose={handleModalClose} />
        </article>
      </section>
    </div>
  );
};

export default Sales;
