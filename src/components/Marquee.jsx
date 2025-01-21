const Marquee = () => {
  return (
    <div className="absolute w-full left-0 right-0 lg:mt-20">
      <div className="relative flex marquee my-8 overflow-x-hidden bg-[#05194D;] transform -skew-y-6 gap-6 text-[#8390B3]">
        <div className="py-3 animate-marquee whitespace-nowrap flex justify-between w-[100%]">
          <span className="mx-4 text-lg flex justify-between items-center gap-2">
            <img src="/images/landing_page/icon.png" alt="" />
            Retail
          </span>
          <span className="mx-4 text-lg flex justify-between items-center gap-2">
            <img src="/images/landing_page/icon.png" alt="" />
            E-commerce
          </span>
          <span className="mx-4 text-lg flex justify-between items-center gap-2">
            <img src="/images/landing_page/icon.png" alt="" />
            Services
          </span>
          <span className="mx-4 text-lg flex justify-between items-center gap-2">
            <img src="/images/landing_page/icon.png" alt="" />
            Freelancers
          </span>
          <span className="mx-4 text-lg flex justify-between items-center gap-2">
            <img src="/images/landing_page/icon.png" alt="" />
            Startups
          </span>
          <span className="mx-4 text-lg flex justify-between items-center gap-2">
            <img src="/images/landing_page/icon.png" alt="" />
            Business owners
          </span>
        </div>

        <div className=" absolute top-0 py-3 animate-marquee2 whitespace-nowrap flex justify-between w-[100%]">
          <span className="mx-4 text-lg flex justify-between items-center gap-2">
            <img src="/images/landing_page/icon.png" alt="" />
            Retail
          </span>
          <span className="mx-4 text-lg flex justify-between items-center gap-2">
            <img src="/images/landing_page/icon.png" alt="" />
            E-commerce
          </span>
          <span className="mx-4 text-lg flex justify-between items-center gap-2">
            <img src="/images/landing_page/icon.png" alt="" />
            Services
          </span>
          <span className="mx-4 text-lg flex justify-between items-center gap-2">
            <img src="/images/landing_page/icon.png" alt="" />
            Freelancers
          </span>
          <span className="mx-4 text-lg flex justify-between items-center gap-2">
            <img src="/images/landing_page/icon.png" alt="" />
            Startups
          </span>
          <span className="mx-4 text-lg flex justify-between items-center gap-2">
            <img src="/images/landing_page/icon.png" alt="" />
            Business owners
          </span>
        </div>
      </div>
    </div>
  );
};

export default Marquee;
