import React, { useState, useEffect } from "react";
import TextField from "../common/form/textField";
import { validator } from "../../utils/validator";
import { useParams, useHistory } from "react-router-dom";
import api from "../../api";
import Loader from "../ui/loader";
import MultiSelectField from "../common/form/miltiSelectField";
import RadioField from "../common/form/radioField";
import SelectField from "../common/form/selectField";

const EditUser = () => {
  const [data, setData] = useState({ qualities: [] });
  const params = useParams();
  const history = useHistory();
  const { id } = params;
  const [errors, setErrors] = useState({});
  const [profession, setProfession] = useState();
  const [qualities, setQualities] = useState([]);

  useEffect(() => {
    api.users.getById(id).then((data) => setData(data));
    api.professions.fetchAll().then((data) => {
      const professionsList = Object.keys(data).map((professionName) => ({
        label: data[professionName].name,
        value: data[professionName]._id
      }));
      setProfession(professionsList);
    });

    api.qualities.fetchAll().then((data) => {
      const qualitiesList = Object.keys(data).map((optionName) => ({
        label: data[optionName].name,
        value: data[optionName]._id,
        color: data[optionName].color
      }));
      setQualities(qualitiesList);
    });
  }, []);

  const getProfessionById = (id) => {
    for (const prof of profession) {
      if (prof.value === id) {
        return { _id: prof.value, name: prof.label };
      }
    }
  };

  const getQualities = (elements) => {
    const qualitiesArray = [];
    for (const elem of elements) {
      for (const quality in qualities) {
        if (elem.value === qualities[quality].value) {
          qualitiesArray.push({
            _id: qualities[quality].value,
            name: qualities[quality].label,
            color: qualities[quality].color
          });
        }
      }
    }
    return qualitiesArray;
  };

  const validatorConfig = {
    name: {
      isRequired: { message: "Поле обязательно для заполнения" }
    },
    email: {
      isRequired: { message: "Электронная почта обязательна для заполнения" },
      isEmail: { message: "Email введен не коректно" }
    },
    password: {
      isRequired: { message: "Пароль обязателен для заполнения" },
      isCapitalSymbol: {
        message: "Пароль должен содержать минимум одну заглавную букву"
      },
      isContentsDigit: {
        message: "Пароль должен содержать минимум одну цифру"
      },
      min: {
        message: "Пароль должен состоять минимум из 8 символов",
        value: 8
      },
      profession: {
        isRequired: { message: "Поле обязательно для заполнения" }
      }
    }
  };

  const handleChange = (target) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }));
  };

  const validate = () => {
    const errors = validator(data, validatorConfig);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const isValid = Object.keys(errors).length === 0;

  const handleUpdate = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    if (typeof data.profession !== "object") {
      data.profession = getProfessionById(data.profession);
    }
    data.qualities = getQualities(data.qualities);

    history.push(`/users/${id}`);
    api.users.update(id, data);
  };

  useEffect(() => {
    validate();
  }, [data]);

  if (profession) {
    return (
      <div className="container mt-5">
        <div className="row">
          <div className=".col-md-6 .offset-md-3 shadow p-4">
            <form onSubmit={handleUpdate}>
              <TextField
                label="Имя"
                name="name"
                value={data.name}
                onChange={handleChange}
                error={errors.name}
              />
              <TextField
                label="Электронная почта"
                name="email"
                value={data.email}
                onChange={handleChange}
                error={errors.email}
              />
              <SelectField
                label="Выберите вашу профессию"
                onChange={handleChange}
                options={profession}
                name="profession"
                defaultOption={data.profession.name}
                error={errors.profession}
                value={data.profession.name}
              />
              <RadioField
                onChange={handleChange}
                options={[
                  { name: "Male", value: "male" },
                  { name: "Female", value: "female" },
                  { name: "Other", value: "other" }
                ]}
                value={data.sex}
                name="sex"
                label="Выберите ваш пол"
              />
              <MultiSelectField
                options={qualities}
                onChange={handleChange}
                name="qualities"
                label="Выберите ваши качества"
                defaultValue={data.qualities}
                error={errors.qualities}
              />

              <button disabled={!isValid} className="btn btn-primary">
                Обновить
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  } else return <Loader />;
};

export default EditUser;
