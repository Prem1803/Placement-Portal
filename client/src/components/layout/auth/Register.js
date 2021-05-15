import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { register } from "../../../actions/userActions";
import { useToasts } from "react-toast-notifications";

const Register = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    rollNo: "",
    branch: "CSE",
    batch: "",
    password: "",
    password2: "",
  }); //setting the user details to empty strings
  const dispatch = useDispatch();
  const history = useHistory();
  const { name, email, rollNo, branch, batch, password, password2 } = user; //destructuring the user object

  const onChange = (e) => {
    //sets the user on change on the user details
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const { addToast } = useToasts();

  const onSubmit = async (e) => {
    //submitting the form to register the Student
    e.preventDefault();

    const isRegistered = await dispatch(register(user));
    if (isRegistered) {
      //ckecking if the student is registered or not
      addToast("User Registered Successfully", {
        appearance: "success",
        autoDismiss: true,
        autoDismissTimeout: 2000,
      });
      history.push("/"); //redirects to the homepage on successfull register
      window.location.reload();
    } else {
      addToast("Registration Failed This Email is Already Taken", {
        appearance: "error",
        autoDismiss: true,
        autoDismissTimeout: 2000,
      });
    }
  };

  return (
    //returns the Register form
    <div className="form-container">
      <h1>
        Account <span className="text-primary">Register</span>
      </h1>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="name">
            Name<span className="text-danger"> *</span>
          </label>
          <input type="text" name="name" value={name} onChange={onChange} />
        </div>
        <div className="form-group">
          <label htmlFor="email">
            Email<span className="text-danger"> *</span>
          </label>
          <input type="text" name="email" value={email} onChange={onChange} />
        </div>
        <div className="form-group">
          <label htmlFor="rollNo">
            Roll No<span className="text-danger"> *</span>
          </label>
          <input type="text" name="rollNo" value={rollNo} onChange={onChange} />
        </div>
        <div className="form-group row">
          <div className="col">
            <label htmlFor="branch">
              Branch<span className="text-danger"> *</span>
            </label>
            {/* <input
              type="text"
              name="branch"
              value={branch}
              onChange={onChange}
            /> */}
            <select name="branch" value={branch} onChange={onChange}>
              <option value="CSE">CSE</option>
              <option value="ECE">ECE</option>
              <option value="EEE">EEE</option>
            </select>
          </div>
          <div className="col">
            <label htmlFor="batch">
              Batch<span className="text-danger"> *</span>(For ex : 2019)
            </label>
            <input type="text" name="batch" value={batch} onChange={onChange} />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="password">
            Password<span className="text-danger"> *</span>
          </label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={onChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="password2">
            Confirm Password<span className="text-danger"> *</span>
          </label>
          <input
            type="password"
            name="password2"
            value={password2}
            onChange={onChange}
          />
        </div>
        <button type="submit" value="" className="btn btn-primary">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
