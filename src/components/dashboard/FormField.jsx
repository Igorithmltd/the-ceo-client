const FormField = ({
  label,
  value,
  onChange,
  type = "text",
  required = false,
  inputClassName = "",
  containerClassName = "",
}) => {
  return (
    <div
      className={`flex justify-between gap-5 items-end px-1 md:px-12 md:py-3  text-[14px] ${containerClassName}`}
    >
      <label className="flex-1  font-light">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        value={value}
        onChange={onChange}
        className={`flex-1 py-1 border-b-gray-400 border-b outline-none font-bold text-black ${inputClassName}`}
        type={type}
      />
    </div>
  );
};

export default FormField;
