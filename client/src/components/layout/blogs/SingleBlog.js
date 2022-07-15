import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getBlogById } from "../../../api/apiBlog";
import Spinner from "../Spinner";
const SingleBlog = ({ user }) => {
  const [blog, setBlog] = useState({}); //setting blog to empty object
  const blogId = useParams().id; //getting blog id
  const loadBlog = () => {
    if (blogId)
      getBlogById(blogId)
        .then((data) => {
          setBlog(data); //setting the blog with the response
        })
        .catch((err) => {
          console.log(err);
        });
  };
  useEffect(() => {
    loadBlog(); //loading the blog
  }, []);
  const { title, tags, content, image } = blog; //extracting the blog details
  if (Object.keys(user).length !== 0) {
    if (blog.image)
      return (
        //returns the single blog component
        <div className="container">
          <h1
            style={{
              textAlign: "center",
              color: "#25467a",
              marginTop: "1rem",
              marginBottom: "1rem",
            }}
          >
            <i className="fab fa-blogger"></i> Blog !!
          </h1>
          <div
            style={{
              height: "350px",
              display: "flex",
            }}
          >
            <img
              src={image}
              style={{
                margin: "0 auto",
                height: "100%",
                maxWidth: "70%",
                borderRadius: "1rem",
              }}
              alt={title}
            />
          </div>

          <div
            style={{
              borderRadius: "1rem",
              marginTop: "1rem",
            }}
          >
            <h1 style={{ textAlign: "center" }}>{title}</h1>
            {tags &&
              tags.map((tag) => {
                return (
                  <i
                    className="fas fa-tags"
                    style={{
                      marginRight: "1rem",
                      marginTop: "1rem",
                      float: "right",
                      textAlign: "center",
                    }}
                  >
                    {tag}
                  </i>
                );
              })}
          </div>
          <div
            style={{
              borderRadius: "1rem",
              marginTop: "2rem",
              paddingTop: "1rem",
              textAlign: "justify",
            }}
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>
      );
    else return <Spinner />;
  } else
    return (
      <div className="not-allowed">
        Sorry, you are not Logged In .Kindly Login In to access this page.
      </div>
    );
};

export default SingleBlog;
