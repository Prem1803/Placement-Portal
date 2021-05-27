import React, { useRef } from "react";
const StudentFilter = ({ AllStudents, loadFiltered }) => {
  //Filters all the students
  const text = useRef("");

  const onChange = (e) => {
    if (text.current.value !== "") {
      const filtered = AllStudents.filter((student) => {
        return (
          student.name
            .toLowerCase()
            .includes(text.current.value.toLowerCase()) ||
          student.branch
            .toLowerCase()
            .includes(text.current.value.toLowerCase()) ||
          student.batch
            .toLowerCase()
            .includes(text.current.value.toLowerCase()) ||
          student.year
            .toLowerCase()
            .includes(text.current.value.toLowerCase()) ||
          (student.cgpa &&
            student.cgpa
              .toLowerCase()
              .includes(text.current.value.toLowerCase()))
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
        placeholder="Search Students..."
        onChange={onChange}
      />
    </form>
  );
};

export default StudentFilter;
