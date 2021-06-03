import React from "react";
import { useParams } from "react-router";
import Spinner from "./Spinner";
import { Link } from "react-router-dom";

const AdminDashboard = ({ props, user, userDetails, token }) => {
  if (Object.keys(user).length !== 0) {
    if (user.uid) {
      {
        console.log(user);
        if (user.type != 0)
          //if the logged in user is an admin
          return (
            <div className="admincontainer">
              <div className="adminpanel">
                <Link to={`/admindashboard/announcements`}>
                  <div className="announcementpanelcard" />
                  Announcements
                </Link>

                <Link to={`/admindashboard/blogs`}>
                  <div className="blogpanelcard" />
                  Blogs
                </Link>

                {user.type === 1 && (
                  <Link to={`/admindashboard/management`}>
                    <div className="managementpanelcard" />
                    Management
                  </Link>
                )}
              </div>
            </div>
          );
        else
          return (
            <div className="not-allowed">
              Sorry, you are not allowed to access this page.
            </div>
          );
      }
    } else return <Spinner />;
  } else
    return (
      <div className="not-allowed">
        Sorry, you are not Logged In .Kindly Login In to access this page.
      </div>
    );
};

export default AdminDashboard;
