import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { useToasts } from "react-toast-notifications";
import { getBlogById } from "../../api/apiBlog";
import Spinner from "./Spinner";
const EditBlog = ({ token, userDetails }) => {
  const [blog, setBlog] = useState({}); //setting blog as empty object
  const blogId = useParams().bid; //getting blog id
  const userId = useParams().id; //getting user id
  const [tags, setTags] = useState(null); //setting tags as null

  const loadBlog = () => {
    //loading blog
    getBlogById(blogId)
      .then((data) => {
        setBlog(data); //setting blog with the response
        setTags(data.tags.join()); //setting tags
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    loadBlog(); //loading blog
  }, blog._id);
  const history = useHistory();
  const { addToast } = useToasts();

  const onSubmit = async (e) => {
    e.preventDefault();
    blog.tags = tags;
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": `${token}`, //passing token to the request headers
      },
    };

    let { data } = await axios.put(
      `/api/blogs/${blogId}`, //making backend call to Edit a blog
      blog,
      config
    );

    addToast("Blog Updated Successfully", {
      appearance: "success",
      autoDismiss: true,
      autoDismissTimeout: 2000,
    });
    //redirecting to the home page
    if (userDetails.name) history.push(`/userdashboard/${userDetails._id}`);
    else history.push(`/`);
  };
  const onChange = (e) => {
    //setting blog on change in blog details from the form
    setBlog({ ...blog, [e.target.name]: e.target.value });
  };
  const onTagChange = (e) => {
    //setting tags on change in tags from the form
    setTags(e.target.value);
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
  if (blog.userid) {
    if (blog.userid === userId && blog.userid === userDetails._id)
      return (
        //returns the blog form
        <div className="container">
          <form onSubmit={onSubmit}>
            <h1>Edit Blog</h1>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                name="title"
                value={blog.title ? blog.title : ""}
                onChange={onChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="image">Image</label>
              <input
                type="file"
                name="image"
                onChange={uploadFileHandler}
                {...blog.image}
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
                value={blog.description ? blog.description : ""}
                onChange={onChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="tags">Tags</label>
              <input
                type="text"
                name="tags"
                value={blog.tags && blog.tags.length !== 0 ? tags : ""}
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
                value={blog.content ? blog.content : ""}
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
          Sorry, you are not allowed to Edit this Blog.
        </div>
      );
  } else return <Spinner />;
};

export default EditBlog;
