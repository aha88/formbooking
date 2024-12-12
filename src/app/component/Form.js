import React from "react";
import Select from "react-select";

const customSingleValue = ({ data }) => (
    <div style={{ display: "flex", alignItems: "center"}}>
      <img
        src={data.image.fileurl}
        alt={data.label}
      />
      {data.label}
    </div>
  );
  
const Form = ({ label, name, type, placeholder, options, classname, onChange,required }) => {
    return (
    <div className="mb-3">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      {type === "select" ? (
        <Select
            required
            name={name}
            placeholder={placeholder}
            options={options}
            className={classname}
            onChange={(selectedOption) =>
            onChange({ target: { name, value: selectedOption?.label, id: selectedOption.id } })
        }
        components={{
        SingleValue: customSingleValue,
        }}
        isClearable
        />
        ) :  
        type === "date" ? (
        <input
            required
            className={classname}
            type={type}
            name={name}
            placeholder={placeholder}
            onChange={onChange}
            />
        ) : (
        <input
            required
          className={classname}
          type={type}
          name={name}
          placeholder={placeholder}
          onChange={onChange}
        />
      )}
    </div>
  );
};

export default Form;
