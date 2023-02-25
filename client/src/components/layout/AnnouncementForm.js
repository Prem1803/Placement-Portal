import React, { useState } from "react";
import { useToasts } from "react-toast-notifications";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Spinner from "./Spinner";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export const AnnouncementForm = ({ user, userDetails, token }) => {
  const { addToast } = useToasts();

  const [announcement, setAnnouncement] = useState({ category: "On Campus" }); //setting announcement as empty object
  const [content, setContent] = useState("");
  const [visibility, setVisibility] = useState("all");
  const [visibilitySpecific, setVisibilitySpecific] = useState({});
  const navigate = useNavigate();
  const sendAnnouncementNotificationOverMail = async (newAnnouncement) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    await axios.post(
      `/api/mail/sendannouncementnotification`, //making backend call to send otp for confirming email
      { announcement: newAnnouncement },
      config
    );
  };
  const onSubmit = async (e) => {
    announcement.content = content;
    announcement.visibility = visibilitySpecific;
    e.preventDefault();
    if (announcement.tags !== undefined) {
      const config = {
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": `${token}`, //passing token to the request headers
        },
      };

      let { data } = await axios.post(
        `/api/announcements/`, //making backend call to add an announcement
        announcement,
        config
      );

      setAnnouncement(JSON.parse(JSON.stringify(data))); //setting announcement with the resonse
      sendAnnouncementNotificationOverMail(JSON.parse(JSON.stringify(data)));
      addToast("Announcement Addded Successfully", {
        appearance: "success",
        autoDismiss: true,
        autoDismissTimeout: 2000,
      });
      navigate(`/admindashboard`); //redirecting to the admin dahboard
    } else {
      console.log(visibilitySpecific);
    }
  };
  const onChange = (e) => {
    //setting announcement on change in announcement details from the form
    if (e.target.name === "visibility") {
      setVisibility(e.target.value);
      if (e.target.value === "all") {
        setVisibilitySpecific({});
      }
    }
    setAnnouncement({ ...announcement, [e.target.name]: e.target.value });
  };
  const onVisibilityChange = (e) => {
    setVisibilitySpecific({
      ...visibilitySpecific,
      [e.target.name]: e.target.value,
    });
  };
  const uploadFileHandler = async (e) => {
    //uploading the announcment image
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
        "/api/upload", //making backend call to upload the image
        formData,
        config
      );
      announcement.image = data;
    } catch (error) {
      console.error(error);
    }
  };
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, false] }],
      [{ font: [] }],
      [{ size: ["small", false, "large", "huge"] }],
      [{ color: [] }, { background: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      [{ script: "sub" }, { script: "super" }],
      ["link", "image"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "font",
    "size",
    "color",
    "image",
  ];
  if (Object.keys(user).length !== 0) {
    if (user) {
      if (user.type === 1 || user.type === 2 || user.type === 3)
        return (
          //returns the announcement form
          <div className="container">
            <form onSubmit={onSubmit}>
              <h1>Add Announcement</h1>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input type="text" name="title" onChange={onChange} />
              </div>
              <div className="form-group">
                <label htmlFor="image">Banner Image</label>
                <input
                  type="file"
                  name="image"
                  onChange={uploadFileHandler}
                  style={{
                    backgroundColor: "white",
                  }}
                />
                {announcement.image && (
                  <div
                    style={{
                      maxHeight: "400px",
                      maxWidth: "400px",
                      margin: "0 auto",
                    }}
                  >
                    <img
                      src={announcement.image}
                      style={{
                        maxHeight: "400px",
                        maxWidth: "400px",
                      }}
                    />
                  </div>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="category">Category</label>
                <select name="category" onChange={onChange}>
                  <option value="On Campus">On Campus</option>
                  <option value="Off Campus">Off Campus</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="visibility">Visibiity</label>
                <select name="visibility" onChange={onChange}>
                  <option value="all">All</option>
                  <option value="specific">Specific</option>
                </select>
              </div>
              {visibility === "specific" && (
                <div>
                  <div className="form-group">
                    <label htmlFor="branch">Branch</label>
                    <input
                      type="text"
                      name="branch"
                      onChange={onVisibilityChange}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="course">Course</label>
                    <input
                      type="text"
                      name="course"
                      onChange={onVisibilityChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="passoutYear">Passout Year</label>
                    <input
                      type="text"
                      name="passoutYear"
                      onChange={onVisibilityChange}
                    />
                  </div>
                </div>
              )}
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                  name="description"
                  rows={3}
                  onChange={onChange}
                  style={{ fontSize: "15px" }}
                />
              </div>
              <div className="form-group">
                <label htmlFor="tags">Tags</label>
                <input type="text" name="tags" onChange={onChange} />
              </div>
              <div className="form-group">
                <label htmlFor="content">Content</label>

                <ReactQuill
                  value={content}
                  onChange={setContent}
                  modules={modules}
                  formats={formats}
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Add Announcement
              </button>
            </form>
          </div>
        );
      else
        return (
          <div className="not-allowed">
            Sorry, you are not allowed to Add Announcements.
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
export default AnnouncementForm;
