import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import { deleteBlogById } from "../../../api/apiBlog";

const UserBlogCard = ({ blog, userDetails, token, user }) => {
  const { _id, image, tags, title, description } = blog; //extracting blog details
  const { addToast } = useToasts();
  const history = useHistory();
  const deleteBlog = () => {
    deleteBlogById(_id, token) //deleting blog
      .then((data) => {
        addToast("Blog Deleted", {
          appearance: "success",
          autoDismiss: true,
          autoDismissTimeout: 2000,
        });
        //redirection after deleting blog
        history.push(`/`);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const editBlog = () => {
    //redirets to edit blog page
    if (userDetails._id) history.push(`/blogs/${_id}/edit`);
    else history.push(`/blogs/${_id}/edit`);
  };

  return (
    //returns the blog car
    <div className="blog-card">
      <div className="blog-card-header">
        <img src={image} alt={title} />
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
            style={{ display: "block", paddingTop: "1rem" }}
          >
            Read more...
          </Link>{" "}
        </p>

        <div className="user">
          <div className="row">
            <span>
              <button className="tag tag-purple " onClick={editBlog}>
                <i className="fas fa-edit"></i> Edit
              </button>
            </span>
            {(user.type === 0 ||
              user.type === 1 ||
              (user.type === 2 && blog.postedBy === 0) ||
              (user.type === 3 && blog.postedBy === 0)) && (
              <span>
                <button className="tag tag-purple" onClick={deleteBlog}>
                  <i className="fas fa-trash"></i> Delete
                </button>
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserBlogCard;
