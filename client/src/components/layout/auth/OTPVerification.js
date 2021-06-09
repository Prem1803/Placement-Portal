import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { useToasts } from "react-toast-notifications";
import { useDispatch } from "react-redux";
import { register } from "../../../actions/userActions";
import { useLocation } from "react-router-dom";
const OTPVerification = ({ props }) => {
  const { addToast } = useToasts();
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const { name, email, rollNo, branch, course, passoutYear, password } =
    location.state;
  const [otp, setOtp] = useState({
    otp: Math.random().toString().slice(2, 10),
    timeStamp: Math.round(new Date().getTime() / 1000),
  });
  const [inputOTP, setInputOTP] = useState("");
  const onChange = async (e) => {
    setInputOTP(e.target.value);
  };
  const verify = async (e) => {
    // console.log("currentotp:", otp);
    // console.log(otp.otp, " ", inputOTP);
    if (Math.round(new Date().getTime() / 1000) - otp.timeStamp > 300) {
      addToast("Sorry Time Out .Email Verification Failed ", {
        appearance: "error",
        autoDismiss: true,
        autoDismissTimeout: 2000,
      });
    } else {
      if (otp.otp === inputOTP) {
        addToast("Email Verified", {
          appearance: "success",
          autoDismiss: true,
          autoDismissTimeout: 2000,
        });
        const user = {
          name,
          email,
          rollNo,
          branch,
          course,
          passoutYear,
          password,
        };
        const isRegistered = await dispatch(register(user));

        if (isRegistered) {
          try {
            let token = JSON.parse(localStorage.getItem("userInfo")); //getting the token from local storage

            if (token) {
              const config = {
                headers: {
                  "Content-Type": "application/json",
                  "x-auth-token": `${token}`,
                },
              };

              let { data } = await axios.get(
                "/api/users/getLoggedInUser", //making call to the backend to get the logged in user
                config
              );

              data = JSON.parse(JSON.stringify(data)); //storing the response into the user
              history.push(`/editProfile`);
              window.location.reload();
            }
          } catch (e) {
            console.log(e.message);
          }
        } else {
          addToast("Error Something went wrong", {
            appearance: "error",
            autoDismiss: true,
            autoDismissTimeout: 2000,
          });
        }
      } else {
        addToast("Sorry OTP Entered is Invalid .Email Verification Failed ", {
          appearance: "error",
          autoDismiss: true,
          autoDismissTimeout: 2000,
        });
      }
    }
  };
  const sendOtpOverMail = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    await axios.post(
      `/api/mail/sendotp`, //making backend call to send otp for confirming email
      { otp: otp.otp, student: email },
      config
    );
  };
  const resendOTP = () => {
    setOtp({
      otp: Math.random().toString().slice(2, 10),
      timeStamp: Math.round(new Date().getTime() / 1000),
    });
    // console.log("RESEND:", otp);
    // sendOtpOverMail();
  };
  useEffect(() => {
    sendOtpOverMail();
  }, [email !== undefined && otp.otp !== undefined && otp.otp]);
  return (
    <div className="container" style={{ marginTop: "2rem" }}>
      <h4>
        Please Enter the OTP which is sent over the registered Email to confirm
        your registration
      </h4>
      <input type="text" onChange={onChange} />
      <button className="btn btn-success" onClick={verify}>
        Verify
      </button>
      <button className="btn btn-primary" onClick={resendOTP}>
        Re Send OTP
      </button>
    </div>
  );
};

export default OTPVerification;
