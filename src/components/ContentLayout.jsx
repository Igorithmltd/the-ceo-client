import React from "react";

const TableOfContents = () => {
  return (
    <nav className="sticky top-4">
      <h2 className="text-xl font-bold mb-4">Table of Contents</h2>
      <ul className="space-y-2 font-semibold text-[14px] lg:text-[16px] leading-[25px]">
        <li>
          <a href="#section1" className="text-red hover:underline">
            1. Introduction
          </a>
        </li>
        <li>
          <a href="#section2" className="text-red hover:underline">
            2. Financial Content
          </a>
        </li>
        <li>
          <a href="#section3" className="text-red hover:underline">
            3. Professional Advice
          </a>
        </li>
        <li>
          <a href="#section4" className="text-red hover:underline">
            4. Third-Party Links
          </a>
        </li>
        <li>
          <a href="#section5" className="text-red hover:underline">
            5. Warranties and Guarantees
          </a>
        </li>
        <li>
          <a href="#section6" className="text-red hover:underline">
            6. Limitation of Liability
          </a>
        </li>
        <li>
          <a href="#section7" className="text-red hover:underline">
            7. Changes to the Disclaimer
          </a>
        </li>
        <li>
          <a href="#section8" className="text-red hover:underline">
            8. Contact Us
          </a>
        </li>
      </ul>
    </nav>
  );
};

const Section = ({ id, title, content }) => {
  return (
    <section id={id} className="pt-6">
      <h2 className="font-bold text-[17px] text-grey-20 mb-4">{title}</h2>
      <p className="text-[14px] lg:text-[16px] leading-relaxed text-grey-80">{content}</p>
    </section>
  );
};

const Articles = () => {
  const sections = [
    {
      id: "section1",
      title: "1. Introduction",
      content:
        "Welcome to TheCEOApp. The information provided on our platform is for general informational purposes only. By using our services, you acknowledge that you have read and understood this disclaimer.",
    },
    {
      id: "section2",
      title: "2. Financial Content",
      content:
        "The content on the TheCEOApp platform is designed to support financial development and is intended for informational purposes only. While we strive to provide accurate and up-to-date information, we make no representations or warranties regarding the completeness, accuracy, reliability, suitability, or availability of any content on our platform.",
    },
    {
      id: "section3",
      title: "3. Professional Advice",
      content:
        "The content provided on the TheCEOApp platform is not intended to be a substitute for professional advice, whether medical, legal, financial, or otherwise. Always seek the advice of a qualified professional with any questions you may have regarding a specific issue. Reliance on any information provided by TheCEOApp is solely at your own risk.",
    },
    {
      id: "section4",
      title: "4. Third-Party Links",
      content:
        "Our platform may contain links to third-party websites or services that are not owned or controlled by TheCEOApp. We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third-party sites or services. The inclusion of any links does not necessarily imply a recommendation or endorsement of the views expressed within them.",
    },
    {
      id: "section5",
      title: "5. Warranties and Guarantees",
      content:
        "TheCEOApp makes no warranties or guarantees of any kind, express or implied, regarding the operation of the platform or the information, content, materials, or products included on the platform. To the fullest extent permissible by applicable law, TheCEOApp disclaims all warranties, express or implied, including but not limited to implied warranties of merchantability and fitness for a particular purpose.",
    },
    {
      id: "section6",
      title: "6. Limitation of Liability",
      content:
        "In no event shall TheCEOApp, its directors, employees, or affiliates be liable for any indirect, incidental, special, or consequential damages arising out of or in connection with your use of the platform. This includes, but is not limited to, any loss of use, data, or profits, whether or not TheCEOApp has been advised of the possibility of such damages.",
    },
    {
      id: "section7",
      title: "7. Changes to the Disclaimer",
      content:
        "We reserve the right to update or modify this disclaimer at any time without prior notice. Any changes will be posted on this page, and your continued use of the platform after such changes have been posted constitutes your acceptance of the new disclaimer.",
    },
    {
      id: "section8",
      title: "8. Contact Us",
      content:
        "If you have any questions or concerns about this disclaimer, please contact us at: Email: support@TheCEOApp.com Address: TheCEOApp, 123 Education Lane, City, State, ZIP Code",
    },
  ];

  return (
    <div className="space-y-8">
      {sections.map((section) => (
        <Section key={section.id} id={section.id} title={section.title} content={section.content} />
      ))}
    </div>
  );
};

const ContentLayout = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col gap-16">
        {/* Table of Contents */}
        <aside className="col-span-1 md:col-span-1 text-sm lg:text-xs">
          <TableOfContents />
        </aside>

        {/* Articles */}
        <main className="col-span-1 md:col-span-3">
          <Articles />
        </main>
      </div>
    </div>
  );
};

export default ContentLayout;
