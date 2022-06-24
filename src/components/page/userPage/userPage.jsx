import React from "react";
import Loader from "../../ui/loader";
// import api from "../../../api";
import PropTypes from "prop-types";
import UserCardQualities from "./userCardQualities";
import CardUser from "./cardUser";
import UserCardMeet from "./userCardMeet";
import CommentsList from "./UserComents/commentsList";
import { useUsers } from "../../../hooks/useUsers";
import { ComentsProvider } from "../../../hooks/useComents";

const UserPage = ({ id }) => {
  const { usersGetById } = useUsers();
  const user = usersGetById(id);

  if (user) {
    return (
      <div className="container" key={id}>
        <div className="row gutters-sm">
          <div className="col-md-4 mb-3">
            <CardUser user={user} />
            <UserCardQualities {...user} />
            <UserCardMeet {...user} />
          </div>
          <div className="col-md-8">
            <ComentsProvider>
              <CommentsList />
            </ComentsProvider>
          </div>
        </div>
      </div>
    );
  } else {
    return <Loader />;
  }
};

UserPage.propTypes = {
  id: PropTypes.string
};

export default UserPage;
