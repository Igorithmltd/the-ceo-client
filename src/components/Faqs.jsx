import React, { useState } from "react";
import { FiMinus } from "react-icons/fi";
import { IoMdArrowDropdown } from "react-icons/io";

const Faqs = () => {
  const [reading, setReading] = useState(null);

  const faqs = [
    {
      id: "1",
      question: "How do I add a new product to my inventory?",
      ans: "Log into your dashboard, click on add new product, fill in the form and submit.",
    },
    {
      id: "2",
      question: "Can I track my sales and expenses in real time?",
      ans: "Yes, you can track your sales and expenses in real time using the analytics feature.",
    },
    {
      id: "3",
      question: "Is it possible to integrate my online store with CEOApp?",
      ans: "Absolutely, CEOApp supports integration with popular online stores.",
    },
    {
      id: "4",
      question: "What payment methods are accepted?",
      ans: "CEOApp accepts credit cards, bank transfers, and mobile payments.",
    },
    {
      id: "5",
      question: "How do I create a new design for my website?",
      ans: "Use the website design tool under the customization section in your dashboard.",
    },
    {
      id: "6",
      question: "How can I add custom code to my website?",
      ans: "Navigate to the code editor in your dashboard and insert your custom code.",
    },
  ];

  const toggleReading = (id) => {
    setReading((prev) => (prev === id ? null : id));
  };

  return (
    <section
      className="mt-24 pt-20 bg-grey-30 px-4 py-4 pb-28 md:px-20 max-w-full overflow-hidden"
      id="faq"
    >
      <h2 className="text-red text-2xl lg:text-3xl font-semibold text-center mb-14">
        FREQUENTLY ASKED QUESTIONS
      </h2>

      <div className="container mx-auto">
        <div className="relative overflow-hidden">
          <ul className="max-w-full overflow-hidden">
            {faqs.map((faq) => (
              <li
                key={faq.id}
                onClick={() => toggleReading(faq.id)}
                className="cursor-pointer border bg-white rounded-2xl mb-4 px-8"
              >
                <article>
                  <div className="flex justify-between items-center">
                    <h4
                      className={`${
                        faq.id === reading ? "text-red py-4" : "py-8"
                      } font-semibold text-gray text-[14px] md:text-[17px]`}
                    >
                      {faq.question}
                    </h4>
                    {reading === faq.id ? (
                      <FiMinus className="cursor-pointer text-3xl md:text-5xl" />
                    ) : (
                      <IoMdArrowDropdown className="cursor-pointer text-3xl md:text-5xl" />
                    )}
                  </div>
                  <div
                    className={`transition-all duration-500 ease-in-out overflow-hidden ${
                      reading === faq.id ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <p className="text-grey text-[12px] md:text-[15px] font-semibold text-left my-3">
                      {faq.ans}
                    </p>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Faqs;
