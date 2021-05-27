import React, { useEffect, useState } from "react";

import { useParams } from "react-router";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import { getAllStudents } from "../../api/apiStudent";
import Spinner from "./Spinner";

const Management = ({ user }) => {
  const userid = useParams().id; //getting the user id

  const [filters, setFilters] = useState({
    batch: "",
    year: "",
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
        (filters.batch !== "" &&
          student.batch.toLowerCase().includes(filters.batch.toLowerCase())) ||
        filters.batch === ""
      );
    });
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
        (filters.year !== "" &&
          student.year.toLowerCase().includes(filters.year)) ||
        filters.year === ""
      );
    });
    filteredStudents = await filteredStudents.filter((student) => {
      return (
        (filters.cgpa !== "" && Number(student.cgpa) >= Number(filters.cgpa)) ||
        filters.cgpa === ""
      );
    });
    setFiltered(filteredStudents); //filtering the students
  };
  useEffect(() => {
    loadStudents(); //loading students
  }, students);
  if (user.uid) {
    if (userid === user.uid) {
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
                </select>
              </div>
              <div className="student-filter-option">
                <label>Course</label>

                <select name="batch" value={filters.batch} onChange={onChange}>
                  <option value="">All</option>
                  <option value="BTech">BTech</option>
                  <option value="MTech">MTech</option>
                  <option value="PhD">PhD</option>
                </select>
              </div>
              <div className="student-filter-option">
                <label>Passout Year</label>

                <input
                  name="year"
                  value={filters.year}
                  onChange={onChange}
                  type="text"
                  placeholder="For ex 2021"
                ></input>
              </div>
              <div className="student-filter-option">
                <label>CGPA</label>

                <select name="cgpa" value={filters.cgpa} onChange={onChange}>
                  <option value="">All</option>
                  <option value="7">7 and Above</option>
                  <option value="7.5">7.5 and Above</option>
                  <option value="8">8 and Above</option>
                  <option value="8.5">8.5 and Above</option>
                  <option value="9">9 and Above</option>
                  <option value="9.5">9.5 and Above</option>
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
                  <td style={{ display: "none" }}>Resume</td>
                </tr>

                {filtered &&
                  filtered.map((student) => {
                    return (
                      <tr>
                        <td>{student.name}</td>
                        <td>{student.rollNo}</td>
                        <td>{student.batch}</td>
                        <td>{student.branch}</td>
                        <td>{student.year}</td>
                        <td>{student.cgpa}</td>
                        <td style={{ display: "none" }}>{student.resumeUrl}</td>
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
            <form className="student-filter" onSubmit={loadFiltered}>
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
                </select>
              </div>
              <div className="student-filter-option">
                <label>Course</label>

                <select name="batch" value={filters.batch} onChange={onChange}>
                  <option value="">All</option>
                  <option value="BTech">BTech</option>
                  <option value="MTech">MTech</option>
                  <option value="PhD">PhD</option>
                </select>
              </div>
              <div className="student-filter-option">
                <label>Passout Year</label>

                <input
                  name="year"
                  value={filters.year}
                  onChange={onChange}
                  type="text"
                  placeholder="For ex 2021"
                ></input>
              </div>
              <div className="student-filter-option">
                <label>CGPA</label>

                <select name="cgpa" value={filters.cgpa} onChange={onChange}>
                  <option value="">All</option>
                  <option value="7+">7 and Above</option>
                  <option value="7.5+">7.5 and Above</option>
                  <option value="8+">8 and Above</option>
                  <option value="8.5+">8.5 and Above</option>
                  <option value="9+">9 and Above</option>
                  <option value="9.5+">9.5 and Above</option>
                </select>
              </div>
              <div
                className="student-filter-option"
                style={{ marginTop: "1.4rem", marginBottom: "0.5rem" }}
              >
                <button type="submit" value="" className="btn btn-danger">
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
            </form>
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
                  <td style={{ display: "none" }}>Resume</td>
                </tr>
                {/* <tr>
                  <td>Prem</td>
                  <td>191210037</td>
                  <td>BTech</td>
                  <td>2023</td>
                  <td>7.88</td>
                </tr>
                <tr>
                  <td>Prem Kumar</td>
                  <td>191210037</td>
                  <td>BTech</td>
                  <td>2023</td>
                  <td>7.88</td>
                </tr>
                <tr>
                  <td>Abhishek Kumar Suman</td>
                  <td>191210037</td>
                  <td>BTech</td>
                  <td>2023</td>
                  <td>7.88</td>
                </tr>
                 */}
                {students &&
                  students.map((student) => {
                    return (
                      <tr>
                        <td>{student.name}</td>
                        <td>{student.rollNo}</td>
                        <td>{student.batch}</td>
                        <td>{student.branch}</td>
                        <td>{student.year}</td>
                        <td>{student.cgpa}</td>
                        <td style={{ display: "none" }}>{student.resumeUrl}</td>
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
};

export default Management;
