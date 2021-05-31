import axios from "axios";
import React, { useEffect, useState } from "react";
import { useToasts } from "react-toast-notifications";
import { useHistory } from "react-router";

const ForgotPassword = () => {
  const [isOTPSent, setIsOTPSent] = useState(false);
  const [OTP, setOTP] = useState({
    otp: Math.random().toString().slice(2, 10),
    timeStamp: Math.round(new Date().getTime() / 1000),
  });
  const [email, setEmail] = useState("");
  const onEmailChange = async (e) => {
    setEmail(e.target.value);
  };
  const [inputOTP, setInputOTP] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const onInputOTPChange = async (e) => {
    setInputOTP(e.target.value);
  };
  const { addToast } = useToasts();
  const GetOTP = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      console.log(email);
      let data = await axios.post(
        `/api/users/isEmailAvailable`, //making backend call to check if email is available
        { email: email },
        config
      );
      console.log(data.data);
      if (data.data.isEmailAvailable === true) {
        addToast("Sorry Email is not Registered", {
          appearance: "error",
          autoDismiss: true,
          autoDismissTimeout: 2000,
        });
      } else {
        sendOtpOverMail();
      }
    } catch (e) {
      console.log(e.message);
    }
  };
  const sendOtpOverMail = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    await axios.post(
      `/api/mail/sendotptoresetpassword`, //making backend call to send otp for confirming email
      { otp: OTP.otp, student: email },
      config
    );
    setIsOTPSent(true);
  };
  const VerifyOTP = () => {
    console.log(OTP);
    if (OTP.otp === inputOTP) {
      if (Math.round(new Date().getTime() / 1000) - OTP.timeStamp > 300) {
        addToast("Sorry Time Out .Email Verification Failed ", {
          appearance: "error",
          autoDismiss: true,
          autoDismissTimeout: 2000,
        });
      } else {
        setIsVerified(true);
      }
    } else {
      addToast("Sorry OTP is incorrect", {
        appearance: "error",
        autoDismiss: true,
        autoDismissTimeout: 2000,
      });
    }
  };
  const [password, setPassword] = useState("");
  const history = useHistory();

  const onPasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const ResetPassword = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    let data = await axios.put(
      `/api/users/resetPassword`, //making backend call to send otp for confirming email
      { email: email, password: password },
      config
    );
    if (data.data.passwordReset) {
      addToast("Password has been Changed Successfully", {
        appearance: "success",
        autoDismiss: true,
        autoDismissTimeout: 2000,
      });
      history.push("/login");
    } else {
      addToast("Sorry Unable to Reset the Password", {
        appearance: "error",
        autoDismiss: true,
        autoDismissTimeout: 2000,
      });
    }
  };
  const [resend, setResend] = useState(false);
  const ResendOTP = async () => {
    setOTP({
      otp: Math.random().toString().slice(2, 10),
      timeStamp: Math.round(new Date().getTime() / 1000),
    });
    setResend(true);
  };
  useEffect(() => {
    sendOtpOverMail();
    // setResend(false);
  }, [resend]);
  if (!isVerified) {
    return (
      <div className="container" style={{ marginTop: "2rem" }}>
        {!isOTPSent ? (
          <div>
            <h4>
              Enter the Registered Email id to receive the one time passcode to
              reset your password.
            </h4>
            <input onChange={onEmailChange} type="text" value={email} />
            <button className="btn btn-danger" onClick={GetOTP}>
              Receive OTP
            </button>
          </div>
        ) : (
          <div>
            <h4>Enter the one time passcode which is sent on {email}</h4>
            <input onChange={onInputOTPChange} type="text" value={inputOTP} />
            <button className="btn btn-success" onClick={VerifyOTP}>
              Verify
            </button>
            <button className="btn btn-primary" onClick={ResendOTP}>
              Resend OTP
            </button>
          </div>
        )}
      </div>
    );
  } else {
    return (
      <div className="container" style={{ marginTop: "2rem" }}>
        <h4>Enter the new password</h4>
        <input onChange={onPasswordChange} type="password" />
        <button className="btn btn-success" onClick={ResetPassword}>
          Reset Password
        </button>
      </div>
    );
  }
};

export default ForgotPassword;
