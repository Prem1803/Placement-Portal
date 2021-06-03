import React from "react";
import { Link } from "react-router-dom";

const Announcements = ({ user }) => {
  if (Object.keys(user).length !== 0)
    return (
      <div className="announcementcontainer">
        <div className="announcementpanel">
          <Link to={`/announcements/oncampus`}>
            <div className="oncampuspanelcard" />
            On Campus Announcements
          </Link>

          <Link to={`/announcements/offcampus`}>
            <div className="offcampuspanelcard" />
            Off Campus Announcements
          </Link>
        </div>
      </div>
    );
  else
    return (
      <div className="not-allowed">
        Sorry, you are not Logged In .Kindly Login In to access this page.
      </div>
    );
};

export default Announcements;
