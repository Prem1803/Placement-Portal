import React from "react";
import { useLocation, useParams } from "react-router";
import { Link } from "react-router-dom";

const BranchWiseStudents = ({ user }) => {
  const location = useLocation();
  let branch = useParams().branch.toString();
  let course = useParams().course.toString();
  const Students = location.state;
  if (Object.keys(user).length !== 0)
    return (
      <div className="studentcontainer studentpanel">
        {Students &&
          Students.map((student) => {
            return (
              <Link
                to={{
                  pathname: `/students/${course}/${branch}/${student[0]}`,
                  state: student[1],
                }}
              >
                <div className="studentspanelcard" />
                Batch of {student[0]}
              </Link>
            );
          })}
      </div>
    );
  else
    return (
      <div className="not-allowed">
        Sorry, you are not Logged In .Kindly Login In to access this page.
      </div>
    );
};

export default BranchWiseStudents;
