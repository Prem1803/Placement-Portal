import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/layout/Navbar";
import SideBar from "./components/layout/Sidebar";
import Home from "./components/pages/Home";
import Contact from "./components/pages/Contact";
import PageNotFound from "./components/pages/PageNotFound";
import Register from "./components/layout/auth/Register";
import Login from "./components/layout/auth/Login";
import AdminLogin from "./components/layout/auth/AdminLogin";
import Blogs from "./components/layout/blogs/Blogs";
import Students from "./components/layout/students/Students";
import Alumni from "./components/layout/alumni/Alumni";
import Announcements from "./components/layout/announcements/Announcements";
import SingleBlog from "./components/layout/blogs/SingleBlog";
import UserDashboard from "./components/layout/UserDashboard";
import { useEffect, useState } from "react";
import axios from "axios";
import { ToastProvider } from "react-toast-notifications";
import UserProfile from "./components/layout/UserProfile";
import AdminDashboard from "./components/layout/AdminDashboard";
import EditBlog from "./components/layout/EditBlog";
import BlogForm from "./components/layout/BlogForm";
import EditProfile from "./components/layout/EditProfile";
import AnnouncementForm from "./components/layout/AnnouncementForm";
import AdminAnnouncements from "./components/layout/AdminAnnouncements";
import EditAnnouncement from "./components/layout/EditAnnouncement";
import SingleAnnouncement from "./components/layout/announcements/SingleAnnouncement";
import AdminBlogs from "./components/layout/AdminBlogs";
import OTPVerification from "./components/layout/auth/OTPVerification";
import ForgotPassword from "./components/layout/auth/ForgotPassword";
import ChangePassword from "./components/layout/auth/ChangePassword";
import ShortlistingStuents from "./components/layout/ShortListingStudents";
import Management from "./components/layout/Management";
import ManageAdminAccount from "./components/layout/ManageAdminAccount";
import AdminAccess from "./components/layout/AdminAccess";
import OnCampusAnnouncements from "./components/layout/announcements/OnCampusAnnouncements";
import OffCampusAnnouncements from "./components/layout/announcements/OffCampusAnnouncements";
import BTechStudents from "./components/layout/students/BTechStudents";
import BatchWiseStudents from "./components/layout/students/BatchWiseStudents";
import MTechStudents from "./components/layout/students/MTechStudents";
import PhDStudents from "./components/layout/students/PhDStudents";
import BranchWiseStudents from "./components/layout/students/BranchWiseStudents";
import AlumniBatchWise from "./components/layout/alumni/AlumniBatchWise";
import BTechAlumni from "./components/layout/alumni/BTechAlumni";
import MTechAlumni from "./components/layout/alumni/MTechAlumni";
import PhDAlumni from "./components/layout/alumni/PhDAlumni";
import AlumniBranchWise from "./components/layout/alumni/AlumniBranchWise";
import PlacementStatus from "./components/layout/PlacementStatus";

function App() {
  const [user, setUser] = useState({}); //storing the logged in user
  const [userDetails, setUserDetails] = useState({ name: "" }); //storing the logged in user's details

  useEffect(() => {
    const getUser = async () => {
      //getting the logged in user from the token
      try {
        let token = JSON.parse(localStorage.getItem("userInfo")); //getting the token from local storage

        if (token) {
          const config = {
            headers: {
              "Content-Type": "application/json",
              "x-auth-token": `${token}`,
            },
          };

          let { data } = await axios.get(
            "/api/users/getLoggedInUser", //making call to the backend to get the logged in user
            config
          );

          setUser(JSON.parse(JSON.stringify(data))); //storing the response into the user

          if (user.type === 0 || user.type === 2 || user.type === 3) {
            try {
              let userdata;
              userdata = await axios
                .get(`/api/users/${user.sid}`, config) //making call to the backend to get the user details of the logged in user
                .then((response) => {
                  userdata = JSON.parse(JSON.stringify(response.data));
                  setUserDetails(userdata); //storing the response into the user details
                });
            } catch (e) {
              console.log(e.message);
            }
          } else {
            setUserDetails({ _id: user.uid });
          }
        }
      } catch (e) {
        console.log(e.message);
      }
    };
    getUser(); //getting the user
  }, [user.sid, user.uid, user.type, userDetails.name]);
  const [token, setToken] = useState(
    localStorage.getItem("userInfo") !== ""
      ? localStorage.getItem("userInfo")
      : ""
  ); //for storing the token
  const resetToken = () => {
    setToken(""); //reseting the token
  };
  useEffect(() => {
    if (localStorage.getItem("userInfo") !== "")
      setToken(localStorage.getItem("userInfo"));
    else setToken("");
  }, [token]);
  return (
    <div className="App">
      <ToastProvider>
        <BrowserRouter>
          <Navbar
            user={user}
            userDetails={userDetails}
            token={token}
            resetToken={resetToken}
          />
          <SideBar user={user} userDetails={userDetails} token={token}>
            <Routes>
              <Route path="/" element={<Home />} />
              {/*Renders the home page*/}
              <Route
                path="/contact"
                element={
                  <Contact
                    user={user}
                    userDetails={userDetails}
                    token={token}
                  />
                }
              />
              {/*Renders the contact page*/}
              <Route
                path="/register"
                element={<Register user={user} userDetails={userDetails} />}
              />
              {/*Renders the student register page*/}
              <Route
                path="/login"
                element={<Login user={user} userDetails={userDetails} />}
              />
              {/*Renders the student login page*/}
              <Route
                path="/admin"
                element={<AdminLogin user={user} userDetails={userDetails} />}
              />
              {/*Renders the admin login page*/}
              <Route
                path="/blogs"
                element={<Blogs user={user} userDetails={userDetails} />}
              />
              {/*Renders the Blogs page*/}
              <Route
                path="/students"
                element={<Students user={user} userDetails={userDetails} />}
              />
              {/*Renders the all students page*/}
              <Route
                path="/alumni"
                element={<Alumni user={user} userDetails={userDetails} />}
              />
              {/*Renders the all alumni's page*/}
              {/* <Route  path="/projects" element={<Projects/>} /> */}
              {/*Renders the all projects page*/}
              <Route
                path="/announcements"
                element={
                  <Announcements user={user} userDetails={userDetails} />
                }
              />
              <Route
                path="/forgotpassword"
                element={
                  <ForgotPassword user={user} userDetails={userDetails} />
                }
              />
              <Route
                path="/changepassword"
                element={
                  <ChangePassword user={user} userDetails={userDetails} />
                }
              />
              <Route
                path="/students/btech"
                element={
                  <BTechStudents user={user} userDetails={userDetails} />
                }
              />
              <Route
                path="/students/mtech"
                element={
                  <MTechStudents user={user} userDetails={userDetails} />
                }
              />
              <Route
                path="/students/phd"
                element={<PhDStudents user={user} userDetails={userDetails} />}
              />
              <Route
                path="/students/:course/:branch"
                element={
                  <BranchWiseStudents user={user} userDetails={userDetails} />
                }
              />
              <Route
                path="/students/:course/:branch/:passoutYear"
                element={
                  <BatchWiseStudents user={user} userDetails={userDetails} />
                }
              />
              <Route
                path="/alumni/:passoutYear"
                element={
                  <AlumniBatchWise user={user} userDetails={userDetails} />
                }
              />
              <Route
                path="/alumni/:passoutYear/btech"
                element={<BTechAlumni user={user} userDetails={userDetails} />}
              />
              <Route
                path="/alumni/:passoutYear/mtech"
                element={<MTechAlumni user={user} userDetails={userDetails} />}
              />
              <Route
                path="/alumni/:passoutYear/phd"
                element={<PhDAlumni user={user} userDetails={userDetails} />}
              />
              <Route
                path="/alumni/:passoutYear/:course/:branch"
                element={
                  <AlumniBranchWise user={user} userDetails={userDetails} />
                }
              />
              <Route
                path="/announcements/oncampus"
                element={
                  <OnCampusAnnouncements
                    user={user}
                    userDetails={userDetails}
                  />
                }
              />
              <Route
                path="/announcements/offcampus"
                element={
                  <OffCampusAnnouncements
                    user={user}
                    userDetails={userDetails}
                  />
                }
              />

              {/*Renders the all announcement page*/}
              <Route
                path="/blogs/:id"
                element={<SingleBlog user={user} userDetails={userDetails} />}
              />
              {/*Renders the single blog page*/}
              <Route
                path="/announcements/:id"
                element={
                  <SingleAnnouncement user={user} userDetails={userDetails} />
                }
              />
              {/*Renders the single announcemnet page*/}
              <Route
                path="/userdashboard/"
                element={
                  <UserDashboard
                    user={user}
                    userDetails={userDetails}
                    token={token}
                  />
                }
              />
              <Route
                path="/verify"
                element={
                  <OTPVerification user={user} userDetails={userDetails} />
                }
              />
              {/*Renders the user dashboard page*/}
              <Route
                path="/admindashboard"
                element={
                  <AdminDashboard
                    user={user}
                    userDetails={userDetails}
                    token={token}
                  />
                }
              />
              {/*Renders the admin dashboard page*/}
              <Route
                path="/admindashboard/announcements"
                element={
                  <AdminAnnouncements
                    user={user}
                    userDetails={userDetails}
                    token={token}
                  />
                }
              />
              <Route
                path="/admindashboard/blogs"
                element={
                  <AdminBlogs
                    user={user}
                    userDetails={userDetails}
                    token={token}
                  />
                }
              />
              <Route
                path="/admindashboard/management/students"
                element={
                  <ShortlistingStuents user={user} userDetails={userDetails} />
                }
              />
              <Route
                path="/admindashboard/management/"
                element={<Management user={user} userDetails={userDetails} />}
              />
              <Route
                path="/admindashboard/management/manageaccount"
                element={
                  <ManageAdminAccount user={user} userDetails={userDetails} />
                }
              />
              <Route
                path="/admindashboard/management/admins"
                element={
                  <AdminAccess
                    user={user}
                    token={token}
                    userDetails={userDetails}
                  />
                }
              />
              <Route
                path="/admindashboard/management/placements"
                element={
                  <PlacementStatus
                    user={user}
                    token={token}
                    userDetails={userDetails}
                  />
                }
              />
              <Route
                path="/users/:id"
                element={
                  <UserProfile
                    user={user}
                    userDetails={userDetails}
                    token={token}
                  />
                }
              />
              {/*Renders the user profile page*/}
              {/* <Route
                
                path="/users/:id/projects/:pid/edit"
                element={(
                  <EditProject
                    userDetails={userDetails}
                    token={token}
                    user={user}
                  />
                )}
              /> */}
              {/*Renders the edit project page*/}
              {/* <Route
                
                path="/users/:id/addProject"
                element={(
                  <ProjectForm
                    userDetails={userDetails}
                    token={token}
                    user={user}
                  />
                )}
              /> */}
              {/*Renders the add project page*/}
              <Route
                path="/addblog"
                element={
                  <BlogForm
                    userDetails={userDetails}
                    token={token}
                    user={user}
                  />
                }
              />
              {/*Renders the add Blog page*/}
              <Route
                path="/addannouncement"
                element={
                  <AnnouncementForm
                    userDetails={userDetails}
                    token={token}
                    user={user}
                  />
                }
              />
              {/*Renders the add announcement page*/}
              <Route
                path="/blogs/:bid/edit"
                element={
                  <EditBlog
                    userDetails={userDetails}
                    token={token}
                    user={user}
                  />
                }
              />
              {/*Renders the edit blog page*/}
              <Route
                path="/announcements/:bid/edit"
                element={
                  <EditAnnouncement
                    userDetails={userDetails}
                    token={token}
                    user={user}
                  />
                }
              />
              {/*Renders the edit announcement page*/}
              <Route
                path="/editprofile"
                element={
                  <EditProfile
                    userDetails={userDetails}
                    token={token}
                    user={user}
                  />
                }
              />
              {/*Renders the edit profile page*/}
              <Route element={<PageNotFound />} />
            </Routes>
          </SideBar>
        </BrowserRouter>
      </ToastProvider>
    </div>
  );
}

export default App;
