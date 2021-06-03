import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getUser } from "../../../api/apiUser";

const BlogCard = ({ blog }) => {
  const {
    _id,
    image,
    dateCreated,
    tags,
    title,
    description,

    postedBy,
    userid,
  } = blog;
  let date = new Date(dateCreated);
  // const [author, setAuthor] = useState(null); //setting the sutor to null
  // const loadAuthor = () => {
  //   getUser(userid)
  //     .then((data) => {
  //       setAuthor(data.name); //setting the author with the response
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };
  // useEffect(() => {
  //   loadAuthor(); //loads the author of the blog
  // }, [author]);
  return (
    //returns the Blog card
    <div className="blog-card">
      <div className="blog-card-header">
        <img src={require(`../../../uploads/${image}`).default} alt={title} />
      </div>

      <div className="blog-card-body">
        <div className="row">
          {tags.length !== 0 &&
            tags.map((value, index) => {
              if (index < 3)
                return (
                  <span className="tag tag-purple" key={index}>
                    {value}
                  </span>
                );
              else return <span key={index}></span>;
            })}
        </div>
        <h4>
          <Link to={`/blogs/${_id}`}>{title}</Link>
        </h4>
        <p>
          {description}
          <Link
            to={`/blogs/${_id}`}
            className=""
            style={{ display: "block", paddingTop: "1rem" }}
          >
            Read more...
          </Link>{" "}
        </p>

        <div className="user">
          <div className="user-info">
            {postedBy === 1 ? (
              <h4>By Admin</h4>
            ) : (
              <Link to={`users/${userid._id}`}>
                <h4>By {userid.name}</h4>
              </Link>
            )}
            <small>{dateCreated && date.toDateString()}</small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
