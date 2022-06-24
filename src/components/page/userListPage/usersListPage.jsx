import React, { useState, useEffect } from "react";
import Pagination from "../../common/pagination";
import UserTable from "../../ui/usersTable";
import SearchStatus from "../../ui/searchStatus";
import { paginate } from "../../../utils/paginate";
import GroupList from "../../common/groupList";
import _ from "lodash";
import Loader from "../../ui/loader";
import { useUsers } from "../../../hooks/useUsers";
import { useProfession } from "../../../hooks/useProfession";
import { useAuth } from "../../../hooks/useAuth";

const UserListPage = () => {
  const { users } = useUsers();
  const { currentUser } = useAuth();
  const { professions, getProfession, isLoading: loadProf } = useProfession();
  const [selectedProf, setSelectedProf] = useState();
  const [sortBy, setSortBy] = useState({ path: "name", order: "asc" });
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const pageSize = 4;
  const itemsCount = users ? Math.ceil(users.length / pageSize) : 0;

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  useEffect(() => {
    if (currentPage > 1 && currentPage >= itemsCount + 1) {
      handlePageChange((prevState) => prevState - 1);
    }
  }, [itemsCount]);

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

  if (users) {
    const searchedUsers = users.filter(
      (user) =>
        user.name && user.name.toLowerCase().includes(search.toLowerCase())
    );

    function filterUsers(data) {
      const filteredUsers = search
        ? data.filter(
            (user) =>
              user.name &&
              user.name.toLowerCase().includes(search.toLowerCase())
          )
        : selectedProf
        ? data.filter(
            (user) => getProfession(user.profession).name === selectedProf
          )
        : searchedUsers;

      return filteredUsers.filter((u) => u._id !== currentUser._id);
    }

    const filteredUsers = filterUsers(users);
    const count = filteredUsers.length;
    const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order]);
    const userCrop = paginate(sortedUsers, currentPage, pageSize);

    if (users.length > 0) {
      return (
        <>
          <div className="searchStatus mb-10">
            <h1>
              <span className="badge bg-primary">
                {SearchStatus(filterUsers(users).length)}
              </span>
            </h1>
          </div>
          <div className="d-flex mt-2">
            {professions && !loadProf && (
              <div className="d-flex flex-column flex-shrink-0 p-3">
                <GroupList
                  items={professions}
                  onItemSelect={handleProfessionSelect}
                  selectedItem={selectedProf}
                  boolInprof={professions}
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
                type="text"
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
              />
            </div>
          </div>
          <div className="d-flex justify-content-center">
            <Pagination
              itemsCount={count}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </div>
        </>
      );
    } else {
      return (
        <h1>
          <span className="badge bg-danger">{SearchStatus(users.length)}</span>
        </h1>
      );
    }
  }
  return <Loader />;
};

export default UserListPage;
