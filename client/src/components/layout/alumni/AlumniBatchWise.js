import React from "react";
import { useLocation, useParams } from "react-router";
import { Link } from "react-router-dom";

const AlumniBatchWise = () => {
  const passoutYear = useParams().passoutYear.toString();
  const location = useLocation();
  const alumni = location.state;
  return (
    <div className="studentcontainer studentpanel">
      <Link
        to={{ pathname: `/alumni/${passoutYear}/btech`, state: alumni.BTech }}
      >
        <div className="btechpanelcard" />
        BTech
      </Link>
      <Link
        to={{ pathname: `/alumni/${passoutYear}/mtech`, state: alumni.MTech }}
      >
        <div className="mtechpanelcard" />
        MTech
      </Link>
      <Link to={{ pathname: `/alumni/${passoutYear}/phd`, state: alumni.PhD }}>
        <div className="phdpanelcard" />
        PhD
      </Link>
    </div>
  );
};

export default AlumniBatchWise;
