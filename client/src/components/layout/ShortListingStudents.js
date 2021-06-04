import React, { useEffect, useState } from "react";

import { useParams } from "react-router";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import { getAllStudents } from "../../api/apiStudent";
import Spinner from "./Spinner";

const ShortListingStudents = ({ user }) => {
  const userid = useParams().id; //getting the user id

  const [filters, setFilters] = useState({
    course: "",
    passoutYear: "",
    cgpa: "",
    branch: "",
  });
  const onChange = async (e) => {
    //sets the user on change on the user details

    await setFilters({ ...filters, [e.target.name]: e.target.value });
  };
  const [students, setStudents] = useState([]); //setting the students array as an empty array
  const loadStudents = () => {
    getAllStudents()
      .then((data) => {
        setStudents(data.students); //setting the students array with the response
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const [filtered, setFiltered] = useState(null);
  const loadFiltered = async () => {
    var filteredStudents = await students.filter((student) => {
      return (
        // (student.branch
        //   .toLowerCase()
        //   .includes(text.current.value.toLowerCase()))
        (filters.course !== "" &&
          student.course
            .toLowerCase()
            .includes(filters.course.toLowerCase())) ||
        filters.course === ""
      );
    });
    console.log(filteredStudents);
    filteredStudents = await filteredStudents.filter((student) => {
      return (
        (filters.branch !== "" &&
          student.branch
            .toLowerCase()
            .includes(filters.branch.toLowerCase())) ||
        filters.branch === ""
      );
    });
    filteredStudents = await filteredStudents.filter((student) => {
      return (
        (filters.passoutYear !== "" &&
          student.passoutYear.toLowerCase().includes(filters.passoutYear)) ||
        filters.passoutYear === ""
      );
    });
    filteredStudents = await filteredStudents.filter((student) => {
      return (
        (Number(filters.cgpa) !== NaN &&
          Number(student.cgpa) >= Number(filters.cgpa)) ||
        filters.cgpa === ""
      );
    });
    setFiltered(filteredStudents); //filtering the students
  };
  useEffect(() => {
    loadStudents(); //loading students
  }, []);
  if (Object.keys(user).length !== 0) {
    if (user.uid) {
      if (user.type === 1) {
        if (filtered !== null)
          return (
            <div className="container">
              <div className="student-filter">
                <div className="student-filter-option">
                  <label>Branch</label>
                  <select
                    name="branch"
                    value={filters.branch}
                    onChange={onChange}
                  >
                    <option value="">All</option>
                    <option value="CSE">CSE</option>
                    <option value="ECE">ECE</option>
                    <option value="EEE">EEE</option>
                    <option value="ME">ME</option>
                    <option value="AS">AS</option>
                  </select>
                </div>
                <div className="student-filter-option">
                  <label>Course</label>

                  <select
                    name="course"
                    value={filters.course}
                    onChange={onChange}
                  >
                    <option value="">All</option>
                    <option value="BTech">BTech</option>
                    <option value="MTech">MTech</option>
                    <option value="PhD">PhD</option>
                  </select>
                </div>
                <div className="student-filter-option">
                  <label>Passout Year</label>

                  <input
                    name="passoutYear"
                    value={filters.passoutYear}
                    onChange={onChange}
                    type="text"
                    placeholder="For ex 2021"
                  ></input>
                </div>
                <div className="student-filter-option">
                  <label>CGPA</label>

                  <select name="cgpa" value={filters.cgpa} onChange={onChange}>
                    <option value="">All</option>
                    <option value="6">6 and Above</option>
                    <option value="6.5">6.5 and Above</option>
                    <option value="7">7 and Above</option>
                    <option value="7.5">7.5 and Above</option>
                    <option value="8">8 and Above</option>
                    <option value="8.5">8.5 and Above</option>
                  </select>
                </div>
                <div
                  className="student-filter-option"
                  style={{ marginTop: "1.4rem", marginBottom: "0.5rem" }}
                >
                  <button
                    value=""
                    className="btn btn-danger"
                    onClick={loadFiltered}
                  >
                    Filter Students
                  </button>
                </div>
                <div
                  className="student-filter-option"
                  style={{ marginTop: "1.4rem", marginBottom: "0.5rem" }}
                >
                  {/* <button value="" className="btn btn-primary">
                  Export to CSV
                </button> */}
                  <ReactHTMLTableToExcel
                    id="test-table-xls-button"
                    className="download-table-xls-button btn btn-primary"
                    table="table-to-xls"
                    filename="Students"
                    sheet="Students"
                    buttonText="Download as XLS"
                  />
                </div>
              </div>

              <div
                className="student-table-container"
                style={{ overflowX: "auto" }}
              >
                <table className="student-table" id="table-to-xls">
                  <tr>
                    <td>Name</td>
                    <td>Roll No</td>
                    <td>Course</td>
                    <td>Branch</td>
                    <td>Passout Year</td>
                    <td>CGPA</td>
                    <td style={{ display: "none" }}>Contact Email</td>
                    <td style={{ display: "none" }}>Date of Birth</td>
                    <td style={{ display: "none" }}>Gender</td>
                    <td style={{ display: "none" }}>Mobile No</td>
                    <td style={{ display: "none" }}>Nationality</td>
                    <td style={{ display: "none" }}>Address</td>
                    <td style={{ display: "none" }}>10th Board</td>
                    <td style={{ display: "none" }}>10th Passing Year</td>
                    <td style={{ display: "none" }}>10th Percentage/CGPA</td>
                    <td style={{ display: "none" }}>12th Board</td>
                    <td style={{ display: "none" }}>12th Passing Year</td>
                    <td style={{ display: "none" }}>12th Percentage</td>
                    <td style={{ display: "none" }}>Resume</td>
                  </tr>

                  {filtered &&
                    filtered.map((student) => {
                      return (
                        <tr>
                          <td>{student.name}</td>
                          <td>{student.rollNo}</td>
                          <td>{student.course}</td>
                          <td>{student.branch}</td>
                          <td>{student.passoutYear}</td>
                          <td>{student.cgpa}</td>
                          <td style={{ display: "none" }}>
                            {student.contactEmail}
                          </td>
                          <td style={{ display: "none" }}>{student.dob}</td>
                          <td style={{ display: "none" }}>{student.gender}</td>
                          <td style={{ display: "none" }}>
                            {student.mobileNo}
                          </td>
                          <td style={{ display: "none" }}>
                            {student.nationality}
                          </td>
                          <td style={{ display: "none" }}>{student.address}</td>
                          <td style={{ display: "none" }}>
                            {student.board10th}
                          </td>
                          <td style={{ display: "none" }}>
                            {student.passingYear10th}
                          </td>
                          <td style={{ display: "none" }}>
                            {student.percentage10th}
                          </td>
                          <td style={{ display: "none" }}>
                            {student.board12th}
                          </td>
                          <td style={{ display: "none" }}>
                            {student.passingYear12th}
                          </td>
                          <td style={{ display: "none" }}>
                            {student.percentage12th}
                          </td>
                          <td style={{ display: "none" }}>
                            {student.resumeUrl}
                          </td>
                        </tr>
                      );
                    })}
                </table>
              </div>
            </div>
          );
        else
          return (
            <div className="container">
              <div className="student-filter">
                <div className="student-filter-option">
                  <label>Branch</label>
                  <select
                    name="branch"
                    value={filters.branch}
                    onChange={onChange}
                  >
                    <option value="">All</option>
                    <option value="CSE">CSE</option>
                    <option value="ECE">ECE</option>
                    <option value="EEE">EEE</option>
                    <option value="ME">ME</option>
                    <option value="AS">AS</option>
                  </select>
                </div>
                <div className="student-filter-option">
                  <label>Course</label>

                  <select
                    name="course"
                    value={filters.course}
                    onChange={onChange}
                  >
                    <option value="">All</option>
                    <option value="BTech">BTech</option>
                    <option value="MTech">MTech</option>
                    <option value="PhD">PhD</option>
                  </select>
                </div>
                <div className="student-filter-option">
                  <label>Passout Year</label>

                  <input
                    name="passoutYear"
                    value={filters.passoutYear}
                    onChange={onChange}
                    type="text"
                    placeholder="For ex 2021"
                  ></input>
                </div>
                <div className="student-filter-option">
                  <label>CGPA</label>

                  <select name="cgpa" value={filters.cgpa} onChange={onChange}>
                    <option value="">All</option>
                    <option value="6">6 and Above</option>
                    <option value="6.5">6.5 and Above</option>
                    <option value="7">7 and Above</option>
                    <option value="7.5">7.5 and Above</option>
                    <option value="8">8 and Above</option>
                    <option value="8.5">8.5 and Above</option>
                  </select>
                </div>
                <div
                  className="student-filter-option"
                  style={{ marginTop: "1.4rem", marginBottom: "0.5rem" }}
                >
                  <button
                    value=""
                    className="btn btn-danger"
                    onClick={loadFiltered}
                  >
                    Filter Students
                  </button>
                </div>
                <div
                  className="student-filter-option"
                  style={{ marginTop: "1.4rem", marginBottom: "0.5rem" }}
                >
                  {/* <button value="" className="btn btn-primary">
                  Export to CSV
                </button> */}
                  <ReactHTMLTableToExcel
                    id="test-table-xls-button"
                    className="download-table-xls-button btn btn-primary"
                    table="table-to-xls"
                    filename="Students"
                    sheet="Students"
                    buttonText="Download as XLS"
                  />
                </div>
              </div>

              <div
                className="student-table-container"
                style={{ overflowX: "auto" }}
              >
                <table className="student-table" id="table-to-xls">
                  <tr>
                    <td>Name</td>
                    <td>Roll No</td>
                    <td>Course</td>
                    <td>Branch</td>
                    <td>Passout Year</td>
                    <td>CGPA</td>
                    <td style={{ display: "none" }}>Contact Email</td>
                    <td style={{ display: "none" }}>Date of Birth</td>
                    <td style={{ display: "none" }}>Gender</td>
                    <td style={{ display: "none" }}>Mobile No</td>
                    <td style={{ display: "none" }}>Nationality</td>
                    <td style={{ display: "none" }}>Address</td>
                    <td style={{ display: "none" }}>10th Board</td>
                    <td style={{ display: "none" }}>10th Passing Year</td>
                    <td style={{ display: "none" }}>10th Percentage/CGPA</td>
                    <td style={{ display: "none" }}>12th Board</td>
                    <td style={{ display: "none" }}>12th Passing Year</td>
                    <td style={{ display: "none" }}>12th Percentage</td>
                    <td style={{ display: "none" }}>Resume</td>
                  </tr>

                  {students &&
                    students.map((student) => {
                      return (
                        <tr>
                          <td>{student.name}</td>
                          <td>{student.rollNo}</td>
                          <td>{student.course}</td>
                          <td>{student.branch}</td>
                          <td>{student.passoutYear}</td>
                          <td>{student.cgpa}</td>
                          <td style={{ display: "none" }}>
                            {student.contactEmail}
                          </td>
                          <td style={{ display: "none" }}>{student.dob}</td>
                          <td style={{ display: "none" }}>{student.gender}</td>
                          <td style={{ display: "none" }}>
                            {student.mobileNo}
                          </td>
                          <td style={{ display: "none" }}>
                            {student.nationality}
                          </td>
                          <td style={{ display: "none" }}>{student.address}</td>
                          <td style={{ display: "none" }}>
                            {student.board10th}
                          </td>
                          <td style={{ display: "none" }}>
                            {student.passingYear10th}
                          </td>
                          <td style={{ display: "none" }}>
                            {student.percentage10th}
                          </td>
                          <td style={{ display: "none" }}>
                            {student.board12th}
                          </td>
                          <td style={{ display: "none" }}>
                            {student.passingYear12th}
                          </td>
                          <td style={{ display: "none" }}>
                            {student.percentage12th}
                          </td>
                          <td style={{ display: "none" }}>
                            {student.resumeUrl}
                          </td>
                        </tr>
                      );
                    })}
                </table>
              </div>
            </div>
          );
      } else
        return (
          <div className="not-allowed">
            Sorry, you are not allowed to access this page.
          </div>
        );
    } else return <Spinner />;
  } else
    return (
      <div className="not-allowed">
        Sorry, you are not Logged In .Kindly Login In to access this page.
      </div>
    );
};

export default ShortListingStudents;
