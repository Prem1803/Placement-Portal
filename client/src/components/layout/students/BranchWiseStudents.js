import React from "react";
import { useLocation, useParams } from "react-router";
import { Link } from "react-router-dom";

const BranchWiseStudents = () => {
  const location = useLocation();
  let branch = useParams().branch.toString();
  let course = useParams().course.toString();
  const Students = location.state;
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
};

export default BranchWiseStudents;
