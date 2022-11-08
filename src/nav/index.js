import React from "react";
import { Link } from "react-router-dom";
import { PATH } from "../router/router";

const Navigation = () => {
  return (
    <nav className="nav">
      <ul>
        <li>
          <Link to={PATH.HOME}>Home</Link>
        </li>
        <li>
          <Link to={PATH.UNION_FIND}>Union Find</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
