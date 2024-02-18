import React from "react";
import "bulma/css/bulma.css";

const MainPanel = ({ children }) => {
  return (
    <div className="column hero">
      <div className="hero-body">
        <div className="columns is-centered">{children}</div>
      </div>
    </div>
  );
};

export default MainPanel;
