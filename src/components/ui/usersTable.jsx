import React from "react";
import PropTypes from "prop-types";
import Bookmark from "../common/bookmark";
import QualitiesList from "./qualities/qualitiesList";
import Table from "../common/table";
import User from "../common/table/user";
import Profession from "./profession";

const UserTable = ({ users, onSort, selectedSort, count }) => {
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
    professions: {
      name: "Профессия",
      component: (user) => <Profession id={user.profession} />
    },
    completedMeetings: { path: "completedMeetings", name: "Встретился, раз" },
    rate: { path: "rate", name: "Оценка" },
    bookmark: {
      path: "bookmark",
      name: "Избранное",
      component: () => <Bookmark />
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
  count: PropTypes.number.isRequired
};

export default UserTable;
