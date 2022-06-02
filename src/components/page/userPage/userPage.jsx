import React, { useState, useEffect } from "react";
import Loader from "../../ui/loader";
import api from "../../../api";
import badgesClassName from "../../../utils/badgeClassName";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";

const UserPage = ({ id }) => {
  const [user, setUser] = useState();
  const history = useHistory();

  useEffect(() => {
    api.users.getById(id).then((user) => setUser(user));
  }, []);

  const handleEdit = (id) => {
    history.push(`${id}/edit`);
  };

  if (user) {
    const { _id, name, profession, qualities, completedMeetings, rate } = user;

    return (
      <div style={styled.block} key={_id} className="user__info">
        <h1>{name}</h1>
        <span style={styled.font}>{"Профессия: " + profession.name}</span>
        <ul
          style={{ listStyle: "none", display: "flex", margin: 0, padding: 0 }}
        >
          {qualities.map((qual) => (
            <li key={qual._id}>
              <span className={badgesClassName(qual.color)}>{qual.name}</span>
            </li>
          ))}
        </ul>
        <span style={styled.font && { display: "block" }}>
          {"Встретился раз: " + completedMeetings}
        </span>
        <span style={styled.font}>{"Рэйтинг :" + rate}</span>
        <button
          style={{ marginTop: "20px", display: "block" }}
          className="btn btn-dark"
          onClick={() => handleEdit(id)}
        >
          Изменить
        </button>
      </div>
    );
  } else {
    return <Loader />;
  }
};

const styled = {
  block: { display: "block", padding: "10px" },
  font: { fontSize: "20px", fontWeight: "bold" }
};

UserPage.propTypes = {
  id: PropTypes.string
};

export default UserPage;
