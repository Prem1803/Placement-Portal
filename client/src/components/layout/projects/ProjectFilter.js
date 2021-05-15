import React, { useRef } from "react";
const ProjectFilter = ({ AllProjects, loadFiltered }) => {
  //Filters the Projects
  const text = useRef("");

  const onChange = (e) => {
    if (text.current.value !== "") {
      const filtered = AllProjects.filter((project) => {
        return project.name
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
        placeholder="Search Projects..."
        onChange={onChange}
      />
    </form>
  );
};

export default ProjectFilter;
