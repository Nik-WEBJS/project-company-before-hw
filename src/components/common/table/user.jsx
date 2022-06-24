import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const User = (props) => {
  const { _id, name } = props;

  return (
    <>
      <Link to={`/users/${_id}`} style={{ textAlign: "center" }}>
        {name}
      </Link>
    </>
  );
};

User.propTypes = {
  _id: PropTypes.string,
  name: PropTypes.string
};

export default User;
