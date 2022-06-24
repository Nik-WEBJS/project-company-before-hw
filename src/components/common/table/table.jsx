import React from "react";
import PropTypes from "prop-types";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";

const Table = ({ onSort, selectedSort, columns, data, count, children }) => {
  return (
    <table className="table text-center" style={{ height: "fit-content" }}>
      {children || (
        <>
          <TableHeader {...{ onSort, selectedSort, columns, count }} />
          <TableBody {...{ columns, data, count }} />
        </>
      )}
    </table>
  );
};

Table.propTypes = {
  onSort: PropTypes.func.isRequired,
  selectedSort: PropTypes.object.isRequired,
  columns: PropTypes.object.isRequired,
  data: PropTypes.array.isRequired,
  count: PropTypes.number.isRequired,
  children: PropTypes.array
};

export default Table;
