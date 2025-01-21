import React from "react";
import Hero2 from "../components/Hero2";
import Cta from "../components/Cta";
import { useState } from "react";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import flags from "react-phone-number-input/flags";

const Contact = () => {
  const [value, setValue] = useState();
  const [showButton, setShowButton] = useState(true);
  return (
    <>
      <Hero2
        heading={
          <>
            <span className="text-red">Contact Us</span>
          </>
        }
        paragraph="Do you have any questions for us or suggestions you’ll like us to hear? - Contact us, our team would love to hear from you"
        button={showButton}
      />
      <div className="container mx-auto">
        <div className="flex gap-10 flex-col lg:flex-row mt-[40px] lg:mt-[70px] justify-between">
          <div className=" pt-8 lg:ml-16 lg:w-1/2">
            <h3 className="text-blue text-[18px] lg:text-[23px] text-center lg:text-left font-bold mb-12">
              Write us a message
            </h3>
            <div className="max-w-full">
              <form className="flex flex-col justify-center px-6 text-[14px]">
                <div className="flex flex-col lg:flex-row  lg:items-end mb-4  w-full justify-between">
                  <div className="flex items-center w-full lg:w-1/3">
                    <label className="hidden lg:block font-bold">Name</label>
                    <label className="block lg:hidden font-bold">First Name</label>
                  </div>
                  <div className="flex items-end w-full lg:w-2/3 justify-between gap-4 ">
                    <input
                      type="text"
                      placeholder="First Name"
                      className="mt-2 px-4 py-3 h-[44px] w-full lg:w-1/2 bg-[#F1F1F1] border-b-gray-500 border"
                    />
                    <input
                      type="text"
                      placeholder="Last Name"
                      className="mt-2 px-4 w-1/2  h-[44px] py-3 bg-[#F1F1F1] border-b-gray-500 border hidden lg:block"
                    />
                  </div>
                </div>
                <div className="flex flex-col lg:hidden lg:flex-row items-center lg:items-end mb-4 w-full justify-between">
                  <div className="flex items-center w-full lg:w-1/3">
                    <label className="hidden lg:block font-bold">Name</label>
                    <label className="block lg:hidden font-bold">Last Name</label>
                  </div>
                  <div className="flex items-end w-full lg:w-2/3 justify-between gap-4 ">
                    <input
                      type="text"
                      placeholder="First Name"
                      className="mt-2 px-4 py-3 h-[44px] w-full lg:w-1/2 bg-[#F1F1F1] border-b-gray-500 border"
                    />
                    <input
                      type="text"
                      placeholder="Last Name"
                      className="mt-2 px-4 w-1/2 h-[44px] py-3 bg-[#F1F1F1] border-b-gray-500 border hidden lg:block"
                    />
                  </div>
                </div>

                <div className="flex flex-col  md:flex-row md:gap-0 gap-1 justify-between mt-[5px] mb-4">
                  <label className="w-fit md:w-1/5 md:mt-auto font-bold" htmlFor="">
                    Phone no.
                  </label>
                  <div className="border-b border-gray-400 w-full lg:w-2/3">
                    {/* <input className="" type="text" />
                     */}
                    <PhoneInput
                      international
                      placeholder="9000000000"
                      value={value}
                      onChange={setValue}
                      flags={flags}
                      defaultCountry="NG"
                      className="phone-input mr-0 bg-gray-300 md:w-full"
                    />
                  </div>
                </div>
                <div className="flex flex-col lg:flex-row items-center lg:items-end mb-4 w-full justify-between">
                  <div className="flex items-center w-full lg:w-1/3">
                    <label className="font-bold">Email</label>
                  </div>
                  <input
                    type="text"
                    placeholder="Enter your email address"
                    className="mt-2  w-full h-[44px] lg:w-2/3 px-4 py-3 bg-[#F1F1F1] border-b-gray-500 border"
                  />
                </div>

                <div className="flex flex-col lg:flex-row items-center lg:items-end mb-4 w-full justify-between">
                  <div className="flex items-center w-full lg:w-1/3">
                    <label className="font-bold">Message</label>
                  </div>
                  <textarea
                    rows="5"
                    placeholder="Wite your Message"
                    className="mt-2  px-6 w-full lg:w-2/3 py-3 min-h-52 bg-[#F1F1F1] border-b-gray-500 border"
                  ></textarea>
                </div>
                <div className="mt-16 flex gap-6">
                  <button
                    type="submit"
                    className="w-full rounded-[4px] bg-radial-gradient py-4 font-semibold text-white shadow-sm"
                  >
                    Send
                  </button>
                </div>
                <p className=" mt-8 text-center lg:text-left font-semibold text-[14px] lg:text-[16px]">
                  or email us at{" "}
                  <a href="#">
                    <span className="text-red">contactus@theceoapp.com</span>
                  </a>
                </p>
              </form>
            </div>
          </div>
          <div className=" p-16">
            <img src="/images/landing_page/contact.svg" alt="" className="w-full hidden lg:block" />
          </div>
        </div>
      </div>
      <Cta
        heading={
          <>
            <span className="text-[#ffffff]">
              Simplify your financial journey today with TheCEOApp.
            </span>
          </>
        }
        paragraph={
          <>
            <span className="text-[#ffffff]">
              Join thousands of businesses already benefiting from TheCEOApp and experience a new
              standard in accounting and business management.
            </span>
          </>
        }
      />
    </>
  );
};

export default Contact;
