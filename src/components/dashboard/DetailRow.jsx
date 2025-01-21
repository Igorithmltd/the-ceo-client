const DetailRow = ({ label, value }) => {
  return (
    <div className="flex justify-between gap-5 items-center text-[14px] px-1 md:px-12 md:py-3">
      <span className="">{label}</span>
      <span className=" text-black">{value}</span>
    </div>
  );
};

export default DetailRow;
