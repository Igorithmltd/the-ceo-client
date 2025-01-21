import React, { useState, useEffect } from "react";
import SearchInput from "../../components/SearchInput";
import { MdOutlineContentCopy } from "react-icons/md";
import { CiCircleQuestion } from "react-icons/ci";
import { PiOfficeChairLight } from "react-icons/pi";
import { TfiWallet } from "react-icons/tfi";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import PercentageComparison from "../../components/PercentageComparison";
import PaginationFooter from "../../components/PaginationFooter";
import { useModal } from "../../context/ModalContext";
import SendMoneyModal from "../../components/modals/AddMoneyModal";
import AddSavingsModal from "../../components/modals/AddSavingsModal";
import { Link } from "react-router-dom";
import { TbSend } from "react-icons/tb";
import GetNewBankModal from "../../components/modals/GetNewBankModal";
import ConfirmTransferModal from "../../components/modals/ConfirmTransferModal";
import ApiSetup from "../../utils/ApiSetup";
import { useAuth } from "../../context/AuthContext";

const Wallet = () => {
  const { userInfo } = useAuth();
  const { setIsAddMoneyOpen, setIsAddSavingsOpen, setIsGetNewBankOpen, setAppLoading } =
    useModal();
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10;
  const api = ApiSetup();

  const [allBanks, setAllBanks] = useState([]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  // useEffect(() => {
  //   getNewBank();
  // }, []);

  // async function getNewBank() {
  //   if (userInfo?.masked_id) {
  //     setAppLoading(true);
  //     const data = {
  //       user_id: userInfo?.masked_id,
  //       type: "fundtransfer",
  //     };

  //     const res = await api.post("fetchinappaccount", data);
  //     setAllBanks(res?.data?.bank_codes);
  //     setAppLoading(false);
  //   }
  // }

  return (
    <div className="flex flex-col w-full h-[90vh] overflow-auto hide-scrollbar">
      <header className="px-6 py-4 border-b md:border-t w-full">
        <span className="font-semibold text-[19px]">Wallet</span>
      </header>
      <section className="p-6 flex flex-col gap-4 mb-[70px]">
        <article className="md:hidden">
          <SearchInput />
        </article>
        <article className="flex flex-col gap-4 p-2 mt-4 md:mt-0 rounded-md w-[95%] mb-[25%] md:mb-4">
          <div className="flex flex-col md:flex-row gap-4 flex-wrap">
            <div className="flex flex-col md:flex-row w-[100%] flex-wrap justify-between gap-4">
              <div className="pt-2 pl-6 pb-2 pr-2 w-full md:w-[33%] border rounded flex flex-col gap-2">
                <div className="flex items-center">
                  <div className="flex items-center gap-2 pt-2 text-[13px]">
                    <span className="font-bold ">Total Revenue</span>
                    <MdOutlineRemoveRedEye />
                  </div>
                  <div className="ml-auto mb-auto">
                    <span className="text-gray-400 ml-auto text-[16px]">
                      <CiCircleQuestion />
                    </span>
                  </div>
                </div>
                <span className="text-[23px] font-bold mt-6 ">
                  &#8358;15,528,600
                </span>
              </div>

              <div className="pt-2 pl-6 pb-2 pr-2 w-full md:w-[33%] border rounded flex flex-col gap-2">
                <div className="flex items-center">
                  <div className="flex items-center gap-2 pt-2 text-[13px]">
                    <span className="font-bold">Total Savings</span>
                    <MdOutlineRemoveRedEye />
                  </div>
                  <div className="ml-auto mb-auto">
                    <span className="text-gray-400 ml-auto text-[16px]">
                      <CiCircleQuestion />
                    </span>
                  </div>
                </div>
                <span className="text-[13px] my-4">
                  You have no savings yet
                </span>
                <span
                  className="my-3 ml-auto text-[13px] text-[#45598D] underline cursor-pointer"
                  onClick={() => setIsAddSavingsOpen(true)}
                >
                  Start saving
                </span>
              </div>

              <div
                className="pt-2 pl-6 pb-2 pr-2 w-full md:w-[23%] border rounded flex flex-col gap-2 items-center cursor-pointer"
                onClick={() => setIsGetNewBankOpen(true)}
              >
                <div className="flex items-center">
                  <div className="flex items-center gap-2 pt-2 mb-2">
                    <span className="font-bold text-[16px] text-[#45598D]">
                      Get a bank
                    </span>
                  </div>
                </div>
                <img src="../images/landing_page/bank.png" alt="" width={46} />
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4 flex-wrap w-[100%] h-[40vh]">
            <div className="flex flex-col md:flex-row w-[100%] gap-4 justify-between">
              <div className="p-3 md:p-6 border rounded flex flex-col gap-2 w-[100%] md:w-[60%]">
                <div className="flex items-center">
                  <div className="flex items-center gap-2 pt-2">
                    <span className="font-bold text-[15px]">
                      Your bank details
                    </span>
                  </div>
                </div>

                <span className="mt-3 text-[15px] text-grey-40 flex items-center">
                  Bank name{" "}
                  <span className="ml-auto text-black font-semibold flex">
                    Kredi Money MFB LTD
                    <MdOutlineContentCopy />
                  </span>
                </span>

                <span className="mt-3 text-[15px] text-grey-40 flex items-center">
                  Account name{" "}
                  <span className="ml-auto text-black font-semibold flex">
                    Amara Nwosu
                    <MdOutlineContentCopy />
                  </span>
                </span>

                <span className="mt-3 text-[15px] text-grey-40 flex items-center">
                  Account number{" "}
                  <span className="ml-auto text-black font-semibold flex">
                    0001200023
                    <MdOutlineContentCopy />
                  </span>
                </span>

                <div className="mt-10">
                  <PaginationFooter
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                </div>
              </div>

              <div className="p-3 md:p-6 border rounded flex flex-col gap-2 w-full md:w-[35%] relative">
                <div className="flex items-center">
                  <div className="flex items-center gap-2 pt-2">
                    <span className="font-bold text-[15px]">Cash flow</span>
                  </div>
                </div>
                <span className="mt-3 text-gray-400 flex items-center">
                  <span className="text-[15px] md:text-[18px] rounded b-2 text-black">
                    <h3>₦7,955,100.00</h3>
                    <h5 className="text-[13px] md:text-[15px] mt-3 md:mt-6 text-green-500">
                      Income
                    </h5>
                  </span>
                  <span className="ml-auto text-[15px] md:text-[18px] rounded b-2 text-black text-right">
                    <h3>₦7,330,500</h3>
                    <h5 className="text-[13px] md:text-[15px] mt-3 md:mt-6 text-red">
                      Expenses
                    </h5>
                  </span>
                </span>
                <div className="mt-4 md:mt-12">
                  <PercentageComparison
                    item1Percentage={40}
                    item2Percentage={60}
                  />
                </div>
              </div>
            </div>
          </div>
        </article>
        <article className="flex-col md:flex-row flex p-2 gap-8">
          <div className="flex-1 md:flex-[1.69] px-5 py-4 w-full border rounded-md">
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

            {/* {transactions.length > 0 &&
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
                          ))} */}

            <div className="flex justify-between md:px-4 items-center">
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
            </div>
            <div className="flex justify-between md:px-4 items-center">
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
            </div>
          </div>
        </article>
        <article className="relative">
          <button
            className="flex items-center gap-4 rounded-full ml-auto mb-20 md:mb-4 p-4 bg-radial-gradient  md:w-auto text-center md:px-5 py-4 text-[36px] md:text-[16px] font-bold text-white fixed  bottom-6 md:bottom-4 right-4 z-10 shadow-lg hover:scale-105 transition-transform"
            onClick={() => setIsAddMoneyOpen(true)}
          >
            <TbSend /> <span className="hidden md:block">Send money</span>
          </button>
        </article>
      </section>
      <SendMoneyModal />
      <ConfirmTransferModal />
      <AddSavingsModal />
      <GetNewBankModal />
    </div>
  );
};

export default Wallet;
