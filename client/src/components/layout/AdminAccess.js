import React from "react";
import { useParams } from "react-router";
import Spinner from "./Spinner";

const AdminAccess = ({ user }) => {
  const userid = useParams().id; //getting the user id
  if (user.uid) {
    if (userid === user.uid)
      //if the logged in user is an admin
      return <div></div>;
    else
      return (
        <div className="not-allowed">
          Sorry, you are not allowed to access this page.
        </div>
      );
  } else return <Spinner />;
};

export default AdminAccess;
