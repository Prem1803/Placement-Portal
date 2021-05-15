//Making call to the backend to get a particular user
export const getUser = (id) => {
  return fetch(`http://localhost:5000/api/users/${id}`, {
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
