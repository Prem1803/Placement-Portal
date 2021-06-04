import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Spinner from "./Spinner";
import { getAllUsers } from "../../api/apiUser";
import UserFilter from "./UserFilter";
import axios from "axios";
import { useToasts } from "react-toast-notifications";
const PlacementStatus = ({ user, token }) => {
  const userid = useParams().id; //getting the user id
  const [users, setUsers] = useState([]);
  const { addToast } = useToasts();

  const [filtered, setFiltered] = useState(null);
  const loadFiltered = (filtered) => {
    setFiltered(filtered); //filtering the students
  };
  const loadUsers = () => {
    getAllUsers()
      .then((data) => {
        setUsers(data); //setting the students array with the response
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    loadUsers();
  }, []);

  const onChange = async (e) => {
    var type = 0;
    if (e.target.checked) {
      type = 2;
    } else {
      type = 0;
    }
    var user = { _id: e.target.name, type: type };

    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": `${token}`, //passing token to the request headers
      },
    };

    let { data } = await axios.put(
      `/api/users/updateUser`, //making backend call to Edit Profile
      user,
      config
    );
    addToast("Updating User Please Wait", {
      appearance: "success",
      autoDismiss: true,
      autoDismissTimeout: 4000,
    });
    loadUsers();
    setFiltered(null);
  };
  if (Object.keys(user).length !== 0) {
    if (user.uid) {
      if (user.type === 1)
        if (users.length === 0)
          //if the logged in user is an admin
          return <Spinner />;
        else if (filtered) {
          return (
            <div className="container">
              <h2>Placement Status</h2>
              <UserFilter loadFiltered={loadFiltered} AllUsers={users} />
              <table className="student-table" style={{ overflowX: "auto" }}>
                <tr>
                  <td>Name</td>
                  <td>Roll No</td>
                  <td>Email</td>
                  <td>Placed</td>
                </tr>

                {filtered &&
                  filtered.map((user) => {
                    return (
                      <tr>
                        <td>{user.name}</td>
                        <td>{user.rollNo}</td>
                        <td>{user.userid.email}</td>
                        <td>
                          <label className="switch">
                            <input
                              type="checkbox"
                              name={user.userid._id}
                              checked={user.userid.type === 0 ? false : true}
                              onChange={onChange}
                            />
                            <span className="slider round"></span>
                          </label>
                        </td>
                      </tr>
                    );
                  })}
              </table>
            </div>
          );
        } else
          return (
            <div className="container">
              <h2>Placement Status</h2>
              <UserFilter loadFiltered={loadFiltered} AllUsers={users} />
              <table className="student-table" style={{ overflowX: "auto" }}>
                <tr>
                  <td>Name</td>
                  <td>Roll No</td>
                  <td>Email</td>
                  <td>Placed</td>
                </tr>

                {users &&
                  users.map((user) => {
                    return (
                      <tr>
                        <td>{user.name}</td>
                        <td>{user.rollNo}</td>
                        <td>{user.userid.email}</td>
                        <td>
                          <label className="switch">
                            <input
                              type="checkbox"
                              name={user.userid._id}
                              checked={user.userid.type === 0 ? false : true}
                              onChange={onChange}
                            />
                            <span className="slider round"></span>
                          </label>
                        </td>
                      </tr>
                    );
                  })}
              </table>
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

export default PlacementStatus;
