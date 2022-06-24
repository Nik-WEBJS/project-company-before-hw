import React from "react";
import { useParams } from "react-router-dom";
import UserPage from "../components/page/userPage/userPage";
import UsersListPage from "../components/page/userListPage/usersListPage";
import EditUser from "../components/page/editUser";
import UserProvider from "../hooks/useUsers";

const Users = () => {
  const params = useParams();
  const { id, edit } = params;

  return (
    <>
      <UserProvider>
        {id ? edit ? <EditUser /> : <UserPage id={id} /> : <UsersListPage />}
      </UserProvider>
    </>
  );
};

export default Users;
