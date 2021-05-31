import React from "react";
import { useParams } from "react-router";
import Spinner from "./Spinner";
import { Link } from "react-router-dom";

const AdminDashboard = ({ props, user, userDetails, token }) => {
  const userid = useParams().id; //getting the user id

  if (user.uid) {
    if (userid === user.uid)
      //if the logged in user is an admin
      return (
        <div className="admincontainer">
          <div className="adminpanel">
            <Link to={`/admindashboard/${user.uid}/announcements`}>
              <div className="announcementpanelcard" />
              Announcements
            </Link>

            <Link to={`/admindashboard/${user.uid}/blogs`}>
              <div className="blogpanelcard" />
              Blogs
            </Link>

            <Link to={`/admindashboard/${user.uid}/management`}>
              <div className="managementpanelcard" />
              Management
            </Link>
          </div>
        </div>
      );
    else
      return (
        <div className="not-allowed">
          Sorry, you are not allowed to access this page.
        </div>
      );
  } else return <Spinner />;
};

export default AdminDashboard;
