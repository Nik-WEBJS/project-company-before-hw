import React, { useState } from "react";
import PropTypes from "prop-types";

const TableHeader = ({ onSort, selectedSort, columns, count }) => {
  const [toggle, setToggle] = useState(0);

  const handleSort = (item, e) => {
    const handlePrintArrow = (e, item) => {
      const self = e.currentTarget;
      const rowUp = self.children[0];
      const rowDown = self.children[1];

      if (item !== "qualities" && count > 1) {
        if (toggle === 0) {
          rowUp.style.display = "inline-block";
          rowDown.style.display = "none";
          setToggle(1);
        } else {
          rowDown.style.display = "inline-block";
          rowUp.style.display = "none";
          setToggle(0);
        }
      }
    };

    if (selectedSort.path === item) {
      onSort({
        ...selectedSort,
        order: selectedSort.order === "asc" ? "desc" : "asc"
      });
    } else {
      onSort({ path: item, order: "asc" });
    }
    handlePrintArrow(e, item);
  };

  const handleRemoveArrow = (e, item) => {
    if (item !== "qualities") {
      const self = e.currentTarget;
      self.children[0].style.display = "none";
      self.children[1].style.display = "none";
    }
  };

  return (
    <thead>
      <tr>
        {Object.keys(columns).map((column) => (
          <th
            key={column}
            onClick={
              columns[column].path
                ? (e) => handleSort(columns[column].path, e)
                : undefined
            }
            {...{ role: columns[column].path ? "button" : "" }}
            scope="col"
            className={columns[column].name === "Качества" ? "qualities" : ""}
            onMouseLeave={(e) => handleRemoveArrow(e, column)}
            style={
              columns[column].name === "Качества"
                ? { width: "30%" }
                : { width: "16%" }
            }
          >
            {columns[column].name}
            <i className="bi bi-caret-up-fill"></i>
            <i className="bi bi-caret-down-fill"></i>
          </th>
        ))}
      </tr>
    </thead>
  );
};

TableHeader.propTypes = {
  onSort: PropTypes.func.isRequired,
  selectedSort: PropTypes.object.isRequired,
  columns: PropTypes.object.isRequired,
  count: PropTypes.number.isRequired
};

export default TableHeader;
