import React, { useRef } from "react";
const BlogFilter = ({ AllBlogs, loadFiltered }) => {
  //Filters the blogs
  const text = useRef("");

  const onChange = (e) => {
    if (text.current.value !== "") {
      const filtered = AllBlogs.filter((blog) => {
        return blog.title
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
        placeholder="Search Blogs..."
        onChange={onChange}
      />
    </form>
  );
};

export default BlogFilter;
