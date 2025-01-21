import PlanCard from "./PlanCard";

const PlansSection = () => {
  const plans = [
    {
      title: "SMALL BIZ PLAN",
      bgColor: "bg-[#F7C9CC33]",
      color: "red",
      features: [
        { name: "Full dashboard access", isAvailable: true },
        { name: "55 design categories", isAvailable: false },
        { name: "35 downloads per month", isAvailable: true },
        { name: "Access to all sale receipt templates", isAvailable: false },
        { name: "Live website feature for your business", isAvailable: true },
        { name: "Access to all design templates", isAvailable: false },
        { name: "Access to more features and every upcoming feature", isAvailable: true },
      ],
      price: "₦5,000/month",
      imgSrc: "/images/landing_page/Vector (8).png",
      buttonText: "Get Started",
    },
    {
      title: "COMPANY BIZ PLAN",
      bgColor: "bg-[#C1C8D940]",
      color: "blue-50",
      features: [
        { name: "Full dashboard access", isAvailable: true },
        { name: "55 design categories", isAvailable: true },
        { name: "Unlimited downloads", isAvailable: true },
        { name: "Access to all sale receipt templates", isAvailable: true },
        { name: "Live website feature for your business", isAvailable: true },
        { name: "Access to all design templates", isAvailable: true },
        { name: "Access to more features and every upcoming feature", isAvailable: true },
      ],
      price: "₦10,000/month",
      imgSrc: "/images/landing_page/ion_business.png",
      buttonText: "Get Started",
    },
  ];

  return (
    <div className="flex gap-10 flex-col mt-[50px] lg:mt-[100px] items-center">
      <h2 className="text-center text-2xl lg:text-3xl font-semibold text-red">PRICING</h2>
      <div className="flex gap-10 flex-col md:flex-row mt-[50px] w-full lg:justify-between">
        {plans.map((plan, index) => (
          <PlanCard key={index} {...plan} />
        ))}
      </div>
    </div>
  );
};

export default PlansSection;
