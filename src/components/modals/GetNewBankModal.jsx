import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import { ImCancelCircle } from "react-icons/im";
import { useModal } from "../../context/ModalContext";
import SelectInput from "../dashboard/SelectInput";
import { BsBank2 } from "react-icons/bs";
import successImage from "/images/bank-success.png";
import SuccessModal from "./SuccessModal";
import ApiSetup from "../../utils/ApiSetup";
import { useAuth } from "../../context/AuthContext";
import TextInput from "../dashboard/TextInput";

const GetNewBankModal = () => {
  const api = ApiSetup();
  const { isGetNewBankOpen, setIsGetNewBankOpen, setIsSuccessOpen } =
    useModal();
  const { userInfo } = useAuth();

  const [currencey, setCurrency] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", ""]);
  const [selectedBank, setSelectedBank] = useState(null);
  const [selectedBankName, setSelectedBankName] = useState('');
  const [bvn, setBvn] = useState('')

  const [allBanks, setAllBanks] = useState([]);

  const [isVerification, setIsVerification] = useState(false);
  const [customerCode, setCustomerCode] = useState('');

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [middleName, setMiddleName] = useState('');


  const handleBankChange = (e) => {
    const bank_name = e.target.value;
    setSelectedBankName(bank_name);
    const bank_detail = allBanks.find((bank) => bank.name == bank_name);
    setCurrency(bank_detail.currency);
    setSelectedBank(bank_detail);
  };


  useEffect(() => {
    getNewBank();
    processname();
  }, [userInfo]);

  function processname(){
    let fullname = userInfo?.fullname;
    let name = fullname?.split(" ");
    if(name?.length === 1){
        setFirstName(!(firstName)? name[0] : firstName);
        setMiddleName("");
        setLastName("");
    }else if(name?.length === 2){
        setFirstName(!(firstName)? name[0] : firstName);
        setMiddleName("");
        setLastName(!(lastName)? name[1] : lastName);
    }else if (name?.length >= 3){
        setFirstName(!(firstName)? name[0] : firstName);
        setMiddleName(!(middleName)? name[1] : middleName);
        setLastName(!(lastName)? name[2] : lastName);
    }
}


  async function getNewBank() {
    if (userInfo?.masked_id) {
      const data = {
        user_id: userInfo?.masked_id,
        type: "fundtransfer",
      };

      const res = await api.post("fetchinappaccount", data);
      setCustomerCode(res?.data?.customercode)
      let banks = res?.data?.bank_codes;
      if (banks) {
        banks = banks.map((bank) => ({
          ...bank,
          label: bank.name,
          value: bank.name,
        }));
      }
      setAllBanks(banks);
    }
  }

  const handleChange = (value, index) => {
    if (/^\d$/.test(value) || value === "") {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (value !== "" && index < otp.length - 1) {
        document.getElementById(`otp-input-${index + 1}`).focus();
      }
    }
  };

  const closeModal = () => {
    setIsGetNewBankOpen(false);
  };

  const handleGetBank = async () => {
    try {
      const data = {
        user_id: userInfo?.masked_id,
        bvn: bvn,
        preferred_bank: 'test-bank',
        // preferred_bank: selectedBank?.name,
        preferred_bank_code: selectedBank?.code,
        customer: customerCode,
        email: userInfo?.email,
        phone: userInfo?.phone,
        first_name: firstName || lastName,
        last_name: lastName || firstName,
      };
      const res = await api.post("creatededicatedaccount", data);
      // setIsVerification(true)
      console.log({bvn: res})
    } catch (error) {
      console.log(error);
    }
  };

  //   @app.route("/api/creatededicatedaccount", methods = ["POST", "OPTIONS"])
  //  ready = checkReadyPostRequest(["user_id", "preferred_bank","bvn","preferred_bank_code","customer","email","phone","first_name","last_name"])

  return (
    <Modal isOpen={isGetNewBankOpen} closeModal={closeModal}>
      <div className="absolute md:relative m-auto bottom-0 md:bottom-auto bg-white md:w-[70vw] lg:w-[50vw] w-full md:max-h-[90%] rounded-[16px] pt-4">
        <div className="flex py-5 items-center justify-between px-8 border-b border-gray-400">
          <div className="flex justify-between">
            <h2 className="text-[15px] md:text-[17px] font-bold">
              Get a new bank
            </h2>
          </div>

          <div>
            <ImCancelCircle
              className="size-[16px] md:size-[24px] text-grey-40 cursor-pointer"
              title="close"
              onClick={closeModal}
            />
          </div>
        </div>

        {!isVerification ? (
          <div className="flex gap-5 mt-5 flex-col md:flex-row">
            <div className="flex-1 px-6 text-gray-500 md:h-full overflow-auto text-xs">
            <TextInput
              label="BVN"
              id="accountNumber"
              placeholder="Enter your BVN"
              type="text"
              value={bvn}
              // labelIcon={TbSend}
              onChange={(e) => setBvn(e.target.value)}
            />
              <SelectInput
                label="Currency"
                id="currency"
                disabled
                value={currencey}
                labelIcon={BsBank2}
                onChange={(e) => setCurrency(e.target.value)}
                options={[{ value: "NGN", label: "Nigerian Naira (₦)" }]}
              />

              <SelectInput
                label="Bank"
                id="bank"
                value={selectedBankName}
                isLast
                labelIcon={BsBank2}
                onChange={handleBankChange}
                options={allBanks}
              />

              <div className="py-5 flex justify-end items-center px-1  mt-4">
                <div className="flex gap-6 items-center justify-center md:justify-between w-full md:w-auto px-1">
                  <button
                    className="flex gap-2 text-white w-[70%] md:w-auto text-[12px] md:text-[16px] py-5 px-8 bg-radial-gradient rounded-[50px] justify-center items-center font-bold md:gap-3"
                    onClick={() => handleGetBank(true)}
                  >
                    <span className="">Confirm</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="px-8 text-[15px] md:text-[17px] mt-6">
            <div className="flex justify-between">
              <span className="text-[#4D4D4D]">
                Verify your request for a new bank
              </span>
              <span className="text-[#45598D]">Resend code</span>
            </div>
            <p className="mb-10 mt-24">
              Kindly input the one-time password sent to your email for
              verification
            </p>
            <div className="flex justify-center gap-2 mb-6">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-input-${index}`}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleChange(e.target.value, index)}
                  className="w-[63px] h-[63px] mr-4 border border-[#999999] rounded-[5px] text-center text-[26px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ))}
            </div>

            <div className="py-5 flex items-center justify-end px-1  my-4">
              <div className="flex gap-6 items-center justify-between w-full md:w-auto px-1">
                <button className="text-red text-[12px] md:text-[16px] py-5 px-8 border-red border-[2px] rounded-[50px] flex text-center font-bold md:gap-3">
                  <span
                    className="flex items-center text-center"
                    onClick={() => setIsVerification(false)}
                  >
                    Back
                  </span>
                </button>
                <button
                  className="flex gap-2 text-white text-[12px] md:text-[16px] py-5 px-8 bg-radial-gradient rounded-[50px] justify-center items-center font-bold md:gap-3 my"
                  onClick={() => {
                    setIsSuccessOpen(true);
                  }}
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}

        <SuccessModal
          title="Awesome! You've added a new bank"
          image={successImage}
        />
      </div>
    </Modal>
  );
};

export default GetNewBankModal;
