import React from "react";
import { useParams } from "react-router";
import Spinner from "./Spinner";
import { Link } from "react-router-dom";
const Management = ({ user }) => {
  const userid = useParams().id; //getting the user id
  if (user.uid) {
    if (userid === user.uid)
      //if the logged in user is an admin
      return (
        <div className="admincontainer">
          <div className="adminpanel">
            <Link to={`/admindashboard/${user.uid}/management/students`}>
              <div className="studentspanelcard" />
              ShortList Students
            </Link>

            <Link to={`/admindashboard/${user.uid}/management/admins`}>
              <div className="adminpanelcard" />
              Admin Access
            </Link>
            <Link to={`/admindashboard/${user.uid}/management/manageaccount`}>
              <div className="accountmanagementpanelcard" />
              Manage Account
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

export default Management;
