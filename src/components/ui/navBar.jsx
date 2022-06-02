import React from "react";
import { Link } from "react-router-dom";

const styled = {
  list: {
    listStyle: "none",
    display: "flex"
  },
  item: {
    marginRight: "20px"
  },
  link: {
    textDecoration: "none"
  }
};

const NavBar = () => {
  return (
    <ul className="nav" style={styled.list}>
      <li className="nav-item" style={styled.item}>
        <Link
          className="nav-link active"
          aria-current="page"
          style={styled.link}
          to="/main"
        >
          Main
        </Link>
      </li>
      <li className="nav-item" style={styled.item}>
        <Link className="nav-link" style={styled.link} to="/login">
          Login
        </Link>
      </li>
      <li className="nav-item" style={styled.item}>
        <Link className="nav-link" style={styled.link} to="/users">
          Users
        </Link>
      </li>
    </ul>
  );
};

export default NavBar;
