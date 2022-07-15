import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { getAllAlumni, getAlumnis } from "../../../api/apiAlumni";
import AlumniCard from "./AlumniCard";
import AlumniFilterBatches from "./AlumniFilterBatches";

const Alumni = ({ user }) => {
  //Alumni component
  const [alumni, setAlumni] = useState([]); //setting alumni as empty array
  const [allAlumni, setAllAlumni] = useState([]); //setting alumni as empty array
  const [allFilteredAlumni, setAllFilteredAlumni] = useState(null); //setting alumni as empty array
  const [allBatchwiseFilteredAlumni, setAllBatchwiseFilteredAlumni] =
    useState(null); //setting alumni as empty array

  const loadAlumni = () => {
    //loading all the alumni's
    getAllAlumni()
      .then((data) => {
        setAlumni(data); //setting alumni's according to the response
      })
      .catch((err) => {
        console.log(err);
      });
    getAlumnis()
      .then((data) => {
        setAllAlumni(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    loadAlumni(); //loading the alumni's
  }, []);
  const [filtered, setFiltered] = useState(null);
  const loadFiltered = (filtered) => {
    setFiltered(filtered); //filtering the alumni's
  };
  const [passoutYear, setPassoutYear] = useState(null);

  const loadPassoutYear = (year) => {
    setPassoutYear(year); //filtering the alumni's
  };
  const text = useRef("");
  const onChange = () => {
    const filtered = allAlumni.filter((alumni) => {
      return alumni.name
        .toLowerCase()
        .includes(text.current.value.toLowerCase());
    });
    if (passoutYear !== null) {
      console.log(passoutYear);
      const batchwiseFiltered = filtered.filter((alumni) => {
        return alumni.passoutYear === passoutYear;
      });
      setAllBatchwiseFilteredAlumni(batchwiseFiltered);
    }
    setAllFilteredAlumni(filtered);
    if (text.current.value === "") {
      setAllFilteredAlumni(null);
    }
  };
  useEffect(() => {
    const filtered = allAlumni.filter((alumni) => {
      return alumni.name
        .toLowerCase()
        .includes(text.current.value.toLowerCase());
    });
    if (passoutYear !== null) {
      console.log(passoutYear);
      const batchwiseFiltered = filtered.filter((alumni) => {
        return alumni.passoutYear === passoutYear;
      });
      setAllBatchwiseFilteredAlumni(batchwiseFiltered);
    }
  }, [passoutYear]);
  if (Object.keys(user).length !== 0) {
    if (allFilteredAlumni !== null && filtered === null) {
      return (
        <div className="studentcontainer  ">
          <AlumniFilterBatches
            AllAlumni={alumni}
            loadFiltered={loadFiltered}
            loadPassoutYear={loadPassoutYear}
          />
          <form>
            <input
              ref={text}
              type="text"
              placeholder="Filter by Name"
              onChange={onChange}
            />
          </form>
          <div className="row">
            {allFilteredAlumni &&
              allFilteredAlumni.map((alumni) => {
                return <AlumniCard alumni={alumni} key={alumni._id} />;
              })}
          </div>
        </div>
      );
    } else if (allFilteredAlumni !== null && filtered !== null) {
      return (
        <div className="studentcontainer  ">
          <AlumniFilterBatches
            AllAlumni={alumni}
            loadFiltered={loadFiltered}
            loadPassoutYear={loadPassoutYear}
          />
          <form>
            <input
              ref={text}
              type="text"
              placeholder="Filter by Name"
              onChange={onChange}
            />
          </form>
          <div className="row">
            {allBatchwiseFilteredAlumni &&
              allBatchwiseFilteredAlumni.map((alumni) => {
                return <AlumniCard alumni={alumni} key={alumni._id} />;
              })}
          </div>
        </div>
      );
    } else if (filtered !== null && allFilteredAlumni === null) {
      return (
        <div className="studentcontainer  ">
          <AlumniFilterBatches
            AllAlumni={alumni}
            loadFiltered={loadFiltered}
            loadPassoutYear={loadPassoutYear}
          />
          <form>
            <input
              ref={text}
              type="text"
              placeholder="Filter by Name"
              onChange={onChange}
            />
          </form>
          <div className="studentpanel">
            {filtered &&
              filtered.reverse().map((alumni) => {
                return (
                  <Link
                    to={`/alumni/${alumni[0]}`}
                    state={alumni[1]}
                    key={alumni[0]}
                  >
                    <div className="alumnipanelcard" />
                    Batch Of {alumni[0]}
                  </Link>
                );
              })}
          </div>
        </div>
      );
    } else
      return (
        <div className="studentcontainer  ">
          <AlumniFilterBatches
            AllAlumni={alumni}
            loadFiltered={loadFiltered}
            loadPassoutYear={loadPassoutYear}
          />
          <form>
            <input
              ref={text}
              type="text"
              placeholder="Filter by Name"
              onChange={onChange}
            />
          </form>
          <div className="studentpanel">
            {alumni &&
              alumni.reverse().map((alumni) => {
                return (
                  <Link
                    to={`/alumni/${alumni[0]}`}
                    state={alumni[1]}
                    key={alumni[0]}
                  >
                    <div className="alumnipanelcard" />
                    Batch Of {alumni[0]}
                  </Link>
                );
              })}
          </div>
        </div>
      );
  } else
    return (
      <div className="not-allowed">
        Sorry, you are not Logged In .Kindly Login In to access this page.
      </div>
    );
};

export default Alumni;
