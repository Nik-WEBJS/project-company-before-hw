import React from "react";
import PropTypes from "prop-types";
import Avatar from "../avatar";
import { showDate } from "../../../../utils/showDate";
import { useUsers } from "../../../../hooks/useUsers";
import { useAuth } from "../../../../hooks/useAuth";

const Coment = ({
  _id,
  userId,
  pageId,
  content,
  created_at: created,
  onRemove
}) => {
  const { currentUser } = useAuth();
  const { usersGetById } = useUsers();
  const user = usersGetById(userId);

  return (
    <div key={pageId} className="bg-light card-body  mb-3">
      <div className="row">
        <div className="col">
          <div className="d-flex flex-start ">
            <Avatar size="65" src={user.image} />
            <div className="flex-grow-1 flex-shrink-1">
              <div className="mb-4">
                <div className="d-flex justify-content-between align-items-center">
                  <p className="mb-1 ">
                    <b>{user.name}</b>
                    <span className="small">
                      {" "}
                      - <b>{showDate(created)}</b>
                    </span>
                  </p>
                  {currentUser._id === userId ? (
                    <button
                      className="btn btn-sm text-primary d-flex align-items-center"
                      onClick={() => onRemove(_id)}
                    >
                      <i className="bi bi-x-lg"></i>
                    </button>
                  ) : (
                    ""
                  )}
                </div>
                <p className="small mb-0">{content}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Coment.propTypes = {
  _id: PropTypes.string,
  userId: PropTypes.string,
  pageId: PropTypes.string,
  content: PropTypes.string,
  created_at: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  onRemove: PropTypes.func
};

export default Coment;
