//Making call to the backend to get all the alumni's
export const getAllAlumni = () => {
  return fetch(`/api/users/allAlumni`, {
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
