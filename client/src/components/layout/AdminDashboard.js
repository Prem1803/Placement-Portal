import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router";
import { getAllAnnouncements } from "../../api/apiAnnouncement";
import UserAnnouncementCard from "./announcements/UserAnnouncementCard";
import UserBlogCard from "./blogs/UserBlogCard";
import { getAllUserBlogs } from "../../api/apiBlog";
import Spinner from "./Spinner";
import { Link } from "react-router-dom";

const AdminDashboard = ({ props, user, userDetails, token }) => {
  const userid = useParams().id; //getting the user id
  const [AllAnnouncements, setAllAnnouncements] = useState([]); //setting the announcements as an empty array
  const loadAllAnnouncements = () => {
    // Get the information from the database
    getAllAnnouncements()
      .then((data) => {
        setAllAnnouncements(data.announcement); //setting the announcements with the response
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    loadAllAnnouncements(); //loading all the announcements
  }, [AllAnnouncements.length]);
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
  const addAnnouncement = () => {
    //adding announcements
    history.push(`/users/${user.uid}/addAnnouncement`); //redirects to the add announcement page
  };

  if (user.uid) {
    if (userid === user.uid)
      //if the logged in user is an admin
      return (
        <div className="admincontainer adminpanel">
          <Link to={`/admindashboard/${user.uid}/announcements`}>
            <div className="announcementpanelcard" />
            Announcements
          </Link>

          <Link to={`/admindashboard/${user.uid}/blogs`}>
            <div className="blogpanelcard" />
            Blogs
          </Link>

          <Link to={`/admindashboard/${user.uid}/management`}>
            <div className="managementpanelcard" />
            Management
          </Link>
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

export default AdminDashboard;
