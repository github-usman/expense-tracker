import React from "react";
import Select, { StylesConfig } from "react-select";
import { InputProps, OptionType } from "../add-form/Interfaces";

const customStyles = (error?: string): StylesConfig<OptionType, false> => ({
  control: (provided) => ({
    ...provided,
    borderColor: error ? "#ef1b1b" : "#434040f3",
    borderRadius: "0.375rem",
    boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
    backgroundColor: "#1a1a1a",
    marginTop: "5px",
  }),
  menu: (provided) => ({
    ...provided,
    borderRadius: "0.375rem",
    marginTop: "0.25rem",
    backgroundColor: "#3a3a3a",
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected
      ? "rgb(59, 130, 246)"
      : state.isFocused
        ? "#4a4a4a"
        : "#3a3a3a",
    color: state.isSelected ? "white" : "white",
    padding: "0.5rem 1rem",
    cursor: "pointer",
    borderRadius: "0.375rem",
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "white",
  }),
});

const Input: React.FC<InputProps> = ({
  label,
  type,
  name,
  value,
  onChange,
  onBlur,
  error,
  options,
  placeholder,
}) => {
  const handleSelectChange = (selectedOption: OptionType | null) => {
    onChange({
      target: { name, value: selectedOption ? selectedOption.value : "" },
    } as React.ChangeEvent<HTMLInputElement>);
  };

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    onChange({ target: { name, value } } as React.ChangeEvent<HTMLInputElement>);
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium">{label}</label>
      {type === "select" && options ? (
        <Select
          name={name}
          options={options}
          value={options.find((option) => option.value === value) || null}
          onChange={handleSelectChange}
          onBlur={onBlur}
          styles={customStyles(error)}
          placeholder={placeholder}
        />
      ) : type !== "textarea" ? (
        <input
          type={type}
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={handleChange}
          onBlur={onBlur}
          className={`mt-[5px] py-2 px-3 block w-full text-white rounded-md bg-bg border-[0.5px] border-solid  shadow-sm hover:border-dblue sm:text-sm focus:outline-none  ${error ? "border-red-500" : "border-[#434040f3]"}`}
        />
      ) : (
        <textarea
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={handleChange}
          className={`mt-[5px] py-2 px-3 block w-full text-white rounded-md bg-bg border-[0.5px] border-solid  shadow-sm hover:border-dblue sm:text-sm focus:outline-none  ${error ? "border-red-500" : "border-[#434040f3]"}`}
        />
      )}
      {error && <p className="text-red-500 text-xs mt-[1px]">{error}</p>}
    </div>
  );
};

export default Input;
