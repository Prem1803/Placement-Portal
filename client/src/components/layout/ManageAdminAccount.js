import React from "react";
import { useHistory, useParams } from "react-router";
import { Link } from "react-router-dom";
import Spinner from "./Spinner";

const ManageAdminAccount = ({ user }) => {
  const userid = useParams().id; //getting the user id
  const history = useHistory();

  const changePassword = () => {
    history.push({
      pathname: "/changepassword",
      state: {
        email: user.email,
      },
    });
  };
  if (Object.keys(user).length !== 0) {
    if (user.uid) {
      if (user.type === 1)
        //if the logged in user is an admin
        return (
          <div className="container" style={{ marginTop: "2rem" }}>
            <a onClick={changePassword}>
              <i className="fas fa-key" /> Change Your Password
            </a>
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

export default ManageAdminAccount;
