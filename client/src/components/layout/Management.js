import React from "react";
import { useParams } from "react-router";
import Spinner from "./Spinner";
import { Link } from "react-router-dom";
const Management = ({ user }) => {
  const userid = useParams().id; //getting the user id
  if (Object.keys(user).length !== 0) {
    if (user.uid) {
      if (user.type === 1)
        //if the logged in user is an admin
        return (
          <div className="admincontainer">
            <div className="adminpanel">
              <Link to={`/admindashboard/management/students`}>
                <div className="studentspanelcard" />
                ShortList Students
              </Link>

              <Link to={`/admindashboard/management/admins`}>
                <div className="adminpanelcard" />
                Admin Access
              </Link>
              <Link to={`/admindashboard/management/manageaccount`}>
                <div className="accountmanagementpanelcard" />
                Manage Account
              </Link>
              <Link to={`/admindashboard/management/placements`}>
                <div className="placementpanelcard" />
                Placement Status
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
  } else
    return (
      <div className="not-allowed">
        Sorry, you are not Logged In .Kindly Login In to access this page.
      </div>
    );
};

export default Management;
