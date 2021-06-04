import React, { useRef } from "react";
const AlumniFilterBatches = ({ AllAlumni, loadFiltered }) => {
  //Filter's the Alumni's
  const text = useRef("");
  const onChange = (e) => {
    if (text.current.value !== "") {
      const filtered = AllAlumni.filter((alumni) => {
        return alumni[0].toString().includes(text.current.value.toString());
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
        placeholder="Filter Alumni By Batch..."
        onChange={onChange}
      />
    </form>
  );
};

export default AlumniFilterBatches;
