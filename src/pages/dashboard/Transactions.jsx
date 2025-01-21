import React, { useEffect, useState } from "react";
import SearchInput from "../../components/SearchInput";
import { PiOfficeChairLight } from "react-icons/pi";
import { TfiWallet } from "react-icons/tfi";
import { HiOutlineSpeakerphone } from "react-icons/hi";
import { PiMoneyDuotone } from "react-icons/pi";
import { PiHouseLine } from "react-icons/pi";
import { VscPersonAdd } from "react-icons/vsc";
import { MdOutlineAirplanemodeActive } from "react-icons/md";
import { RiHealthBookLine } from "react-icons/ri";
import { GiSelfLove } from "react-icons/gi";
import { TbReceiptTax } from "react-icons/tb";
import { GiAutoRepair } from "react-icons/gi";
import { GrNodes } from "react-icons/gr";
import { FaChalkboardTeacher } from "react-icons/fa";
import { VscLaw } from "react-icons/vsc";
import { CiBank } from "react-icons/ci";
import { PiForkKnifeLight } from "react-icons/pi";
import { CiGift } from "react-icons/ci";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { LiaPiggyBankSolid } from "react-icons/lia";
import { BsThreeDots } from "react-icons/bs";
import { IoIosArrowDown } from "react-icons/io";
import { TbSend } from "react-icons/tb";
import { useModal } from "../../context/ModalContext";
import AddMoneyModal from "../../components/modals/AddMoneyModal";
import { useAuth } from "../../context/AuthContext";
import ApiSetup, { getDurationFromNow } from "../../utils/ApiSetup";
import ConfirmTransferModal from "../../components/modals/ConfirmTransferModal";

const Transactions = () => {
  const { userInfo } = useAuth();
  const api = ApiSetup();
  const { setIsAddMoneyOpen } = useModal();
  const [transactiond, setTransactions] = useState([]);
  const [incomes, setIncome] = useState([]);
  const [expenses, setExpences] = useState([]);

  const items = [
    { id: 1, icon: HiOutlineSpeakerphone, name: "Marketing/Advertising" },
    { id: 2, icon: PiMoneyDuotone, name: "Salaries/Wages" },
    { id: 3, icon: PiHouseLine, name: "Rent/Lease" },
    { id: 4, icon: VscPersonAdd, name: "Loan" },
    { id: 5, icon: PiOfficeChairLight, name: "Office Supplies" },
    { id: 6, icon: MdOutlineAirplanemodeActive, name: "Travel & Transportation" },
    { id: 7, icon: RiHealthBookLine, name: "Health/Insurance" },
    { id: 8, icon: GiSelfLove, name: "Personal Care" },
    { id: 9, icon: TbReceiptTax, name: "Taxes" },
    { id: 10, icon: GiAutoRepair, name: "Repairs/Maintenance" },
    { id: 11, icon: GrNodes, name: "Internet/Software" },
    { id: 12, icon: FaChalkboardTeacher, name: "Training/Education" },
    { id: 13, icon: VscLaw, name: "Legal Fees" },
    { id: 14, icon: CiBank, name: "Bank Fees/Charges" },
    { id: 15, icon: PiForkKnifeLight, name: "Meals/Entertainment" },
    { id: 16, icon: CiGift, name: "Gifts & Donation" },
    { id: 17, icon: FaMoneyBillTransfer, name: "Account Funding" },
    { id: 18, icon: HiOutlineShoppingBag, name: "Shopping" },
    { id: 19, icon: LiaPiggyBankSolid, name: "Savings" },
    { id: 20, icon: BsThreeDots, name: "Miscellaneous Expenses" },
  ];

  useEffect(() => {
    if (userInfo?.masked_id) {
      getAllTransactions();
    }
  }, [userInfo?.masked_id]);

  const getAllTransactions = async () => {
    try {
      const data = {
        user_id: userInfo?.masked_id,
        count: "all",
      };
      const res = await api.post("fetchtransactions", data);
      // const totalrev = res.data["gettotalrevenue"]
      // Assuming res.data.datas is an array of transactions
      const allTransactions = res?.data.datas;

      // Filter transactions into income and expenses
      const filteredExpenses = allTransactions.filter(
        (transaction) => transaction.source === "expenses"
      );
      const filteredIncome = allTransactions.filter(
        (transaction) => transaction.source !== "expenses"
      );

      // Update state with the filtered transactions
      setTransactions(allTransactions); // If you still want to keep all transactions
      setExpences(filteredExpenses);
      setIncome(filteredIncome);
    } catch (error) {
      console.log(error, "the error");
    }
  };
  return (
    <div className="flex flex-col w-full overflow-auto hide-scrollbar">
      <header className="px-6 py-4 border-b md:border-t w-full">
        <span className="font-semibold text-[19px]">Transactions</span>
      </header>
      <section className="p-6 flex flex-col gap-4 mb-[70px]">
        <article className="md:hidden">
          <SearchInput />
        </article>
        <article className="flex flex-col gap-4 mt-4 md:mt-0 rounded-md w-[95%]">
          <div className="flex flex-col md:flex-row gap-4 flex-wrap w-[100%] mb-12">
            <div className="flex flex-col md:flex-row w-[100%] gap-4 justify-between items-center mx-auto">
              <article className="flex-col md:flex-row flex md:p-2 gap-8 w-full md:w-[48%]">
                <div className="flex-1 md:flex-[1.69] md:px-5 py-4 w-full border rounded-md">
                  <div className="flex justify-between items-center p-3 md:px-5">
                    <h3 className="font-bold text-[13px] md:text-[17px]">Money received</h3>
                    <span className="cursor-pointer flex items-center gap-2 rounded-full py-2 px-4 bg-grey-5 text-[12px] font-bold hover:underline">
                      This month
                      <IoIosArrowDown />
                    </span>
                  </div>
                  {incomes.length > 0 ? (
                    incomes.map((income) => (
                      <div
                        key={`${income.sender_name}-${income.date}`}
                        className="flex flex-col md:flex-row justify-between 
                      px-3 md:px-4 items-center"
                      >
                        <div className="flex gap-5 py-2 items-center w-full">
                          <div className="bg-grey-5 p-2 rounded-full w-[25.21px] h-[25.21px] md:w-[43px] md:h-[43px] flex justify-center items-center">
                            <TfiWallet cursor={"pointer"} className="w-[25.21px]  md:w-[43px]" />
                          </div>
                          <div>
                            <h5 className="font-semibold text-[14px] text-[#373737]">
                              {income?.sender_name}
                            </h5>
                            <span className="hidden md:block text-[12px] text-[#898989]">
                              {getDurationFromNow(income?.date)}
                            </span>
                          </div>
                        </div>
                        <div className="pl-12 md:pl-0 w-full flex justify-end">
                          <div className="w-full md:w-fit flex items-center justify-between">
                            <span className="md:hidden text-[12px] text-[#898989]">
                              {getDurationFromNow(income?.date)}
                            </span>
                            <span className="text-[#03A12F] font-bold text-[15px]">
                              +₦{income.amount}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-[14px] grid place-items-center h-[100px]">
                      No data to display
                    </p>
                  )}
                </div>
              </article>

              <article className="flex-col md:flex-row flex gap-8 w-full md:w-[48%]">
                <div className="flex-1 md:flex-[1.69] md:px-5 py-4 w-full border rounded-md">
                  <div className="flex justify-between items-center p-3 md:px-5">
                    <h3 className="font-bold text-[13px] md:text-[17px]">Money sent</h3>
                    <span className="cursor-pointer flex items-center gap-2 rounded-full py-2 px-4 bg-grey-5 text-[12px] font-bold hover:underline">
                      This month
                      <IoIosArrowDown />
                    </span>
                  </div>

                  {expenses.length > 0 ? (
                    expenses.map((expense) => (
                      <div
                        key={`${expense.sender_name}-${expense.date}`}
                        className="flex flex-col md:flex-row justify-between 
                      px-3 md:px-4 items-center"
                      >
                        <div className="flex gap-5 py-2 items-center w-full">
                          <div className="bg-grey-5 p-2 rounded-full w-[25.21px] h-[25.21px] md:w-[43px] md:h-[43px] flex justify-center items-center">
                            <TfiWallet cursor={"pointer"} className="w-[25.21px]  md:w-[43px]" />
                          </div>
                          <div>
                            <h5 className="font-semibold text-[14px] text-[#373737]">
                              {expense?.sender_name}
                            </h5>
                            <span className="hidden md:block text-[12px] text-[#898989]">
                              {getDurationFromNow(expense?.date)}
                            </span>
                          </div>
                        </div>
                        <div className="pl-12 md:pl-0 w-full flex justify-end">
                          <div className="w-full md:w-fit flex items-center justify-between">
                            <span className="md:hidden text-[12px] text-[#898989]">
                              {getDurationFromNow(expense?.date)}
                            </span>
                            <span className="text-red font-bold text-[15px]">
                              -₦{expense.amount}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-[14px] grid place-items-center h-[100px]">
                      No data to display
                    </p>
                  )}
                </div>
              </article>
            </div>
          </div>
        </article>
        <article className="shadow-md">
          {/* <Barchart labels={sampleLabel} title='Expense' data={sampleData}  /> */}
        </article>

        <section className="w-[95%] mx-auto py-10 border rounded-md text-[14px] font-semibold">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {items.map((item) => (
              <div key={item.id} className="flex justify-between md:px-4 items-center pl-6">
                <div className="flex gap-5 py-2 items-center">
                  <div className="bg-grey-5 text-grey-40 h-[43px] font-extrabold w-[43px] rounded-full flex justify-center items-center">
                    <item.icon cursor={"pointer"} size={21} />
                  </div>
                  <div>
                    <h5 className="text-wrap text-[#373737]">{item.name}</h5>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <article className="relative">
          <button
            className="flex items-center gap-4 rounded-full ml-auto mb-20 md:mb-4 p-4 bg-radial-gradient  md:w-auto text-center md:px-5 py-4 text-[36px] md:text-[16px] font-bold text-white fixed  bottom-6 md:bottom-4 right-4 z-10 shadow-lg hover:scale-105 transition-transform"
            onClick={() => setIsAddMoneyOpen(true)}
          >
            <TbSend /> <span className="hidden md:block">Send money</span>
          </button>
        </article>
      </section>
      <AddMoneyModal />
      <ConfirmTransferModal />
    </div>
  );
};

export default Transactions;
