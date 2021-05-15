//Making call to the backend to get all the student's
export const getAllStudents = () => {
  return fetch(`http://localhost:5000/api/users/allStudents`, {
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
