import React, { useRef } from "react";
const AlumniFilter = ({ AllAlumni, loadFiltered }) => {
  //Filter's the Alumni's
  const text = useRef("");
  const onChange = (e) => {
    if (text.current.value !== "") {
      const filtered = AllAlumni.filter((alumni) => {
        return (
          alumni.name
            .toLowerCase()
            .includes(text.current.value.toLowerCase()) ||
          alumni.course
            .toLowerCase()
            .includes(text.current.value.toLowerCase()) ||
          alumni.branch
            .toLowerCase()
            .includes(text.current.value.toLowerCase()) ||
          alumni.passoutYear
            .toLowerCase()
            .includes(text.current.value.toLowerCase())
        );
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
        placeholder="Search Alumni..."
        onChange={onChange}
      />
    </form>
  );
};

export default AlumniFilter;
