import axios from "axios";
import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
} from "../constants/userConstants"; //importing the user Constants

//Making call to the backend to login the student with email and password
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    let { data } = await axios.post(
      "http://localhost:5000/api/users/login", //call is made to backend using axios
      { email, password },
      config
    );
    data = JSON.parse(JSON.stringify(data)); //response of the call is stored in the data
    if (data.isLoggedIn === true) {
      //if student is logged in successfully
      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: data,
      });

      localStorage.setItem("userInfo", JSON.stringify(data.token)); //now token is stored in the local storage
      return true;
    } else {
      //since student was not able to logged in
      localStorage.setItem("userInfo", null); //token is romoved from local storage
      return false;
    }
  } catch (error) {
    //If Some error occured during logging in
    console.log(error.message);
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
    localStorage.setItem("userInfo", null); //token is romoved from local storage

    return false;
  }
};

//Making call to the backend to login the admin with email and password
export const Adminlogin = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    let { data } = await axios.post(
      "http://localhost:5000/api/users/adminlogin", //call is made to backend using axios
      { email, password },
      config
    );
    data = JSON.parse(JSON.stringify(data)); //response of the call is stored in the data
    if (data.isLoggedIn === true) {
      //if admin is logged in successfully
      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: data,
      });

      localStorage.setItem("userInfo", JSON.stringify(data.token)); //now token is stored in the local storage
      return true;
    } else {
      //since admin was not able to logged in
      localStorage.setItem("userInfo", null); //token is romoved from local storage
      return false;
    }
  } catch (error) {
    console.log(error.message); //If Some error occured during logging in
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
    localStorage.setItem("userInfo", null); //token is romoved from local storage

    return false;
  }
};

//Making call to the backend to register the student
export const register = (student) => async (dispatch) => {
  try {
    dispatch({
      type: USER_REGISTER_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    let { data } = await axios.post(
      "http://localhost:5000/api/users/student", //call is made to backend using axios
      student,
      config
    );

    data = JSON.parse(JSON.stringify(data)); //response of the call is stored in the data
    if (data.isRegistered === true) {
      //if student is registered successfully
      dispatch({
        type: USER_REGISTER_SUCCESS,
        payload: data,
      });

      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: data,
      });

      localStorage.setItem("userInfo", JSON.stringify(data.token)); //now token is stored in the local storage
      return true;
    } else {
      //since student was not able to register
      localStorage.setItem("userInfo", null); //token is romoved from local storage
      return false;
    }
  } catch (error) {
    //If Some error occured during registering the student
    console.log(error.message);
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
    localStorage.setItem("userInfo", null); //token is romoved from local storage
    return false;
  }
};
