import { Step, StepContent, StepLabel } from "@mui/material";

const StepItem = ({ item }) => {
  return (
    <Step>
      <StepLabel>
        <div className="ml-6 self-start">
          <div className="flex justify-between text-[14px] md:text-[17px] items-start">
            <h4 className="text-black font-semibold ">
              {item.title} <span className="text-[#8390B3] ml-4">({item.price})</span>
            </h4>
            <p className="text-[#999999] ">{item.date}</p>
          </div>
          <p className="text-black text-[14px] md:text-[17px] mt-6">
            Initial meeting to discuss project scope, requirements, and timelines.
          </p>
        </div>
      </StepLabel>
    </Step>
  );
};

export default StepItem;
