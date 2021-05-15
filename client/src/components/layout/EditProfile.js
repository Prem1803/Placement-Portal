import React, { useState, useEffect } from "react";
import axios from "axios";
import { useToasts } from "react-toast-notifications";
import { useHistory, useParams } from "react-router";
import { getUser } from "../../api/apiUser";
import Spinner from "./Spinner";

export const EditProfile = ({ userDetails }) => {
  const token = localStorage.getItem("userInfo");
  const { addToast } = useToasts();
  const userid = useParams().id; //getting user id

  const [user, setUser] = useState({}); //setting user
  const loadUser = () => {
    //loading user
    getUser(userid)
      .then((data) => {
        setUser(data); //setting user details with the response
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    loadUser(); //loading user
  }, user);
  const onChange = (e) => {
    //setting user on change in user details from the form
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const history = useHistory();
  const onSubmit = async (e) => {
    e.preventDefault();

    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": `${token}`, //passing token to the request headers
      },
    };

    let { data } = await axios.put(
      `http://localhost:5000/api/users/${user._id}`, //making backend call to Edit Profile
      user,
      config
    );

    setUser(JSON.parse(JSON.stringify(data))); //setting user with the response
    addToast("Profile Updated Successfully", {
      appearance: "success",
      autoDismiss: true,
      autoDismissTimeout: 2000,
    });
    history.push(`/`); //redirecting to the home page
    window.location.reload();
  };
  const uploadFileHandler = async (e) => {
    //uploading the user image
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await axios.post(
        "http://localhost:5000/api/upload", //making backend call to upload the image
        formData,
        config
      );
      user.imgUrl = data.slice(data.indexOf("image"));
    } catch (error) {
      console.error(error);
    }
  };
  const {
    name,
    branch,
    imgUrl,
    batch,
    rollNo,
    description,
    bio,
    skills,
    linkedInUrl,
    resumeUrl,
    githubUrl,
    portfolioWebsite,
    contactEmail,
    worksAt,
  } = user;
  if (userDetails._id && user._id) {
    if (user._id === userDetails._id)
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
            </div>

            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input type="text" name="name" value={name} onChange={onChange} />
            </div>
            <div className="form-group">
              <label htmlFor="rollNo">Roll No</label>
              <input
                type="text"
                name="rollNo"
                value={rollNo}
                onChange={onChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="branch">Branch</label>
              <input
                type="text"
                name="branch"
                value={branch}
                onChange={onChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="batch">Batch</label>
              <input
                type="text"
                name="batch"
                value={batch}
                onChange={onChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                name="description"
                value={description}
                onChange={onChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="bio">Bio</label>
              <textarea
                type="text"
                name="bio"
                value={bio}
                onChange={onChange}
                rows={10}
              />
            </div>
            <div className="form-group">
              <label htmlFor="worksAt">Works At</label>
              <input
                type="text"
                name="worksAt"
                value={worksAt}
                onChange={onChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="skills">Skills</label>
              <input
                type="text"
                name="skills"
                value={skills}
                onChange={onChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="githubUrl">Github</label>
              <input
                type="text"
                name="githubUrl"
                value={githubUrl}
                onChange={onChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="linkedInUrl">LinkedIn</label>
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
              <label htmlFor="contactEmail">Contact Email</label>
              <input
                type="text"
                name="contactEmail"
                value={contactEmail}
                onChange={onChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="portfolioWebsite">Portfolio Website</label>
              <input
                type="text"
                name="portfolioWebsite"
                value={portfolioWebsite}
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
  } else return <Spinner />;
};
export default EditProfile;
