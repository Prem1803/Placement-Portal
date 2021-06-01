import React from "react";
import { Link } from "react-router-dom";
import { useLocation, useParams } from "react-router";

const MTechStudents = () => {
  const location = useLocation();
  const passoutYear = useParams().passoutYear.toString();
  const alumni = location.state;
  const cseAlumni = alumni.filter((alumni) => {
    return alumni.branch === "CSE";
  });
  const eceAlumni = alumni.filter((alumni) => {
    return alumni.branch === "ECE";
  });
  const eeeAlumni = alumni.filter((alumni) => {
    return alumni.branch === "EEE";
  });
  return (
    <div className="studentcontainer studentpanel">
      <Link
        to={{ pathname: `/alumni/${passoutYear}/mtech/cse`, state: cseAlumni }}
      >
        <div className="csepanelcard" />
        CSE
      </Link>
      <Link
        to={{ pathname: `/alumni/${passoutYear}/mtech/ece`, state: eceAlumni }}
      >
        <div className="ecepanelcard" />
        ECE
      </Link>
      <Link
        to={{ pathname: `/alumni/${passoutYear}/mtech/eee`, state: eeeAlumni }}
      >
        <div className="eeepanelcard" />
        EEE
      </Link>
    </div>
  );
};

export default MTechStudents;
