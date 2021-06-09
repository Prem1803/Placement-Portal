import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { useToasts } from "react-toast-notifications";
import { getBlogById } from "../../api/apiBlog";
import Spinner from "./Spinner";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
const EditBlog = ({ token, user, userDetails }) => {
  const [blog, setBlog] = useState({}); //setting blog as empty object
  const blogId = useParams().bid; //getting blog id
  const [tags, setTags] = useState(null); //setting tags as null
  const [content, setContent] = useState("");

  useEffect(() => {
    const loadBlog = () => {
      //loading blog
      getBlogById(blogId)
        .then((data) => {
          setBlog(data); //setting blog with the response
          setTags(data.tags.join()); //setting tags
          setContent(data.content);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    loadBlog(); //loading blog
  }, []);
  const history = useHistory();
  const { addToast } = useToasts();

  const onSubmit = async (e) => {
    e.preventDefault();
    blog.tags = tags;
    blog.content = content;
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": `${token}`, //passing token to the request headers
      },
    };

    await axios.put(
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
    history.push(`/`);
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
    if (blog.title) {
      if (blog.userid === user.sid || blog.userid === user.uid)
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
                <label htmlFor="image">Banner Image</label>
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
                <textarea
                  name="description"
                  rows={3}
                  onChange={onChange}
                  style={{ fontSize: "15px" }}
                  value={blog.description ? blog.description : ""}
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
                <ReactQuill
                  value={content}
                  onChange={setContent}
                  modules={modules}
                  formats={formats}
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
            {console.log(user)}
            {console.log(blog)}
            {console.log(userDetails)}
            Sorry, you are not allowed to Edit this Blog.
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

export default EditBlog;
