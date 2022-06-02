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

  const defaultValueFormat = (value) => {
    const format = [];
    for (const val of value) {
      format.push({
        value: val.id,
        label: val.name
      });
    }
    return format;
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
        defaultValue={defaultValueFormat(defaultValue)}
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
  defaultValue: PropTypes.array,
  error: PropTypes.string
};

export default MultiSelectField;
