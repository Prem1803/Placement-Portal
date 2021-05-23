import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router";
import { getAllAnnouncements } from "../../api/apiAnnouncement";
import UserAnnouncementCard from "./announcements/UserAnnouncementCard";

import Spinner from "./Spinner";

const AdminAnnouncements = ({ props, user, userDetails, token }) => {
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

  const history = useHistory();

  const addAnnouncement = () => {
    //adding announcements
    history.push(`/users/${user.uid}/addAnnouncement`); //redirects to the add announcement page
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
              <i className="fas fa-project-diagram"></i> Announcements
              <button
                onClick={addAnnouncement}
                className="btn btn-dark"
                style={{ float: "right" }}
              >
                Add Announcement
              </button>
            </h2>
            <div className="project-row">
              {AllAnnouncements &&
                AllAnnouncements.map((announcement) => {
                  return (
                    <UserAnnouncementCard
                      announcement={announcement}
                      key={announcement._id}
                      user={user}
                      token={token}
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

export default AdminAnnouncements;