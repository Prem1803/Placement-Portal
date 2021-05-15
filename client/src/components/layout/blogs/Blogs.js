import React, { useState, useEffect } from "react";
import BlogCard from "./BlogCard";
import BlogFilter from "./BlogFilter";
import { getAllBlogs } from "../../../api/apiBlog";

const Blogs = () => {
  const [AllBlogs, setAllBlogs] = useState([]); //setting the blogs to null
  const loadAllBlogs = () => {
    // Get the information from the database
    getAllBlogs()
      .then((data) => {
        setAllBlogs(data.blog); //setting the blogs with the response
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const [filtered, setFiltered] = useState(null);
  const loadFiltered = (filtered) => {
    setFiltered(filtered); //filtering the blogs
  };
  useEffect(() => {
    loadAllBlogs(); //loading the blogs
  }, [AllBlogs.length]);
  if (filtered !== null) {
    return (
      //returns all the filtered blogs with individual blog card
      <div className="container">
        <h2>Blogs</h2>
        <BlogFilter AllBlogs={AllBlogs} loadFiltered={loadFiltered} />
        <div className="row blog-container">
          {filtered &&
            filtered.map((blog) => {
              return <BlogCard blog={blog} key={blog._id} />;
            })}
        </div>
      </div>
    );
  } else
    return (
      //returns all the blogs with individual blog card
      <div className="container">
        <h2>Blogs</h2>
        <BlogFilter AllBlogs={AllBlogs} loadFiltered={loadFiltered} />
        <div className="row blog-container">
          {AllBlogs &&
            AllBlogs.map((blog) => {
              return <BlogCard blog={blog} key={blog._id} />;
            })}
        </div>
      </div>
    );
};

export default Blogs;
