import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Adminlogin } from "../../../actions/userActions";
import { useToasts } from "react-toast-notifications";
const AdminLogin = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  }); //setting the user details to empty strings
  const dispatch = useDispatch();
  const { email, password } = user; //destructuring the user object

  const onChange = (e) => {
    //sets the user on change on the user details
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const history = useHistory();
  const { addToast } = useToasts();
  const onSubmit = async (e) => {
    //submitting the form to logging in the admin
    e.preventDefault();
    const isLoggedIn = await dispatch(Adminlogin(email, password)); //ckecking if the admin is logged in or not
    if (isLoggedIn) {
      history.push("/"); //redirects to the homepage on successfull login

      addToast("Logged In Successfully", {
        appearance: "success",
        autoDismiss: true,
        autoDismissTimeout: 2000,
      });
      window.location.reload();
    } else {
      addToast("Incorrect Credentials Login Failed", {
        appearance: "error",
        autoDismiss: true,
        autoDismissTimeout: 2000,
      });
    }
  };
  return (
    //returns the login form
    <div className="form-container">
      <h1>
        Admin <span className="text-primary">Login</span>
      </h1>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="text" name="email" value={email} onChange={onChange} />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={onChange}
          />
        </div>

        <input type="submit" value="Login" className="btn btn-primary" />
      </form>
      <Link to="/login">Login as a Student</Link>
    </div>
  );
};

export default AdminLogin;
