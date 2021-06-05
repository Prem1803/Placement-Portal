import React, { useEffect, useRef, useState } from "react";
import Spinner from "./Spinner";
import { getAllUsers } from "../../api/apiUser";
import axios from "axios";
import { useToasts } from "react-toast-notifications";
const PlacementStatus = ({ user, token }) => {
  const [users, setUsers] = useState([]);
  const { addToast } = useToasts();
  const text = useRef("");

  const [filtered, setFiltered] = useState(null);

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
  const onFilterChange = (e) => {
    if (text.current.value !== "") {
      const filtered = users.filter((user) => {
        return (
          user.name.toLowerCase().includes(text.current.value.toLowerCase()) ||
          user.rollNo.toString().includes(text.current.value) ||
          user.userid.email
            .toString()
            .toLowerCase()
            .includes(text.current.value.toLowerCase())
        );
      });
      setFiltered(filtered);
    } else {
      setFiltered(null);
    }
  };
  const onChange = async (e) => {
    const user = { id: e.target.name, placementStatus: e.target.value };
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": `${token}`, //passing token to the request headers
      },
    };

    await axios.put(
      `/api/users/updateStudent`, //making backend call to Edit Profile
      user,
      config
    );
    addToast("Updating Student Please Wait", {
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
              <form>
                <input
                  ref={text}
                  type="text"
                  placeholder="Search Students..."
                  onChange={onFilterChange}
                />
              </form>
              <table className="student-table" style={{ overflowX: "auto" }}>
                <tbody>
                  <tr>
                    <td>Name</td>
                    <td>Roll No</td>
                    <td>Email</td>
                    <td>Placement Status</td>
                  </tr>

                  {filtered &&
                    filtered.map((user) => {
                      return (
                        <tr key={user._id}>
                          <td>{user.name}</td>
                          <td>{user.rollNo}</td>
                          <td>{user.userid.email}</td>
                          <td>
                            <select
                              name={user._id}
                              value={user.placementStatus}
                              onChange={onChange}
                            >
                              <option value="Not Placed">Not Placed</option>
                              <option value="Below 6LPA">Below 6 LPA</option>
                              <option value="6LPA - 8LPA">6LPA - 8LPA</option>
                              <option value="8LPA - 12LPA">8LPA - 12LPA</option>
                              <option value="12LPA - 16LPA">
                                12LPA - 16LPA
                              </option>
                              <option value="16LPA and Above">
                                16LPA and Above
                              </option>
                            </select>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          );
        } else
          return (
            <div className="container">
              <h2>Placement Status</h2>
              <form>
                <input
                  ref={text}
                  type="text"
                  placeholder="Search Students..."
                  onChange={onFilterChange}
                />
              </form>
              <table className="student-table" style={{ overflowX: "auto" }}>
                <tbody>
                  <tr>
                    <td>Name</td>
                    <td>Roll No</td>
                    <td>Email</td>
                    <td>Placement Status</td>
                  </tr>

                  {users &&
                    users.map((user) => {
                      return (
                        <tr key={user._id}>
                          <td>{user.name}</td>
                          <td>{user.rollNo}</td>
                          <td>{user.userid.email}</td>
                          <td>
                            <select
                              name={user._id}
                              value={user.placementStatus}
                              onChange={onChange}
                            >
                              <option value="Not Placed">Not Placed</option>
                              <option value="Below 6LPA">Below 6 LPA</option>
                              <option value="6LPA - 8LPA">6LPA - 8LPA</option>
                              <option value="8LPA - 12LPA">8LPA - 12LPA</option>
                              <option value="12LPA - 16LPA">
                                12LPA - 16LPA
                              </option>
                              <option value="16LPA and Above">
                                16LPA and Above
                              </option>
                            </select>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
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
