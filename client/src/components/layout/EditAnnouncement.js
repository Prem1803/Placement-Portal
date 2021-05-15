import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { useToasts } from "react-toast-notifications";
import { getAnnouncementById } from "../../api/apiAnnouncement";
import Spinner from "./Spinner";
const EditAnnouncement = ({ token, user }) => {
  const [announcement, setAnnouncement] = useState({}); //setting announcement as empty object
  const announcementId = useParams().bid; //getting announcement id
  const [tags, setTags] = useState(null); //setting tags as null
  const userId = useParams().id; //getting user id

  const loadAnnouncement = () => {
    //loading announcement
    getAnnouncementById(announcementId)
      .then((data) => {
        setAnnouncement(data); //setting announcement with the response
        setTags(data.tags.join()); //setting tags
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    loadAnnouncement(); //loading announcement
  }, []);
  const history = useHistory();
  const { addToast } = useToasts();

  const onSubmit = async (e) => {
    e.preventDefault();
    announcement.tags = tags;
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": `${token}`, //passing token to the request headers
      },
    };

    let { data } = await axios.put(
      `/api/announcements/${announcementId}`, //making backend call to Edit a announcement
      announcement,
      config
    );
    setAnnouncement(data);
    addToast("Announcement Updated Successfully", {
      appearance: "success",
      autoDismiss: true,
      autoDismissTimeout: 2000,
    });
    //redirecting to the home page
    history.push(`/`);
  };
  const onChange = (e) => {
    //setting announcement on change in announcement details from the form
    setAnnouncement({ ...announcement, [e.target.name]: e.target.value });
  };
  const onTagChange = (e) => {
    //setting tags on change in tags from the form
    setTags(e.target.value);
  };
  const uploadFileHandler = async (e) => {
    //uploading the announcement image
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
  if (user.uid) {
    if (user.type === 1 && user.uid === userId)
      return (
        //returns the announcement form
        <div className="container">
          <form onSubmit={onSubmit}>
            <h1>Edit Announcement</h1>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                name="title"
                value={announcement.title ? announcement.title : ""}
                onChange={onChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="image">Image</label>
              <input
                type="file"
                name="image"
                onChange={uploadFileHandler}
                {...announcement.image}
                style={{
                  backgroundColor: "white",
                }}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                name="description"
                value={announcement.description ? announcement.description : ""}
                onChange={onChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="tags">Tags</label>
              <input
                type="text"
                name="tags"
                value={
                  announcement.tags && announcement.tags.length !== 0
                    ? tags
                    : ""
                }
                onChange={onTagChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="content">Content</label>
              <textarea
                name="content"
                rows={15}
                onChange={onChange}
                style={{ fontSize: "1.4rem" }}
                value={announcement.content ? announcement.content : ""}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Save Changes
            </button>
          </form>
        </div>
      );
    else
      return (
        <div className="not-allowed">
          Sorry, you are not allowed to Edit this announcement.
        </div>
      );
  } else return <Spinner />;
};

export default EditAnnouncement;
