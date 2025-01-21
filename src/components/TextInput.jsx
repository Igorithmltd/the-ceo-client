const TextInput = ({
  placeholder,
  inputType,
  string,
  onUpdate,
  error,
  name,
  icon,
  eyeIcon,
  onTogglePassword, 
  showPassword 
}) => {
  return (
    <div>
      <div
        className={`border-b border-gray-500 hover:border-slate-500  ${
          error ? "border-red-600" : ""
        } `}
      >
        <div className="flex gap-2 items-center p-3">
          {icon}
          <input
            type={showPassword ? "text" : inputType}
            autoComplete="on"
            name={name}
            className={`bg-transparent focus:outline-none focus:bg-transparent w-full ${
              error ? "border-red-500 " : ""
            }`}
            placeholder={placeholder}
            value={string || ""}
            onChange={(event) => onUpdate(event.target.value)}
          />
          {eyeIcon && <button onClick={onTogglePassword} className="hover:text-black">{eyeIcon}</button>}
        </div>
      </div>
      {error && (
        <div className="text-red-500 text-sm font-semibold">{error}</div>
      )}
    </div>
  );
};

export default TextInput;
