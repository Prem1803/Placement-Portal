import React from "react";
import { Link } from "react-router-dom";

const Announcements = () => {
  return (
    <div className="announcementcontainer">
      <div className="announcementpanel">
        <Link to={`/oncampusannouncements`}>
          <div className="oncampuspanelcard" />
          On Campus Announcements
        </Link>

        <Link to={`/offcampusannouncements`}>
          <div className="offcampuspanelcard" />
          Off Campus Announcements
        </Link>
      </div>
    </div>
  );
};

export default Announcements;
