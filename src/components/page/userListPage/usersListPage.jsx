import React, { useState, useEffect } from "react";
import Pagination from "../../common/pagination";
import UserTable from "../../ui/usersTable";
import SearchStatus from "../../ui/searchStatus";
import api from "../../../api";
import { paginate } from "../../../utils/paginate";
import GroupList from "../../common/groupList";
import _ from "lodash";
import Loader from "../../ui/loader";

const UserListPage = () => {
  const [professions, setProfessions] = useState();
  const [selectedProf, setSelectedProf] = useState();
  const [sortBy, setSortBy] = useState({ path: "name", order: "asc" });
  const [allUsers, setUsers] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const pageSize = 4;
  const itemsCount = allUsers ? Math.ceil(allUsers.length / pageSize) : 0;
  const itemsIsArray = Array.isArray(professions);

  useEffect(() => {
    api.users.fetchAll().then((data) => setUsers(data));
    api.professions.fetchAll().then((data) => setProfessions(data));
  }, []);

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  useEffect(() => {
    if (currentPage > 1 && currentPage >= itemsCount + 1) {
      handlePageChange((prevState) => prevState - 1);
    }
  }, [itemsCount]);

  const handleDelete = (userId) => {
    setUsers((prevState) => prevState.filter((user) => user._id !== userId));
  };

  const handleToggleBookmark = (id) => {
    const currentUser = allUsers.find((user) => user._id === id);
    if (!currentUser.bookmark) {
      currentUser.bookmark = true;
      const newUsers = [...allUsers];
      setUsers(newUsers);
    } else {
      currentUser.bookmark = false;
      const newUsers = [...allUsers];
      setUsers(newUsers);
    }
  };

  const clearFilter = () => {
    setSelectedProf();
  };

  const handleProfessionSelect = (item) => {
    setSelectedProf(item);
    handlePageChange(1);
    setSearch("");
  };

  const handleSort = (item) => {
    setSortBy(item);
  };

  const searchUser = ({ target }) => {
    setSearch(target.value);
    clearFilter();
  };

  if (allUsers) {
    const searchedUsers = allUsers.filter((user) =>
      user.name.toLowerCase().includes(search.toLowerCase())
    );

    const filteredUsers = search
      ? allUsers.filter((user) =>
          user.name.toLowerCase().includes(search.toLowerCase())
        )
      : selectedProf
      ? allUsers.filter((user) =>
          !itemsIsArray
            ? user.profession.name === selectedProf.name
            : user.profession === selectedProf.name
        )
      : searchedUsers;

    const count = filteredUsers.length;
    const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order]);
    const userCrop = paginate(sortedUsers, currentPage, pageSize);

    if (allUsers.length > 0) {
      return (
        <>
          <div className="searchStatus mb-10">
            <h1>
              <span className="badge bg-primary">
                {SearchStatus(searchedUsers.length)}
              </span>
            </h1>
          </div>
          <div className="d-flex mt-2">
            {professions && (
              <div className="d-flex flex-column flex-shrink-0 p-3">
                <GroupList
                  items={professions}
                  onItemSelect={handleProfessionSelect}
                  selectedItem={selectedProf}
                  boolInprof={itemsIsArray}
                />
                <button
                  className="btn btn-secondary me-3"
                  style={{ width: "100%" }}
                  onClick={clearFilter}
                >
                  сброс
                </button>
              </div>
            )}
            <div className="w-100 mt-3">
              <input
                type="email"
                className="form-control"
                value={search}
                placeholder="Search users"
                onChange={searchUser}
              />
              <UserTable
                users={userCrop}
                count={count}
                selectedSort={sortBy}
                onSort={handleSort}
                onDelete={handleDelete}
                toggleBookmark={handleToggleBookmark}
              />
            </div>
          </div>
          <div className="d-flex justify-content-center">
            <Pagination
              itemsCount={count}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={handlePageChange}
              allUsers={allUsers}
            />
          </div>
        </>
      );
    } else {
      return (
        <h1>
          <span className="badge bg-danger">
            {SearchStatus(allUsers.length)}
          </span>
        </h1>
      );
    }
  }
  return <Loader />;
};

export default UserListPage;
