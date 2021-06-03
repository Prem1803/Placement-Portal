//Making call to the backend to get all the blogs
export const getAllBlogs = () => {
  return fetch(`/api/blogs/`, {
    //call is made to backend using axios
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      return response.json(); //resonse is returned
    })
    .catch((err) => console.log(err));
};
//Making call to the backend to get a particular blog
export const getBlogById = (id) => {
  return fetch(`/api/blogs/${id}`, {
    //call is made to backend using axios
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      return response.json(); //resonse is returned
    })
    .catch((err) => console.log(err));
};
//Making call to the backend to delete an blog
export const deleteBlogById = (id, token) => {
  console.log(id);
  return fetch(`/api/blogs/${id}`, {
    //call is made to backend using axios
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "x-auth-token": `${token}`, //passing token into the request header
    },
  })
    .then((response) => {
      return response.json(); //resonse is returned
    })
    .catch((err) => console.log(err));
};
//Making call to the backend to get all the blogs of a user
export const getAllUserBlogs = (userid) => {
  return fetch(`/api/blogs/userBlogs/${userid}`, {
    //call is made to backend using axios
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      return response.json(); //resonse is returned
    })
    .catch((err) => console.log(err));
};
export const getAllAdminBlogs = (userid) => {
  return fetch(`/api/blogs/adminblog`, {
    //call is made to backend using axios
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      return response.json(); //resonse is returned
    })
    .catch((err) => console.log(err));
};
