import React from "react";
import { Link } from "react-router-dom";
import { useLocation, useParams } from "react-router";
const PhDAlumni = ({ user }) => {
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
  const meAlumni = alumni.filter((alumni) => {
    return alumni.branch === "ME";
  });
  const asAlumni = alumni.filter((alumni) => {
    return alumni.branch === "AS";
  });
  if (Object.keys(user).length !== 0)
    return (
      <div className="studentcontainer studentpanel">
        <Link
          to={{ pathname: `/alumni/${passoutYear}/phd/cse`, state: cseAlumni }}
        >
          <div className="csepanelcard" />
        </Link>
        <Link
          to={{ pathname: `/alumni/${passoutYear}/phd/ece`, state: eceAlumni }}
        >
          <div className="ecepanelcard" />
        </Link>
        <Link
          to={{ pathname: `/alumni/${passoutYear}/phd/eee`, state: eeeAlumni }}
        >
          <div className="eeepanelcard" />
        </Link>
        <Link
          to={{ pathname: `/alumni/${passoutYear}/phd/me`, state: meAlumni }}
        >
          <div className="mepanelcard" />
        </Link>
        <Link
          to={{ pathname: `/alumni/${passoutYear}/phd/as`, state: asAlumni }}
        >
          <div className="aspanelcard" />
        </Link>
      </div>
    );
  else
    return (
      <div className="not-allowed">
        Sorry, you are not Logged In .Kindly Login In to access this page.
      </div>
    );
};

export default PhDAlumni;
