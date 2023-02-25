import React, { useState, useEffect } from "react";
import axios from "axios";
import { useToasts } from "react-toast-notifications";
import { useNavigate } from "react-router-dom";
import { getUserInfo } from "../../api/apiUser";
import Spinner from "./Spinner";

export const EditProfile = ({ user, userDetails }) => {
  const token = localStorage.getItem("userInfo");
  const { addToast } = useToasts();

  const [currentUser, setUser] = useState({}); //setting user
  const {
    _id,
    name,
    rollNo,
    branch,
    course,
    passoutYear,
    imgUrl,
    cgpa,
    dob,
    gender,
    mobileNo,
    nationality,
    address,
    board10th,
    passingYear10th,
    percentage10th,
    board12th,
    passingYear12th,
    percentage12th,
    linkedInUrl,
    resumeUrl,
    contactEmail,
    interests,
  } = currentUser;

  useEffect(() => {
    const loadUser = () => {
      //loading user
      // console.log(user.sid);
      if (user.sid)
        getUserInfo(user.sid)
          .then((data) => {
            setUser(data); //setting user details with the response
          })
          .catch((err) => {
            console.log(err);
          });
    };
    loadUser(); //loading user
  }, [userDetails]);
  const onChange = (e) => {
    //setting user on change in user details from the form
    setUser({ ...currentUser, [e.target.name]: e.target.value });
  };
  const navigate = useNavigate();
  const onSubmit = async (e) => {
    console.log(currentUser);
    e.preventDefault();
    if (Number(cgpa) > 10 || Number(cgpa) < 0) currentUser.cgpa = "NaN";
    console.log(dob);
    if (
      dob === "" ||
      gender === "" ||
      mobileNo === "" ||
      nationality === "" ||
      address === "" ||
      board10th === "" ||
      passingYear10th === "" ||
      percentage10th === "" ||
      board12th === "" ||
      passingYear12th === "" ||
      percentage12th === "" ||
      contactEmail === ""
    ) {
      addToast("Validation Failed Please Fill in all the required Fields", {
        appearance: "error",
        autoDismiss: true,
        autoDismissTimeout: 5000,
      });
    } else {
      const config = {
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": `${token}`, //passing token to the request headers
        },
      };

      let { data } = await axios.put(
        `/api/users/${currentUser._id}`, //making backend call to Edit Profile
        currentUser,
        config
      );

      setUser(JSON.parse(JSON.stringify(data))); //setting user with the response
      addToast("Profile Updated Successfully", {
        appearance: "success",
        autoDismiss: true,
        autoDismissTimeout: 2000,
      });
      navigate(`/`); //redirecting to the home page
      window.location.reload();
    }
  };
  const uploadFileHandler = async (e) => {
    //uploading the user image
    // const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", e.target.files[0]);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await axios.post(
        "/api/upload", //making backend call to upload the image
        formData,
        config
      );
      currentUser.imgUrl = data;
    } catch (error) {
      console.error(error);
    }
  };
  if (Object.keys(user).length !== 0) {
    if (userDetails._id && currentUser._id) {
      if (currentUser._id === userDetails._id)
        return (
          //returns the user Profile form
          <div className="container">
            <form onSubmit={onSubmit}>
              <div className="form-group">
                <label htmlFor="image">Image</label>
                <input
                  type="file"
                  name="imgUrl"
                  onChange={uploadFileHandler}
                  {...imgUrl}
                  style={{
                    backgroundColor: "white",
                  }}
                />
                {imgUrl && (
                  <div
                    style={{
                      maxHeight: "200px",
                      maxWidth: "200px",
                      margin: "0 auto",
                    }}
                  >
                    <img
                      src={imgUrl}
                      style={{
                        maxHeight: "200px",
                        maxWidth: "200px",
                      }}
                    />
                  </div>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  name="name"
                  value={name}
                  onChange={onChange}
                  readOnly
                />
              </div>
              <div className="form-group">
                <label htmlFor="rollNo">Roll No</label>
                <input
                  type="text"
                  name="rollNo"
                  value={rollNo}
                  onChange={onChange}
                  readOnly
                />
              </div>
              <div className="form-group">
                <label htmlFor="branch">Branch</label>
                <input
                  type="text"
                  name="branch"
                  value={branch}
                  onChange={onChange}
                  readOnly
                />
              </div>

              <div className="form-group">
                <label htmlFor="course">Course</label>
                <input
                  type="text"
                  name="course"
                  value={course}
                  onChange={onChange}
                  readOnly
                />
              </div>
              <div className="form-group">
                <label htmlFor="passoutYear">Passout Year</label>
                <input
                  type="text"
                  name="passoutYear"
                  value={passoutYear}
                  onChange={onChange}
                  readOnly
                />
              </div>
              <div className="form-group">
                <label htmlFor="cgpa">
                  Current CGPA<span className="text-danger"> *</span>
                </label>
                <input
                  type="text"
                  name="cgpa"
                  value={cgpa}
                  onChange={onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="dob">
                  Date of Birth<span className="text-danger"> *</span>
                </label>
                <input type="date" name="dob" value={dob} onChange={onChange} />
              </div>
              <div className="form-group">
                <label htmlFor="gender">
                  Gender<span className="text-danger"> *</span>
                </label>
                <select name="gender" value={gender} onChange={onChange}>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="mobileNo">
                  Mobile No<span className="text-danger"> *</span>
                </label>
                <input
                  type="text"
                  name="mobileNo"
                  value={mobileNo}
                  onChange={onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="nationality">
                  Nationality<span className="text-danger"> *</span>
                </label>
                <input
                  type="text"
                  name="nationality"
                  value={nationality}
                  onChange={onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="address">
                  Address<span className="text-danger"> *</span>
                </label>
                <textarea
                  type="text"
                  name="address"
                  value={address}
                  onChange={onChange}
                  rows={5}
                />
              </div>
              <div className="form-group">
                <label htmlFor="board10th">
                  10th Board<span className="text-danger"> *</span>
                </label>
                <input
                  type="text"
                  name="board10th"
                  value={board10th}
                  onChange={onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="passingYear10th">
                  10th Passing Year<span className="text-danger"> *</span>
                </label>
                <input
                  type="text"
                  name="passingYear10th"
                  value={passingYear10th}
                  onChange={onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="percentage10th">
                  10th Percentage/CGPA<span className="text-danger"> *</span>
                </label>
                <input
                  type="text"
                  name="percentage10th"
                  value={percentage10th}
                  onChange={onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="board12th">
                  12th Board<span className="text-danger"> *</span>
                </label>
                <input
                  type="text"
                  name="board12th"
                  value={board12th}
                  onChange={onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="passingYear12th">
                  12th Passing Year<span className="text-danger"> *</span>
                </label>
                <input
                  type="text"
                  name="passingYear12th"
                  value={passingYear12th}
                  onChange={onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="percentage12th">
                  12th Percentage/CGPA<span className="text-danger"> *</span>
                </label>
                <input
                  type="text"
                  name="percentage12th"
                  value={percentage12th}
                  onChange={onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="linkedInUrl">Linked In</label>
                <input
                  type="text"
                  name="linkedInUrl"
                  value={linkedInUrl}
                  onChange={onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="resumeUrl">Resume</label>
                <input
                  type="text"
                  name="resumeUrl"
                  value={resumeUrl}
                  onChange={onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="interests">Interests</label>
                <textarea
                  type="text"
                  name="interests"
                  value={interests}
                  onChange={onChange}
                  rows={3}
                />
              </div>
              <div className="form-group">
                <label htmlFor="contactEmail">Contact Email</label>
                <input
                  type="text"
                  name="contactEmail"
                  value={contactEmail}
                  onChange={onChange}
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Update Profile
              </button>
            </form>
          </div>
        );
      else
        return (
          <div className="not-allowed">
            Sorry, you are not allowed to Edit this user profile.
          </div>
        );
    } else {
      return <Spinner />;
    }
  } else
    return (
      <div className="not-allowed">
        Sorry, you are not Logged In .Kindly Login In to access this page.
      </div>
    );
};
export default EditProfile;
