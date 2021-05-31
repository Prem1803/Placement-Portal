import axios from "axios";
import React, { useState } from "react";
import { useHistory, useLocation } from "react-router";
import { useToasts } from "react-toast-notifications";

const ChangePassword = () => {
  const { addToast } = useToasts();

  const [password, setPassword] = useState("");
  const history = useHistory();
  const location = useLocation();
  const { email } = location.state;
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
      `/api/users/resetPassword`,
      { email: email, password: password },
      config
    );
    if (data.data.passwordReset) {
      addToast("Password has been Changed Successfully", {
        appearance: "success",
        autoDismiss: true,
        autoDismissTimeout: 2000,
      });
      localStorage.removeItem("userInfo");
      history.push("/login");
      window.location.reload();
    } else {
      addToast("Sorry Unable to Change the Password", {
        appearance: "error",
        autoDismiss: true,
        autoDismissTimeout: 2000,
      });
    }
  };
  return (
    <div className="container" style={{ marginTop: "2rem" }}>
      <h4>Enter the new password</h4>
      <input onChange={onPasswordChange} type="password" />
      <button className="btn btn-success" onClick={ResetPassword}>
        Reset Password
      </button>
    </div>
  );
};

export default ChangePassword;
