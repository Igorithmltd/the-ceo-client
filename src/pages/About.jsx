import React from "react";
import Hero from "../components/Hero";
import Cta from "../components/Cta";
import Marquee from "../components/Marquee";

const TeamMember = ({  name, role }) => {
  return (
    <div className="w-full sm:w-1/2 md:w-1/3 lg:w-[22%] flex mb-12 flex-col items-center justify-center text-center">
      <div className="w-[221px] h-[221px]">
        <img src="/images/photo.png" alt="" className="object-cover" />
      </div>
      <h4 className="my-4 font-bold text-[15px] text-blue-50">{name}</h4>
      <p className="text-[15px] font-semibold text-[#202020]">{role}</p>
    </div>
  );
};

const About = () => {
  const teamMembers = [
    {
      name: "John Doe",
      role: "Co-founder & Chief Executive Officer (CEO)",
    },
    {
      name: "Jane Smith",
      role: "Chief Operating Officer (COO)",
    },
    {
      name: "Michael Brown",
      role: "Chief Technology Officer (CTO)",
    },
    {
      name: "Emily Davis",
      role: "Chief Marketing Officer (CMO)",
    },
    {
      name: "David Wilson",
      role: "Chief Financial Officer (CFO)",
    },
    {
      name: "Sophia Johnson",
      role: "Chief Product Officer (CPO)",
    },
    {
      name: "Daniel Martinez",
      role: "Head of Human Resources",
    },
  ];

  return (
    <main className="py-12">
      <div className="container mx-auto">
        <Hero
          heading={
            <>
              <span className="text-red">About us</span>
            </>
          }
          paragraph="Designed for entrepreneurs and small businesses alike, TheCEOApp simplifies accounting and streamlines your business operations with intuitive tools and robust features."
        />
        <Marquee />

        <div className=" mt-28 lg:mt-56 px-5 flex flex-col items-center">
          <div className="md:w-[90%] w-[96%]">
            <h2 className="text-center text-2xl lg:text-3xl font-semibold text-red">OUR MISSION</h2>
            <div className="flex gap-10 flex-col lg:flex-row mt-[30px] lg:mt-[50px]">
              <div className="flex-[1.6] flex flex-col gap-8 text-center font-normal text-[14px] lg:text-[16px] text-grey-80 leading-[27px]">
                <p>
                  Our mission is to empower businesses with powerful yet user-friendly tools that
                  enhance productivity and growth. Whether you're just starting out or looking to
                  scale, TheCEOApp adapts to your business needs, providing insights and tools to
                  drive success.
                </p>
                <p>
                  At TheCEOApp, we empower you to take control of your business financials with
                  ease. Whether you're tracking sales, managing expenses, or setting targets, our
                  platform offers everything you need in one convenient place. From sending invoices
                  to receiving payments, every aspect of financial management becomes seamless.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="px-5 flex flex-col items-center mt-20">
          <div className="md:w-[90%] w-[96%]">
            <h2 className="text-center text-2xl lg:text-3xl font-semibold text-red">OUR TEAM</h2>
            <div className="flex flex-col lg:flex-row gap-8 mt-[40px] lg:mt-[100px]">
              <div className="flex flex-wrap gap-8 items-center justify-center">
                {teamMembers.map((member, index) => (
                  <TeamMember key={index} name={member.name} role={member.role} />
                ))}
              </div>
            </div>
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
    </main>
  );
};

export default About;
