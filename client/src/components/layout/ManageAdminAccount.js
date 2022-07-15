import React from "react";
import { useNavigate } from "react-router";
import Spinner from "./Spinner";

const ManageAdminAccount = ({ user }) => {
  const navigate = useNavigate();

  const changePassword = () => {
    navigate({
      to: "/changepassword",
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
            <div onClick={changePassword}>
              <i className="fas fa-key" /> Change Your Password
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

export default ManageAdminAccount;
