import React from "react";
import { useParams } from "react-router-dom";
import UserPage from "../components/page/userPage/userPage";
import UsersList from "../components/page/userListPage/usersListPage";
import EditUser from "../components/page/editUser";

const Users = () => {
  const params = useParams();
  const { id, edit } = params;

  return <>{id ? edit ? <EditUser /> : <UserPage id={id} /> : <UsersList />}</>;
};

export default Users;
