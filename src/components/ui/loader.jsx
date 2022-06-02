import React from "react";
import loaderImg from "../../img/loading.png";

const Loader = () => {
  return (
    <div className="loader">
      <img src={loaderImg} style={{ width: "50px" }} />
    </div>
  );
};

export default Loader;
