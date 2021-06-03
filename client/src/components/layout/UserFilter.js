import React, { useRef } from "react";
const UserFilter = ({ AllUsers, loadFiltered }) => {
  //Filters all the users
  const text = useRef("");
  const admin = useRef("");

  const onChange = (e) => {
    if (text.current.value !== "") {
      const filtered = AllUsers.filter((user) => {
        return (
          user.name.toLowerCase().includes(text.current.value.toLowerCase()) ||
          user.rollNo.toString().includes(text.current.value) ||
          user.userid.email
            .toString()
            .toLowerCase()
            .includes(text.current.value.toLowerCase())
        );
      });
      if (admin.current.value !== "") {
        const adminfiltered = filtered.filter((user) => {
          return user.userid.type.toString() === admin.current.value;
        });
        loadFiltered(adminfiltered);
      } else loadFiltered(filtered);
    } else {
      if (admin.current.value !== "") {
        const filtered = AllUsers.filter((user) => {
          return user.userid.type.toString() === admin.current.value;
        });
        loadFiltered(filtered);
      } else loadFiltered(null);
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

      {/* <label>Branch</label> */}
      <select ref={admin} onChange={onChange} style={{ marginBottom: "1rem" }}>
        <option value="">All</option>
        <option value="2">Admin</option>
        <option value="0">Non Admin</option>
      </select>
    </form>
  );
};

export default UserFilter;
