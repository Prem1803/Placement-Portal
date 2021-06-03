import React, { useState } from "react";
import { useToasts } from "react-toast-notifications";
import axios from "axios";
import { useHistory, useParams } from "react-router";
import Spinner from "./Spinner";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export const AnnouncementForm = ({ user, userDetails, token }) => {
  const { addToast } = useToasts();
  const userId = useParams().id; //getting user id

  const [announcement, setAnnouncement] = useState({ category: "On Campus" }); //setting announcement as empty object
  const [content, setContent] = useState("");
  const history = useHistory();
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
    e.preventDefault();
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
    history.push(`/admindashboard`); //redirecting to the admin dahboard
  };
  const onChange = (e) => {
    //setting announcement on change in announcement details from the form
    setAnnouncement({ ...announcement, [e.target.name]: e.target.value });
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
      announcement.image = data.slice(data.indexOf("image"));
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
      ["link"],
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
  ];
  if (Object.keys(user).length !== 0) {
    if (user) {
      if (user.type === 1 || user.type === 2)
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
              </div>
              <div className="form-group">
                <label htmlFor="category">Category</label>
                <select name="category" onChange={onChange}>
                  <option value="On Campus">On Campus</option>
                  <option value="Off Campus">Off Campus</option>
                </select>
              </div>
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
