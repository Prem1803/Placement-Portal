//Making call to the backend to get all the announcements
export const getAllAnnouncements = () => {
  return fetch(`http://localhost:5000/api/announcements/`, {
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

//Making call to the backend to get a particular announcement
export const getAnnouncementById = (id) => {
  return fetch(`http://localhost:5000/api/announcements/${id}`, {
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

//Making call to the backend to delete an announcement
export const deleteAnnouncementById = (id, token) => {
  console.log(id);
  return fetch(`http://localhost:5000/api/announcements/${id}`, {
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
