import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router";
import UserBlogCard from "./blogs/UserBlogCard";
import { getAllUserBlogs } from "../../api/apiBlog";
import Spinner from "./Spinner";

const AdminBlogs = ({ props, user, userDetails, token }) => {
  const userid = useParams().id; //getting the user id

  const [blogs, setBlogs] = useState([]); //setting blogs array as an empty array
  const loadBlogs = () => {
    if (user.uid !== undefined)
      getAllUserBlogs(user.uid)
        .then((data) => {
          setBlogs(data.blogs); //setting blogs array with the response
        })
        .catch((err) => {
          console.log(err);
        });
  };
  useEffect(() => {
    loadBlogs(); //loading all the blogs
  }, [blogs.length, user.uid]);
  const history = useHistory();
  const addBlog = () => {
    //adding blogs
    history.push(`/users/${user.uid}/addBlog`); //redirects to the add blog page
  };

  if (user.uid) {
    if (userid === user.uid)
      //if the logged in user is an admin
      return (
        <div className="container">
          <div>
            <h2
              style={{
                textAlign: "left",
                paddingTop: "1rem",
                paddingBottom: "1rem",
              }}
            >
              <i className="fab fa-blogger"></i> Blogs
              <button
                onClick={addBlog}
                className="btn btn-dark"
                style={{ float: "right" }}
              >
                Add Blog
              </button>
            </h2>
            <div className="row">
              {blogs &&
                blogs.map((blog) => {
                  return (
                    <UserBlogCard
                      blog={blog}
                      key={blog._id}
                      userDetails={userDetails}
                      token={token}
                      user={user}
                    />
                  );
                })}
            </div>
          </div>
        </div>
      );
    else
      return (
        <div className="not-allowed">
          Sorry, you are not allowed to access this page.
        </div>
      );
  } else return <Spinner />;
};

export default AdminBlogs;
