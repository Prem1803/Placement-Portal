import React, { useState } from "react";
import { useToasts } from "react-toast-notifications";
import axios from "axios";
import { useHistory, useParams } from "react-router";
import Spinner from "./Spinner";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
export const BlogForm = ({ user, userDetails, token }) => {
  const { addToast } = useToasts();
  const userId = useParams().id; //getting user id

  const [blog, setBlog] = useState({}); //setting blog as empty object
  const [content, setContent] = useState("");

  const history = useHistory();

  const onSubmit = async (e) => {
    blog.content = content;
    e.preventDefault();
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": `${token}`, //passing token to the request headers
      },
    };

    let { data } = await axios.post(
      `/api/blogs/`, //making backend call to add a blog
      blog,
      config
    );

    setBlog(JSON.parse(JSON.stringify(data))); //setting blog with the resonse
    addToast("Blog Addded Successfully", {
      appearance: "success",
      autoDismiss: true,
      autoDismissTimeout: 2000,
    });
    //redirecting to the dahboard
    if (userDetails._id) history.push(`/userdashboard/${userDetails._id}`);
    else history.push(`/admindashboard/${user.uid}`);
  };
  const onChange = (e) => {
    //setting blog on change in blog details from the form
    setBlog({ ...blog, [e.target.name]: e.target.value });
  };
  const uploadFileHandler = async (e) => {
    //uploading the blog image
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
      blog.image = data.slice(data.indexOf("image"));
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
  if (user) {
    if (user.uid === userId || user.sid === userId)
      return (
        //returns the blog form
        <div className="container">
          <form onSubmit={onSubmit}>
            <h1>Add Blog</h1>
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
              Add Blog
            </button>
          </form>
        </div>
      );
    else
      return (
        <div className="not-allowed">
          Sorry, you are not allowed to Add Blogs.
        </div>
      );
  } else return <Spinner />;
};
export default BlogForm;
