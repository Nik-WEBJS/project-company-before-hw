import React from "react";
import PropTypes from "prop-types";
import badgesClassName from "../../../utils/badgeClassName";

const Qualitie = ({ color, name }) => {
  return (
    <>
      <span className={badgesClassName(color)}> {name} </span>
    </>
  );
};

Qualitie.propTypes = {
  color: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
};

export default Qualitie;
