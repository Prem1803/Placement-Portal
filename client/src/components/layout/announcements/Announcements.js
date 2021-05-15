import React, { useState, useEffect } from "react";
import AnnouncementCard from "./AnnouncementCard";
import AnnouncementFilter from "./AnnouncementFilter";
import { getAllAnnouncements } from "../../../api/apiAnnouncement";

const Announcements = () => {
  const [AllAnnouncements, setAllAnnouncements] = useState([]); //setting announcement array as an empty array
  const loadAllAnnouncements = () => {
    // Loads the announcements
    getAllAnnouncements()
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
  }, [AllAnnouncements.length]);

  if (filtered !== null)
    return (
      //returns all the filtered announcements with their announcement cards
      <div className="container">
        <h2>Announcements</h2>
        <AnnouncementFilter
          AllAnnouncements={AllAnnouncements}
          loadFiltered={loadFiltered}
        />

        {filtered &&
          filtered.map((announcement) => {
            return (
              <AnnouncementCard
                announcement={announcement}
                key={announcement._id}
              />
            );
          })}
      </div>
    );
  else
    return (
      //returns all the announcements with their announcement cards
      <div className="container">
        <h2>Announcements</h2>
        <AnnouncementFilter
          AllAnnouncements={AllAnnouncements}
          loadFiltered={loadFiltered}
        />

        {AllAnnouncements &&
          AllAnnouncements.map((announcement) => {
            return (
              <AnnouncementCard
                announcement={announcement}
                key={announcement._id}
              />
            );
          })}
      </div>
    );
};

export default Announcements;
