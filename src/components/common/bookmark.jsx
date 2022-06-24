import React, { useState } from "react";

const Bookmark = () => {
  const [status, setStatus] = useState(false);
  return (
    <div className="bookmark" onClick={() => setStatus(!status)}>
      <i className={`bi bi-bookmark` + (status ? "-heart" : "")}></i>
    </div>
  );
};
export default Bookmark;
