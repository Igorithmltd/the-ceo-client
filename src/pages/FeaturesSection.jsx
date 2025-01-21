import FeatureBox from "../components/FeatureBox";

const FeaturesSection = () => {
  const featureData = [
    {
      title: "Add and track sales and expenses",
      paragraphs: [
        "Easily record and monitor all your sales transactions and expenses in one place. Keep accurate records, generate detailed reports, and gain insights into your business performance.",
        "Stay on top of your finances with real-time updates and reduce the risk of errors or oversights.",
      ],
      imgSrcDesktop: "/images/landing_page/dash1.png",
      imgSrcMobile: "/images/landing_page/dashI1.png",
      reverse: false,
    },
    {
      title: "Customizable marketing graphics and receipts",
      paragraphs: [
        "Create and personalize marketing materials and receipts that reflect your brand identity. Choose from a variety of templates, add your logo, and customize the design to suit your business needs.",
        "Enhance your brand image and provide professional-looking receipts and marketing materials to your customers.",
      ],
      imgSrcDesktop: "/images/landing_page/dash6.png",
      imgSrcMobile: "/images/landing_page/dashI6.png",
      reverse: true,
    },
    {
      title: "Personalized online shop",
      paragraphs: [
        "Take your business online and reach more customers with our integrated website feature. Create a digital storefront and showcase your products and services, sharing a unique link with customers, partners, or social media followers.",
        "Expand your reach, increase sales, and manage your online presence seamlessly all within our platform.",
      ],
      imgSrcDesktop: "/images/landing_page/dash8.png",
      imgSrcMobile: "/images/landing_page/dashI8.png",
      reverse: false,
    },
    {
      title: "Manage products and services",
      paragraphs: [
        "Organize and oversee your entire inventory of products and services. Add new items, update existing ones, set prices, and categorize them for easier management.",
        "Streamline your inventory management, improve order fulfillment, and maintain optimal stock levels.",
      ],
      imgSrcDesktop: "/images/landing_page/dash2.png",
      imgSrcMobile: "/images/landing_page/dashI2.png",
      reverse: true,
    },
    {
      title: "Role-based user assignments",
      paragraphs: [
        "Assign different roles and permissions to your team members based on their responsibilities. Ensure secure access to sensitive information and delegate tasks efficiently without compromising data security.",
        "Enhance collaboration and productivity while maintaining control over access and permissions.",
      ],
      imgSrcDesktop: "/images/landing_page/dash4.png",
      imgSrcMobile: "/images/landing_page/dashI4.png",
      reverse: false,
    },
    {
      title: "Customer management",
      paragraphs: [
        "Build and maintain a comprehensive customer database. Store contact information, purchase history, and preferences.",
        "Strengthen customer loyalty and drive repeat business with targeted marketing and personalized communication.",
      ],
      imgSrcDesktop: "/images/landing_page/dash3.png",
      imgSrcMobile: "/images/landing_page/dashI3.png",
      reverse: true,
    },

    {
      title: "QR code scanning for product management",
      paragraphs: [
        "Utilize QR code scanning to quickly add or update products in your inventory. This feature simplifies the process of tracking and managing products, reducing manual entry errors and saving time.",
        "Accelerate inventory management and improve accuracy with easy-to-use QR code technology.",
      ],
      imgSrcDesktop: "/images/landing_page/dash5.png",
      imgSrcMobile: "/images/landing_page/dashI5.png",
      reverse: false,
    },

    {
      title: "Integrated wallet with bank details",
      paragraphs: [
        "Manage your business finances seamlessly with an integrated wallet that connects to your bank accounts. View account balances, track transactions, and manage transfers all within the platform.",
        "Simplify financial management with direct access to your banking information, improving transparency and control over your business funds.",
      ],
      imgSrcDesktop: "/images/landing_page/dash7.png",
      imgSrcMobile: "/images/landing_page/dashI7.png",
      reverse: true,
    },
  ];

  return (
    <div className="mt-28 lg:mt-[170px]">
      <h2 className="text-center mt-5 text-2xl lg:text-3xl font-semibold text-red mb-[60px]">
        FEATURES
      </h2>

      <div className="space-y-[50px] lg:space-y-[130px]">
        {featureData.map((feature, index) => (
          <FeatureBox
            key={index}
            title={feature.title}
            paragraphs={feature.paragraphs}
            imgSrcDesktop={feature.imgSrcDesktop}
            imgSrcMobile={feature.imgSrcMobile}
            reverse={feature.reverse}
          />
        ))}
      </div>
    </div>
  );
};

export default FeaturesSection;
