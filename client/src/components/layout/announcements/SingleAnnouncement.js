import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getAnnouncementById } from "../../../api/apiAnnouncement";
import Spinner from "../Spinner";

const SingleAnnouncement = ({ user, userDetails }) => {
  const [announcement, setAnnouncement] = useState({}); //setting the announcement to empty object
  const announcementId = useParams().id; //getting the announcement id
  const loadAnnouncement = () => {
    //loading the announcement
    if (announcementId)
      getAnnouncementById(announcementId)
        .then((data) => {
          setAnnouncement(data); //setting the announcement with the response from the backend
        })
        .catch((err) => {
          console.log(err);
        });
  };
  useEffect(() => {
    loadAnnouncement(); //loading the announcemnt
  }, []);
  const { title, tags, content, image } = announcement; //extracting the announcement details
  if (Object.keys(user).length !== 0) {
    if (announcement.image) {
      console.log(announcement.visibility);
      if (
        (announcement.visibility &&
          ((user.type !== 1 &&
            announcement.visibility.branch
              .toUpperCase()
              .includes(userDetails.branch.toUpperCase()) &&
            announcement.visibility.course
              .toUpperCase()
              .includes(userDetails.course.toUpperCase()) &&
            announcement.visibility.passoutYear.includes(
              userDetails.passoutYear
            )) ||
            user.type === 1)) ||
        announcement.visibility === undefined
      )
        return (
          //returns the single announcement component
          <div className="container">
            <h1
              style={{
                textAlign: "center",
                color: "#25467a",
                marginTop: "1rem",
                marginBottom: "1rem",
              }}
            >
              <i className="fas fa-bullhorn"></i> Announcement !!
            </h1>
            <div
              style={{
                height: "350px",
                display: "flex",
              }}
            >
              <img
                src={require(`../../../uploads/${image}`).default}
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
                textAlign: "justify",
              }}
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </div>
        );
      else
        return (
          <div className="not-allowed">
            Sorry, you are not allowed to access this announcement.
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

export default SingleAnnouncement;
