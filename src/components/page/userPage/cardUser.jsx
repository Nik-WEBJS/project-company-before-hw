import React from "react";
import Avatar from "./avatar";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { useProfession } from "../../../hooks/useProfession";
import Loader from "../../ui/loader";
import { useAuth } from "../../../hooks/useAuth";

const CardUser = ({ user }) => {
  const { currentUser } = useAuth();
  const { getProfession, isLoading } = useProfession();
  const { _id, profession, rate, name, image } = user;
  const prof = getProfession(profession);
  const history = useHistory();
  const handleEdit = (id) => {
    history.push(`${id}/edit`);
  };

  if (!isLoading) {
    return (
      <div className="card mb-3">
        <div className="card-body">
          {currentUser._id === user._id && (
            <button
              className="position-absolute top-0 end-0 btn btn-light btn-sm"
              onClick={() => handleEdit(_id)}
            >
              <i className="bi bi-gear"></i>
            </button>
          )}

          <div className="d-flex flex-column align-items-center text-center position-relative">
            <Avatar size="150" src={image} />
            <div className="mt-3">
              <h4>{name}</h4>
              <p className="text-secondary mb-1">{"Профессия: " + prof.name}</p>
              <div className="text-muted">
                <i
                  className="bi bi-caret-down-fill text-primary"
                  role="button"
                ></i>
                <i className="bi bi-caret-up text-secondary" role="button"></i>
                <span className="ms-2">{"Рэйтинг :" + rate}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return <Loader />;
  }
};

CardUser.propTypes = {
  user: PropTypes.object
};

export default CardUser;
