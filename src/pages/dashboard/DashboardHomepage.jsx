import React, { useEffect, useState } from "react";
import SearchInput from "../../components/SearchInput";
import { AiOutlineRise } from "react-icons/ai";
import { AiOutlineFall } from "react-icons/ai";
import { PiDotsThree } from "react-icons/pi";
import { CiCircleQuestion } from "react-icons/ci";
import Bartest from "../../components/charts/Bartest";
import { PiOfficeChairLight } from "react-icons/pi";
import { TfiWallet } from "react-icons/tfi";
import { dataset, dataset2 } from "../../components/charts/dataset";
import { useAuth } from "../../context/AuthContext";
import ApiSetup, { getDurationFromNow } from "../../utils/ApiSetup";
import { convertObjToArray, convertObjToArrayInDays, extractValues } from "../../utils/helpers";
import { BarChart } from "@mui/x-charts/BarChart";
import { axisClasses, chartsGridClasses } from "@mui/x-charts";
import { Link } from "react-router-dom";
import StatCard from "../../components/dashboard/StatCard";

const DashboardHomepage = () => {
  const { userInfo } = useAuth();
  const api = ApiSetup();

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
  const [totalExpenses, setTotalExpenses] = useState({
    percentageChange: 0,
    sumExpensesValue: 0,
  });
  const [totalCustomers, setTotalCustomers] = useState(80);
  const [salesBarchartData, setSalesBarchartData] = useState(null);
  const [expenseBarchart, setExpenseBarchart] = useState(null);
  const [debtors, setDebtors] = useState([]);
  const [transactions, setTransactions] = useState([]);

  const [daysR, setDaysR] = useState(30);
  const [daysE, setDaysE] = useState(30);
  const [daysC, setDaysC] = useState(30);
  const [daysS, setDaysS] = useState(30);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State to manage dropdown visibility
  const [isExpensesDropdownOpen, setIsExpensesDropdownOpen] = useState(false);
  const [isSalesDropdownOpen, setIsSalesDropdownOpen] = useState(false);
  const [isCustomersDropdownOpen, setIsCustomersDropdownOpen] = useState(false);

  const handleToggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen); // Toggle dropdown visibility
  };

  const handleToggleDropdown_expenses = () => {
    setIsExpensesDropdownOpen(!isExpensesDropdownOpen); // Toggle dropdown visibility
  };

  const handleToggleDropdown_sales = () => {
    setIsSalesDropdownOpen(!isSalesDropdownOpen); // Toggle dropdown visibility
  };

  const handleToggleDropdown_customers = () => {
    setIsCustomersDropdownOpen(!isCustomersDropdownOpen); // Toggle dropdown visibility
  };

  const handleSelectDays = (value) => {
    setDaysR(value);
    getTotalRevenue(daysR);
    setIsDropdownOpen(false); // Close dropdown after selection
  };
  const handleSelectDays_expenses = (value) => {
    setDaysE(value); // Update days state
    getTotalExpenses(value);
    setIsExpensesDropdownOpen(false); // Close dropdown after selection
  };
  const handleSelectDays_sales = (value) => {
    setDaysS(value);
    getTotalSales(daysS);
    setIsSalesDropdownOpen(false); // Close dropdown after selection
  };
  const handleSelectDays_customers = (value) => {
    setDaysC(value); // Update days state
    getTotalCustomers(daysC);
    setIsCustomersDropdownOpen(false); // Close dropdown after selection
  };

  useEffect(() => {
    if (userInfo?.masked_id) {
      getTotalRevenue();
      getTotalSales();
      getTotalCustomers();
      getSalesBarchart();
      getExpenseBarchart();
      getAllDebtors();
      getTotalExpenses();
      getTransactions();
    }
  }, [userInfo?.masked_id]);

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
  const getTotalExpenses = async (days = 30) => {
    try {
      const data = {
        user_id: userInfo?.masked_id,
        pivotedate: days,
      };
      const res = await api.post("getdatedtotalexpenses", data);
      // const totalrev = res.data["gettotalrevenue"]
      setTotalExpenses({
        ...totalExpenses,
        sumExpensesValue: res?.data?.sumExpensesValue,
        percentageChange: res?.data?.percentageChange,
      });
    } catch (error) {
      console.log(error, "the error");
    }
  };
  const getTotalCustomers = async (days = 30) => {
    try {
      const data = {
        u_id: userInfo?.masked_id,
        pivotedate: days,
      };
      const res = await api.post("gettotalcustomers", data);
      // const totalrev = res.data["gettotalrevenue"]
      setTotalCustomers(res?.data.totalcustomers);
    } catch (error) {
      console.log(error, "the error");
    }
  };
  const getSalesBarchart = async () => {
    try {
      const data = {
        user_id: userInfo?.masked_id,
        pivotedate: 0,
      };
      const res = await api.post("salesbarchart", data);
      // const totalrev = res.data["gettotalrevenue"]
      setSalesBarchartData(res?.data?.salesbardata);
    } catch (error) {
      console.log(error, "the error");
    }
  };
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
  const getAllDebtors = async () => {
    try {
      const data = {
        u_id: userInfo?.masked_id,
        pivotedate: 0,
      };
      const res = await api.post("getalldebtors", data);
      // const totalrev = res.data["gettotalrevenue"]
      setDebtors(res?.data.datas);
    } catch (error) {
      console.log(error, "the error");
    }
  };

  const getTransactions = async () => {
    try {
      const data = {
        user_id: userInfo?.masked_id,
        count: 3,
      };
      const res = await api.post("fetchtransactions", data);
      // const totalrev = res.data["gettotalrevenue"]
      setTransactions(res?.data.datas);
    } catch (error) {
      console.log(error, "the error");
    }
  };

  const Past = extractValues(salesBarchartData?.earlier);
  const Current = extractValues(salesBarchartData?.selected);

  const Past_expenses = extractValues(expenseBarchart?.earlier);
  const Current_expenses = extractValues(expenseBarchart?.selected);

  return (
    <div className="flex flex-col w-full h-full overflow-auto hide-scrollbar">
      <header className="px-6 py-4 border-b md:border-t w-full">
        <span className="font-semibold text-[19px]">Dashboard</span>
      </header>
      <section className="p-6 flex flex-col gap-4 mb-[70px]">
        <article className="md:hidden">
          <SearchInput />
        </article>
        <article className="flex flex-col md:flex-row gap-4 mt-4 md:mt-0 rounded-md">
          <div className="flex flex-col md:flex-row md:w-1/2 gap-4 flex-wrap">
            <div className="flex flex-col md:grid md:grid-cols-2 w-full gap-4 flex-wrap">
              <StatCard
                title="Total Revenue"
                value={totalRevenueData.totalRevenue}
                percentageChange={totalRevenueData.percentageChange}
                days={daysR}
                onToggleDropdown={handleToggleDropdown}
                isDropdownOpen={isDropdownOpen}
                onSelectDays={handleSelectDays}
              />
              <StatCard
                title="Total Expenses"
                value={totalExpenses?.sumExpensesValue}
                percentageChange={totalExpenses?.percentageChange}
                days={daysE}
                onToggleDropdown={handleToggleDropdown_expenses}
                isDropdownOpen={isExpensesDropdownOpen}
                onSelectDays={handleSelectDays_expenses}
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
                title="Customers"
                value={totalCustomers}
                percentageChange={7.0}
                isCash={false}
                isPositiveChange={false}
                days={daysC}
                onToggleDropdown={handleToggleDropdown_customers}
                isDropdownOpen={isCustomersDropdownOpen}
                onSelectDays={handleSelectDays_customers}
              />
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:w-1/2 gap-4 shadow-md  overflow-x-auto ">
            <div className="overflow-x-auto w-[1000px] md:w-full">
              <div className="w-[1000px] md:w-full py-3 flex gap-5 md:px-[30px] items-center">
                <h1 className="font-bold text-[13px]">This year Expenses</h1>
                <div className="flex-1 md:gap-3 gap-2 flex items-center justify-end med:pe-5 text-[10px] md:text-[12px]">
                  <div className="flex items-center gap-1">
                    <span className="w-4 h-4 bg-gray-400 rounded"></span>
                    <label htmlFor="" className="text-[12px] font-bold">
                      Previous year
                    </label>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="w-4 h-4 bg-[#45598d] rounded"></span>
                    <label htmlFor="" className="text-[12px] font-bold">
                      Current level
                    </label>
                  </div>
                  {/* <select className="outline-none border py-1 px-2 rounded-xl" name="" id="">
                        <option value="">This month</option>
                    </select> */}
                </div>
              </div>
              <BarChart
                className="md:!w-auto"
                // width={500}
                height={250}
                series={[
                  {
                    data: Current_expenses,
                    id: "uvId",
                    stack: "total",
                    color: "rgba(6, 34, 103, 0.9)",
                  },
                  { data: Past_expenses, id: "pvId", stack: "total", color: "#d9d4d4" },
                ]}
                xAxis={[
                  {
                    data: [
                      "Jan",
                      "Feb",
                      "Mar",
                      "Apr",
                      "May",
                      "Jun",
                      "Jul",
                      "Aug",
                      "Sep",
                      "Oct",
                      "Nov",
                      "Dec",
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
          </div>
        </article>
        <article className="shadow-md  overflow-x-auto ">
          {/* <Barchart labels={sampleLabel} title='Expense' data={sampleData}  /> */}

          <div className="overflow-x-auto w-[1000px] md:w-full">
            <div className="w-[1000px] md:w-full py-3 flex gap-5 md:px-[30px] items-center">
              <h1 className="font-bold text-[16px] md:text-[18px]">This year Sales</h1>
              <div className="flex-1 md:gap-3 gap-2 flex items-center justify-end med:pe-5 text-[12px] font-bold">
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
          <div className="flex-1 md:flex-[2] px-5 py-4 text-blue shadow-md rounded-md w-full">
            <div className="flex justify-between p-3 px-5">
              <h3 className="font-bold text-[14px] md:text-[17px] text-[#343434]">Debtors</h3>
              <span className="cursor-pointer text-[14px] font-medium text-[#45598D] hover:underline">
                View all
              </span>
            </div>
            <div className="overflow-x-auto mt-3">
              <table className="min-w-full divide-y divide-gray-200 text-[12px]">
                <thead className="bg-gray-100">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left font-normal text-gray-500 uppercase tracking-wider"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left font-normal text-gray-500 uppercase tracking-wider"
                    >
                      Phone
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left font-normal text-gray-500 uppercase tracking-wider"
                    >
                      Amount
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left font-normal text-gray-500 uppercase tracking-wider"
                    >
                      Debit type
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {debtors.length > 0 &&
                    debtors.map((debtor) => (
                      <tr key={debtor?.phone}>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-900 font-bold">
                          {debtor?.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                          {debtor?.phone}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-900 font-semibold">
                          ₦{debtor?.totaldebt}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                          <span className="bg-red-200 px-2 py-1 rounded-lg text-red cursor-pointer font-bold">
                            Cash loan
                          </span>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex-1 md:flex-[1.69] px-5 py-4 w-full shadow-md rounded-md">
            <div className="flex justify-between p-3 md:px-5 mb-3">
              <h3 className="font-bold text-[14px] md:text-[17px] text-[#343434]">
                Recent transactions
              </h3>
              <Link
                to="/dashboard/transaction"
                className="cursor-pointer text-[14px] text-[#45598D] hover:underline"
              >
                View all
              </Link>
            </div>

            {transactions.length > 0 &&
              transactions.map((transaction) => (
                <div key={transaction?.id} className="flex justify-between md:px-4 items-center">
                  <div className="flex gap-5 py-2">
                    <div className="bg-gray-200 h-[43px] w-[43px] rounded-full flex justify-center items-center">
                      <PiOfficeChairLight cursor={"pointer"} size={21} />
                    </div>
                    <div>
                      <h5 className="font-semibold text-[13px] md:text-[15px]">
                        {transaction?.source === "expenses"
                          ? transaction?.tag
                          : transaction?.sender_name}
                      </h5>
                      <span className="text-[12px] text-gray-400">
                        {getDurationFromNow(transaction?.date)}
                      </span>
                    </div>
                  </div>
                  <div>
                    <span
                      className={`font-bold text-[13px] md:text-[15px] ${
                        transaction?.source === "expenses" ? "text-red" : "text-green"
                      }`}
                    >
                      {transaction?.source === "expenses"
                        ? `- ₦${Math.abs(transaction.amount)}`
                        : `₦${Math.abs(transaction.amount)}`}
                    </span>
                  </div>
                </div>
              ))}

            {/* <div className="flex justify-between md:px-4 items-center">
              <div className="flex gap-5 py-2">
                <div className="bg-gray-200 h-[43px] w-[43px] rounded-full flex justify-center items-center">
                  <PiOfficeChairLight cursor={"pointer"} size={21} />
                </div>
                <div>
                  <h5 className="font-bold">Office supplies</h5>
                  <span className="text-sm text-gray-400">5 minutes ago</span>
                </div>
              </div>
              <div>
                <span className="text-red">-₦97,000</span>
              </div>
            </div>
            <div className="flex justify-between md:px-4 items-center">
              <div className="flex gap-5 py-2">
                <div className="bg-gray-200 h-[43px] w-[43px] rounded-full flex justify-center items-center">
                  <TfiWallet cursor={"pointer"} size={21} />
                </div>
                <div>
                  <h5 className="font-bold">From Adaora Okoye</h5>
                  <span className="text-sm text-gray-400">5 minutes ago</span>
                </div>
              </div>
              <div>
                <span className="text-green-800">+₦120,000</span>
              </div>
            </div>
            <div className="flex justify-between md:px-4 items-center">
              <div className="flex gap-5 py-2">
                <div className="bg-gray-200 h-[43px] w-[43px] rounded-full flex justify-center items-center">
                  <TfiWallet cursor={"pointer"} size={21} />
                </div>
                <div>
                  <h5 className="font-bold">From Chinelo Eze</h5>
                  <span className="text-sm text-gray-400">5 minutes ago</span>
                </div>
              </div>
              <div>
                <span className="text-green-800">+₦120,000</span>
              </div>
            </div> */}
          </div>
        </article>
      </section>
      {/* <div className="absolute w-full bottom-0 hd-[70px] border-2 flex justify-evenly py-4 bg-white">
      <div className="">
          <img className="w-[15px] mx-auto mb-3" src="/images/dash-icon.png" alt="" />
          <p className="text-[8px]">Dashboard</p>
        </div>
        <div className="">
          <img className="w-[15px] mx-auto mb-3" src="/images/sale-icon.png" alt="" />
          <p className="text-[8px]">Sales</p>
        </div>
        <div className="">
          <img className="w-[15px] mx-auto mb-3" src="/images/wallet-icon.png" alt="" />
          <p className="text-[8px]">Wallet</p>
        </div>
        <div className="">
          <img className="w-[15px] mx-auto mb-3" src="/images/design-icon.png" alt="" />
          <p className="text-[8px]">Designs</p>
        </div>
        <div className="">
          <img className="w-[15px] mx-auto mb-3" src="/images/website-icon.png" alt="" />
          <p className="text-[8px]">My Website</p>
        </div>
      </div> */}
    </div>
  );
};

export default DashboardHomepage;
