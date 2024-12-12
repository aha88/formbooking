import React from "react";
import Select from "react-select";
import Image from 'next/image'

const customSingleValue = ({ data }) => (
    <div style={{ display: "flex", alignItems: "center"}}>
      <Image
        style={{marginRight: 10}}
        src={data.image.fileurl}
        alt={data.label}
        width={80}
        height={100}
        unoptimized 
      />
       <span> {data.label}</span>
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
