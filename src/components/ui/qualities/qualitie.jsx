import React from "react";
import PropTypes from "prop-types";
import badgesClassName from "../../../utils/badgeClassName";
import { useQuality } from "../../../hooks/useQuality";
import Loader from "../loader";

const Qualitie = ({ id }) => {
  const { isLoading, getQuality } = useQuality();
  const qual = getQuality(id);
  if (!isLoading) {
    return <span className={badgesClassName(qual.color)}>{qual.name}</span>;
  }
  return <Loader />;
};

Qualitie.propTypes = {
  id: PropTypes.string
};

export default Qualitie;
