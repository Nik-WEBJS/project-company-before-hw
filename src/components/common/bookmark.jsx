import React from "react";
import PropTypes from "prop-types";

const Bookmark = ({ status, onChangeIcon }) => {
  if (!status) {
    return (
      <div className="bookmark" onClick={onChangeIcon}>
        <i className="bi bi-bookmark"></i>
      </div>
    );
  } else {
    return (
      <div className="bookmark" onClick={onChangeIcon}>
        <i className="bi bi-bookmark-heart"></i>
      </div>
    );
  }
};

Bookmark.propTypes = {
  status: PropTypes.bool.isRequired,
  onChangeIcon: PropTypes.func.isRequired
};

export default Bookmark;
