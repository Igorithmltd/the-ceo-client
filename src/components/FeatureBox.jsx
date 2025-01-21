const FeatureBox = ({ title, paragraphs, imgSrcDesktop, imgSrcMobile, reverse = false }) => {
  return (
    <div
      className={`flex gap-y-10 gap-x-20 flex-col ${
        reverse ? "lg:flex-row-reverse" : "lg:flex-row"
      }`}
    >
      <div className="flex-[1.6] pt-4">
        <h3 className="bg-blue-gradient bg-clip-text text-transparent text-2xl font-bold">
          {title}
        </h3>
        <div className="flex flex-col gap-8 mt-10 lg:pe-[100px] text-grey-80 text-[14px] lg:text-[16px] leading-[27px]">
          {paragraphs.map((text, index) => (
            <p key={index}>{text}</p>
          ))}
        </div>
      </div>
      <div className="flex-[2] p-2">
        <img src={imgSrcDesktop} alt={title} className="w-full hidden md:block" />
        <img src={imgSrcMobile} alt={title} className="block md:hidden w-full" />
      </div>
    </div>
  );
};

export default FeatureBox;
