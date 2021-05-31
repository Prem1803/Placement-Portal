import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { register } from "../../../actions/userActions";
import { useToasts } from "react-toast-notifications";
import axios from "axios";

const Register = () => {
  const [valid, setValid] = useState("false");
  const [user, setUser] = useState({
    name: "",
    email: "",
    rollNo: "",
    branch: "CSE",
    course: "Btech",
    passoutYear: "",
    password: "",
    password2: "",
  }); //setting the user details to empty strings
  const dispatch = useDispatch();
  const history = useHistory();
  const {
    name,
    email,
    rollNo,
    branch,
    course,
    passoutYear,
    password,
    password2,
  } = user; //destructuring the user object
  const validateEmail = (email) => {
    var re =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(email)) {
      //Email validation. Procees to test if it's from the right domain (Second argument is to check that the string ENDS with this domain, and that it doesn't just contain it)
      if (
        email.indexOf(
          "@nitdelhi.ac.in",
          email.length - "@nitdelhi.ac.in".length
        ) !== -1
      ) {
        var x = document.getElementById("email");
        x.classList.add("fas");
        x.classList.add("fa-check");
        x.classList.remove("fa-times");
        x.style.color = "Green";
        setValid(true);
      } else {
        var x = document.getElementById("email");
        x.classList.add("fas");
        x.classList.remove("fa-check");
        x.classList.add("fa-times");
        x.style.color = "Red";
        setValid(false);

        addToast("Enter a valid email of the format Rollno@nitdelhi.ac.in", {
          appearance: "error",
          autoDismiss: true,
          autoDismissTimeout: 5000,
        });
      }
    }
  };

  const validatePassword = () => {
    return password === password2 && password.length >= 5;
  };
  const onChange = async (e) => {
    //sets the user on change on the user details

    await setUser({ ...user, [e.target.name]: e.target.value });
    if (e.target.name === "email") {
      validateEmail(e.target.value);
    }
  };

  const { addToast } = useToasts();

  const onSubmit = async (e) => {
    //submitting the form to register the Student
    e.preventDefault();
    const isPasswordValid = validatePassword();
    if (!valid)
      addToast(
        "Validation Failed Enter Correct Email Address.Email must end with @nitdelhi.ac.in",
        {
          appearance: "error",
          autoDismiss: true,
          autoDismissTimeout: 5000,
        }
      );

    if (!isPasswordValid)
      addToast(
        "Validation Failed Either Password is too short or Password Confirmation doesn't match Password ",
        {
          appearance: "error",
          autoDismiss: true,
          autoDismissTimeout: 5000,
        }
      );
    if (name === "" || passoutYear === "") {
      addToast("Validation Failed Please Fill in all the required Fields", {
        appearance: "error",
        autoDismiss: true,
        autoDismissTimeout: 5000,
      });
    }
    if (valid && name !== "" && passoutYear !== "" && isPasswordValid) {
      // const isRegistered = await dispatch(register(user));
      // if (isRegistered) {
      //   //ckecking if the student is registered or not
      //   addToast("User Registered Successfully", {
      //     appearance: "success",
      //     autoDismiss: true,
      //     autoDismissTimeout: 2000,
      //   });
      //   history.push("/verify"); //redirects to the Verification Page on successfull register

      //   // history.push("/"); //redirects to the homepage on successfull register
      //   window.location.reload();
      // } else {
      //   addToast("Registration Failed This Email is Already Taken", {
      //     appearance: "error",
      //     autoDismiss: true,
      //     autoDismissTimeout: 2000,
      //   });
      // }

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      let { data } = await axios.post(
        `/api/users/isEmailAvailable`, //making backend call to check if email is available
        { email: user.email },
        config
      );
      if (data.isEmailAvailable) {
        addToast("User Registered Successfully", {
          appearance: "success",
          autoDismiss: true,
          autoDismissTimeout: 2000,
        });
        history.push({
          pathname: "/verify",
          state: {
            name: user.name,
            rollNo: user.rollNo,
            email: user.email,
            password: user.password,
            branch: user.branch,
            course: user.course,
            passoutYear: user.passoutYear,
          },
        }); //redirects to the Verification Page on successfull register
      } else {
        addToast("Registration Failed This Email is Already Taken", {
          appearance: "error",
          autoDismiss: true,
          autoDismissTimeout: 2000,
        });
      }
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
            Email <span className="text-danger"> *</span>
            <i
              id="email"
              class=""
              style={{ display: "inline", float: "right" }}
            />
          </label>
          <input type="text" name="email" value={email} onChange={onChange} />
        </div>

        <div className="form-group row">
          <div className="col">
            <label htmlFor="rollNo">
              Roll No<span className="text-danger"> *</span>
            </label>
            <input
              type="text"
              name="rollNo"
              value={rollNo}
              onChange={onChange}
            />
          </div>
          <div className="col">
            <label htmlFor="course">
              Course<span className="text-danger"> *</span>
            </label>

            <select name="course" value={course} onChange={onChange}>
              <option value="BTech">BTech</option>
              <option value="MTech">MTech</option>
              <option value="PhD">PhD</option>
            </select>
          </div>
        </div>

        <div className="form-group row">
          <div className="col">
            <label htmlFor="branch">
              Branch<span className="text-danger"> *</span>
            </label>

            <select name="branch" value={branch} onChange={onChange}>
              <option value="CSE">CSE</option>
              <option value="ECE">ECE</option>
              <option value="EEE">EEE</option>
            </select>
          </div>
          <div className="col">
            <label htmlFor="passoutYear">
              Passout Year<span className="text-danger"> *</span>
            </label>
            <input
              type="text"
              name="passoutYear"
              value={passoutYear}
              onChange={onChange}
              placeholder={new Date().getFullYear()}
            />
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
