import React from "react";
import PropTypes from "prop-types";
import Bookmark from "../common/bookmark";
import QualitiesList from "./qualities/qualitiesList";
import Table from "../common/table";
import User from "../common/table/user";

const UserTable = ({
  users,
  onSort,
  selectedSort,
  toggleBookmark,
  onDelete,
  count
}) => {
  const columns = {
    name: {
      path: "name",
      name: "Имя",
      component: (user) => <User {...user} />
    },
    qualities: {
      name: "Качества",
      component: (user) => <QualitiesList qualities={user.qualities} />
    },
    professions: { path: "profession.name", name: "Профессия" },
    completedMeetings: { path: "completedMeetings", name: "Встретился, раз" },
    rate: { path: "rate", name: "Оценка" },
    bookmark: {
      path: "bookmark",
      name: "Избранное",
      component: (user) => (
        <Bookmark
          status={user.bookmark}
          onChangeIcon={() => toggleBookmark(user._id)}
        />
      )
    },
    delete: {
      component: (user) => (
        <button className="btn btn-danger" onClick={() => onDelete(user._id)}>
          Delete
        </button>
      )
    }
  };

  return (
    <Table
      onSort={onSort}
      selectedSort={selectedSort}
      count={count}
      columns={columns}
      data={users}
    />
  );
};

UserTable.propTypes = {
  users: PropTypes.array.isRequired,
  onSort: PropTypes.func.isRequired,
  selectedSort: PropTypes.object.isRequired,
  toggleBookmark: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  count: PropTypes.number.isRequired
};

export default UserTable;
