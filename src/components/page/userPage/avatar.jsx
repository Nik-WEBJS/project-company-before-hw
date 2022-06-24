import React from "react";
import PropTypes from "prop-types";

const Avatar = ({ size, src }) => {
  return (
    <img
      src={src}
      className="rounded-circle shadow-1-strong me-3"
      alt="avatar"
      height={size}
      width={size}
    />
  );
};

Avatar.defaultProps = {
  src: `https://avatars.dicebear.com/api/avataaars/${(Math.random() + 1)
    .toString(36)
    .substring(7)}.svg`
};

Avatar.propTypes = {
  size: PropTypes.string,
  src: PropTypes.string
};

export default Avatar;
