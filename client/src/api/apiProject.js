//Making call to the backend to get all the projects
export const getAllProjects = () => {
  return fetch(`http://localhost:5000/api/projects/`, {
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
//Making call to the backend to get a particular project
export const getProjectById = (id) => {
  console.log(id);
  return fetch(`http://localhost:5000/api/projects/${id}`, {
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
//Making call to the backend to delete an project
export const deleteProjectById = (id, token) => {
  console.log(id);
  return fetch(`http://localhost:5000/api/projects/${id}`, {
    //call is made to backend using axios
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "x-auth-token": `${token}`,
    },
  })
    .then((response) => {
      return response.json(); //resonse is returned
    })
    .catch((err) => console.log(err));
};
//Making call to the backend to get all the projects of a user
export const getAllStudentProjects = (studentid) => {
  return fetch(
    `http://localhost:5000/api/projects/studentProjects/${studentid}`, //call is made to backend using axios
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  )
    .then((response) => {
      return response.json(); //resonse is returned
    })
    .catch((err) => console.log(err));
};
