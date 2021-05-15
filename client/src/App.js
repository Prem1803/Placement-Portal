import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./App.css";
import "./App.scss";
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
import Projects from "./components/layout/projects/Projects";
import SingleBlog from "./components/layout/blogs/SingleBlog";
import UserDashboard from "./components/layout/UserDashboard";
import { useEffect, useState } from "react";
import axios from "axios";
import { ToastProvider } from "react-toast-notifications";
import UserProfile from "./components/layout/UserProfile";
import AdminDashboard from "./components/layout/AdminDashboard";
import EditProject from "./components/layout/EditProject";
import EditBlog from "./components/layout/EditBlog";
import ProjectForm from "./components/layout/ProjectForm";
import BlogForm from "./components/layout/BlogForm";
import EditProfile from "./components/layout/EditProfile";
import AnnouncementForm from "./components/layout/AnnouncementForm";
import EditAnnouncement from "./components/layout/EditAnnouncement";
import SingleAnnouncement from "./components/layout/announcements/SingleAnnouncement";

function App() {
  const [user, setUser] = useState({}); //storing the logged in user
  const [userDetails, setUserDetails] = useState({ name: "" }); //storing the logged in user's details
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

        if (user.type === 0) {
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
  useEffect(() => {
    getUser(); //getting the user
  }, [user.uid, userDetails.name]);
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
            <Switch>
              <Route exact path="/" component={Home} />
              {/*Renders the home page*/}
              <Route exact path="/contact" component={Contact} />
              {/*Renders the contact page*/}
              <Route exact path="/register" component={Register} />
              {/*Renders the student register page*/}
              <Route exact path="/login" component={Login} />
              {/*Renders the student login page*/}
              <Route exact path="/admin" component={AdminLogin} />
              {/*Renders the admin login page*/}
              <Route exact path="/blogs" component={Blogs} />
              {/*Renders the Blogs page*/}
              <Route exact path="/students" component={Students} />
              {/*Renders the all students page*/}
              <Route exact path="/alumni" component={Alumni} />
              {/*Renders the all alumni's page*/}
              <Route exact path="/projects" component={Projects} />
              {/*Renders the all projects page*/}
              <Route exact path="/announcements" component={Announcements} />
              {/*Renders the all announcement page*/}
              <Route exact path="/blogs/:id" component={SingleBlog} />
              {/*Renders the single blog page*/}
              <Route
                exact
                path="/announcements/:id"
                component={SingleAnnouncement}
              />
              {/*Renders the single announcemnet page*/}
              <Route
                exact
                path="/userdashboard/:id"
                render={() => (
                  <UserDashboard
                    user={user}
                    userDetails={userDetails}
                    token={token}
                  />
                )}
              />
              {/*Renders the user dashboard page*/}
              <Route
                exact
                path="/admindashboard/:id"
                render={() => (
                  <AdminDashboard
                    user={user}
                    userDetails={userDetails}
                    token={token}
                  />
                )}
              />
              {/*Renders the admin dashboard page*/}
              <Route
                exact
                path="/users/:id"
                render={() => (
                  <UserProfile
                    user={user}
                    userDetails={userDetails}
                    token={token}
                  />
                )}
              />
              {/*Renders the user profile page*/}
              <Route
                exact
                path="/users/:id/projects/:pid/edit"
                render={() => (
                  <EditProject
                    userDetails={userDetails}
                    token={token}
                    user={user}
                  />
                )}
              />
              {/*Renders the edit project page*/}
              <Route
                exact
                path="/users/:id/addProject"
                render={() => (
                  <ProjectForm
                    userDetails={userDetails}
                    token={token}
                    user={user}
                  />
                )}
              />
              {/*Renders the add project page*/}
              <Route
                exact
                path="/users/:id/addBlog"
                render={() => (
                  <BlogForm
                    userDetails={userDetails}
                    token={token}
                    user={user}
                  />
                )}
              />
              {/*Renders the add Blog page*/}
              <Route
                exact
                path="/users/:id/addAnnouncement"
                render={() => (
                  <AnnouncementForm
                    userDetails={userDetails}
                    token={token}
                    user={user}
                  />
                )}
              />
              {/*Renders the add announcement page*/}
              <Route
                exact
                path="/users/:id/blogs/:bid/edit"
                render={() => (
                  <EditBlog
                    userDetails={userDetails}
                    token={token}
                    user={user}
                  />
                )}
              />
              {/*Renders the edit blog page*/}
              <Route
                exact
                path="/users/:id/announcements/:bid/edit"
                render={() => (
                  <EditAnnouncement
                    userDetails={userDetails}
                    token={token}
                    user={user}
                  />
                )}
              />
              {/*Renders the edit announcement page*/}
              <Route
                exact
                path="/users/:id/editProfile"
                render={() => (
                  <EditProfile
                    userDetails={userDetails}
                    token={token}
                    user={user}
                  />
                )}
              />
              {/*Renders the edit profile page*/}
              <Route component={PageNotFound} />
            </Switch>
          </SideBar>
        </BrowserRouter>
      </ToastProvider>
    </div>
  );
}

export default App;
