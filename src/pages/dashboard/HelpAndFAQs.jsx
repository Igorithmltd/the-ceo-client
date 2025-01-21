/* eslint-disable react-hooks/exhaustive-deps */
import React , {useEffect, useState }from "react";
import SearchInput from "../../components/SearchInput";
import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import { HiOutlineMail } from "react-icons/hi";
import { CiPhone } from "react-icons/ci";
import ApiSetup from "../../utils/ApiSetup";

const HelpAndFAQs = () => {
  const [reading, setReading] = useState('1')
  const [allFqas, setAllFqas] = useState([]);
  const api = ApiSetup();

  useEffect(() => {
    getAllFqas();
  }, []);
  
  const getAllFqas = async () => {
    try {
      const fqas = await api.post("getfaq")
      
      if (fqas?.data) {
        setAllFqas(fqas?.data.datas);
      }
    } catch (error) {
      console.log(error,'the error')
    }
  }
  // const faqs_ = [
  //   {
  //     id: '1',
  //     question: 'How do I add a new product to my inventory?',
  //     ans: 'Log into your dashboard, click on add new product, fill in the form and submit'
  //   },
  //   {
  //     id: '2',
  //     question: 'Can I track my sales and expenses in real time?',
  //     ans: '...'
  //   },
  //   {
  //     id: '3',
  //     question: 'Is it possible to integrate my online store with CEOApp?',
  //     ans: '...'
  //   },
  //   {
  //     id: '4',
  //     question: 'What payment methods are accepted?',
  //     ans: '...'
  //   },
  //   {
  //     id: '5',
  //     question: 'How do I create a new design for my website?',
  //     ans: '...'
  //   },
  //   {
  //     id: '6',
  //     question: 'How can I add custom code to my website?',
  //     ans: '...'
  //   },
  // ]



  return (
    <div className="flex flex-col w-full h-[90vh] overflow-auto hide-scrollbar">
      <header className="px-6 py-4 border-b md:border-t w-full">
        <span className="font-bold">Help & FAQs</span>
      </header>
      <section className="p-6 flex flex-col gap-4 mb-[70px]">
        <article className="md:hidden">
          <SearchInput />
        </article>
        <article
        className="flex flex-col gap-4 pt-8 md:px-6 max-w-full"
        id="faq"
        >
          <div className="font-bold">Frequently Asked Question</div>
      
          <div className="relative overflow-hidden border rounded">
            <ul className="max-w-full overflow-hidden">
              {allFqas.map((faq) => (
                <li
                  key={faq.id}
                  onClick={() => {
                    setReading(reading === faq.id ? '' : faq.id);
                  }}
                  className="cursor-pointer rounded-2xl mb-4 px-8"
                >
                  <article>
                    <div className="flex justify-between items-center">
                      <h4
                        className={`${
                          faq.id === reading ? 'py-4' : 'py-8'
                        } text-gray text-sm md:text-base`}
                      >
                        {faq.question}
                      </h4>
                      <span className="cursor-pointer flex items-center my-auto">
                      {reading === faq.id ? (
                        <IoIosArrowUp />
                      ) : (
                        <IoIosArrowDown />
                      )}
                      </span>
                    </div>
                    {reading === faq.id && (
                      <p
                        className="text-grey font-semibold text-left my-3"
                      >
                        {faq.answer}
                      </p>
                    )}
                  </article>
                </li>
              ))}
            </ul>
          </div>
        </article>
        <article className="flex flex-col gap-4 pt-8 md:px-6 max-w-full">
          <header className="font-bold">Contact Support</header>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex flex-col md:flex-row gap-4 text-xs 
              md:text-sm md:items-center p-6 border border-gray-400 rounded">
              <span><HiOutlineMail
                size={15}
               /></span>
              <div className="flex gap-1 items-center">
                <span>Send an email to us </span>
                <a href="mailto:theceoappng@gmail.com" className="text-blue-400 underline">theceoappng@gmail.com</a>

              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-4 text-xs 
              md:text-sm md:items-center p-6 border border-gray-400 rounded">
              <span><CiPhone
                size={15}
               /></span>
              <div className="flex gap-1 items-center">
                <span>Give us a call at</span>
                <a href="tel:+2348140499993" className="text-blue-600">+234 814 049 9993</a>

              </div>
            </div>
          </div>
        </article>
      </section>
      
    </div>
  );
};

export default HelpAndFAQs;
