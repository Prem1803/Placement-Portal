import React, { useState, useEffect } from "react";
import AnnouncementCard from "./AnnouncementCard";
import AnnouncementFilter from "./AnnouncementFilter";
import { getAllOffCampusAnnouncements } from "../../../api/apiAnnouncement";
const OffCampusAnnouncements = ({ user, userDetails }) => {
  const [AllAnnouncements, setAllAnnouncements] = useState([]); //setting announcement array as an empty array
  const loadAllAnnouncements = () => {
    // Loads the announcements
    getAllOffCampusAnnouncements()
      .then((data) => {
        setAllAnnouncements(data.announcement); //setting the announments with the response from the backend
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const [filtered, setFiltered] = useState(null);
  const loadFiltered = (filtered) => {
    setFiltered(filtered); //filtering the announcements
  };
  useEffect(() => {
    loadAllAnnouncements(); //loading the announcements
  }, []);
  if (Object.keys(user).length !== 0) {
    if (filtered !== null)
      return (
        //returns all the filtered announcements with their announcement cards
        <div className="container">
          <h2>Off Campus Announcements</h2>
          <AnnouncementFilter
            AllAnnouncements={AllAnnouncements}
            loadFiltered={loadFiltered}
          />

          {filtered &&
            filtered.map((announcement) => {
              if (announcement.visibility !== undefined) {
                if (user.type === 1)
                  return (
                    <AnnouncementCard
                      announcement={announcement}
                      key={announcement._id}
                    />
                  );
                else {
                  if (
                    announcement.visibility.branch
                      .toUpperCase()
                      .includes(userDetails.branch.toUpperCase()) &&
                    announcement.visibility.course
                      .toUpperCase()
                      .includes(userDetails.course.toUpperCase()) &&
                    announcement.visibility.passoutYear.includes(
                      userDetails.passoutYear
                    )
                  )
                    return (
                      <AnnouncementCard
                        announcement={announcement}
                        key={announcement._id}
                      />
                    );
                  else return false;
                }
              } else {
                return (
                  <AnnouncementCard
                    announcement={announcement}
                    key={announcement._id}
                  />
                );
              }
            })}
        </div>
      );
    else
      return (
        //returns all the announcements with their announcement cards
        <div className="container">
          <h2>Off Campus Announcements</h2>
          <AnnouncementFilter
            AllAnnouncements={AllAnnouncements}
            loadFiltered={loadFiltered}
          />

          {AllAnnouncements &&
            AllAnnouncements.map((announcement) => {
              if (announcement.visibility !== undefined) {
                if (user.type === 1)
                  return (
                    <AnnouncementCard
                      announcement={announcement}
                      key={announcement._id}
                    />
                  );
                else {
                  if (
                    announcement.visibility.branch
                      .toUpperCase()
                      .includes(userDetails.branch.toUpperCase()) &&
                    announcement.visibility.course
                      .toUpperCase()
                      .includes(userDetails.course.toUpperCase()) &&
                    announcement.visibility.passoutYear.includes(
                      userDetails.passoutYear
                    )
                  )
                    return (
                      <AnnouncementCard
                        announcement={announcement}
                        key={announcement._id}
                      />
                    );
                  else return false;
                }
              } else {
                return (
                  <AnnouncementCard
                    announcement={announcement}
                    key={announcement._id}
                  />
                );
              }
            })}
        </div>
      );
  } else
    return (
      <div className="not-allowed">
        Sorry, you are not Logged In .Kindly Login In to access this page.
      </div>
    );
};

export default OffCampusAnnouncements;
