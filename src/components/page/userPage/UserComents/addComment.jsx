import React, { useState } from "react";
// import SelectField from "../../../common/form/selectField";
import PropTypes from "prop-types";
import { validator } from "../../../../utils/validator";
import TextAreaField from "../../../common/form/textAreaField";

const AddComment = ({ onSubmit }) => {
  const [data, setData] = useState({});
  const [errors, setErrors] = useState({});

  const clearForm = () => {
    setData({});
    setErrors({});
  };

  const hadleChange = (target) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    onSubmit(data);
    clearForm();
  };

  const validatorConfig = {
    content: {
      isRequired: { message: "Сообщение не может быть пустым" }
    }
  };

  const validate = () => {
    const errors = validator(data, validatorConfig);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextAreaField
        className="form-control"
        value={data.content || ""}
        onChange={hadleChange}
        name="content"
        label="Cообщение"
        error={errors.content}
      />
      <div className=" mt-3 d-flex justify-content-end">
        <button className="btn btn-primary">Опубликовать</button>
      </div>
    </form>
  );
};

AddComment.propTypes = {
  onSubmit: PropTypes.func
};
export default AddComment;
