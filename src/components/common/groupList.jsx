import React from "react";
import PropTypes from "prop-types";

const GroupList = ({
  items,
  valueProperty,
  contentProperty,
  onItemSelect,
  selectedItem,
  boolInprof
}) => {
  return (
    <ul className="list-group">
      {!boolInprof
        ? Object.keys(items).map((item) => (
            <li
              key={items[item][valueProperty]}
              className={
                "list-group-item" +
                (items[item] === selectedItem ? " active" : "")
              }
              onClick={() => onItemSelect(items[item])}
              role="button"
            >
              {items[item][contentProperty]}
            </li>
          ))
        : items.map((item) => (
            <li
              key={item[valueProperty]}
              className={
                "list-group-item" + (item === selectedItem ? " active" : "")
              }
              onClick={() => onItemSelect(item[contentProperty])}
              role="button"
            >
              {item[contentProperty]}
            </li>
          ))}
    </ul>
  );
};

GroupList.defaultProps = {
  valueProperty: "_id",
  contentProperty: "name"
};

GroupList.propTypes = {
  items: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  valueProperty: PropTypes.string,
  contentProperty: PropTypes.string,
  onItemSelect: PropTypes.func,
  selectedItem: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  boolInprof: PropTypes.bool
};

export default GroupList;
