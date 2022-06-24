import React from "react";
import Select from "react-select";
import PropTypes from "prop-types";

const MultiSelectField = ({ options, onChange, name, label, defaultValue }) => {
  const optionsArray =
    !Array.isArray(options) && typeof options === "object"
      ? Object.values(options)
      : options;

  const handleChange = (value) => {
    onChange({ name: name, value });
  };

  const optionDefaultValue = () => {
    const values = [];
    for (let i = 0; i < optionsArray.length; i++) {
      for (let j = 0; j < defaultValue.length; j++) {
        if (optionsArray[i].value === defaultValue[j]) {
          values.push(optionsArray[i]);
        }
      }
    }
    return values;
  };

  return (
    <div className="mb-4">
      <label>{label}</label>
      <Select
        isMulti
        className="basic-multi-select"
        classNamePrefix="select"
        onChange={handleChange}
        options={optionsArray}
        defaultValue={optionDefaultValue()}
        name={name}
        closeMenuOnSelect={false}
      />
    </div>
  );
};

MultiSelectField.propTypes = {
  options: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  onChange: PropTypes.func,
  name: PropTypes.string,
  label: PropTypes.string,
  defaultValue: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  error: PropTypes.string
};

export default MultiSelectField;
