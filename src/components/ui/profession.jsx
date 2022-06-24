import React from "react";
import PropTypes from "prop-types";
import { useProfession } from "../../hooks/useProfession";
import Loader from "./loader";

const Profession = ({ id }) => {
  const { isLoading, getProfession } = useProfession();
  const prof = getProfession(id);
  if (!isLoading) return <p>{prof.name}</p>;
  return <Loader />;
};

Profession.propTypes = {
  id: PropTypes.string
};

export default Profession;
