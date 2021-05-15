import React, { Fragment } from "react";
import spinner from "./spinner.gif";
const Spinner = () => {
  return (
    <Fragment>
      {/* <img
        src={spinner}
        alt="Loading..."
        style={{ display: "block", margin: "auto", width: "100px" }}
      /> */}
      <div id="loading-bar-spinner" className="spinner">
        <div className="spinner-icon"></div>
      </div>
    </Fragment>
  );
};

export default Spinner;
