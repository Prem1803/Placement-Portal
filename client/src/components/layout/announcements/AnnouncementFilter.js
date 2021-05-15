import React, { useRef } from "react";
const AnnouncementFilter = ({ AllAnnouncements, loadFiltered }) => {
  //Filtering the Announcements
  const text = useRef("");

  const onChange = (e) => {
    if (text.current.value !== "") {
      const filtered = AllAnnouncements.filter((announcement) => {
        return announcement.title
          .toLowerCase()
          .includes(text.current.value.toLowerCase());
      });
      loadFiltered(filtered);
    } else {
      loadFiltered(null);
    }
  };
  return (
    <form>
      <input
        ref={text}
        type="text"
        placeholder="Search Announcements..."
        onChange={onChange}
      />
    </form>
  );
};

export default AnnouncementFilter;
