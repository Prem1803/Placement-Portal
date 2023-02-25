import axios from "axios";
import React, { useEffect, useState } from "react";
import { useToasts } from "react-toast-notifications";
import { useNavigate } from "react-router-dom";

const Contact = ({ token, user, userDetails }) => {
  const { addToast } = useToasts();
  const navigate = useNavigate();

  //Contact us page component
  const [message, setMessage] = useState({
    name: userDetails.name,
    email: userDetails.email,
    subject: "",
    category: "General Query",
    content: "",
  }); //setting the message contents to empty string
  const onChange = (e) => {
    //setting the message content on change in the value of the respective inputs
    setMessage({ ...message, [e.target.name]: e.target.value });
  };
  const onSubmit = async (e) => {
    //submitting the contact form
    e.preventDefault();
    if (
      name !== "" &&
      email !== "" &&
      subject !== "" &&
      category !== "" &&
      content !== ""
    ) {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      await axios.post(
        `/api/mail/contact`, //making backend call to send otp for confirming email
        {
          name: name,
          email: email,
          category: category,
          subject: subject,
          content: content,
        },
        config
      );
      addToast("Contact Form Submitted", {
        appearance: "success",
        autoDismiss: true,
        autoDismissTimeout: 2000,
      });
      navigate("/");
    } else {
      addToast("Failed to Submit the contact form", {
        appearance: "alert",
        autoDismiss: true,
        autoDismissTimeout: 2000,
      });
    }
  };
  useEffect(() => {
    setMessage({
      name: userDetails.name,
      email: user.email,
      category: "General Query",
    });
  }, [userDetails]);
  const { name, email, category, subject, content } = message;
  if (Object.keys(user).length !== 0)
    return (
      //returns the contact form
      <div className="form-container">
        {console.log(Object.keys(user).length === 0)}
        <h1>
          <span className="text-primary">Contact Us</span>
        </h1>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="Name">Name</label>
            <input type="text" name="name" value={name} readOnly />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="text" name="email" value={email} readOnly />
          </div>
          <div className="form-group">
            <label htmlFor="category">Category</label>
            <select name="category" value={category} onChange={onChange}>
              <option value="General Query">General Query</option>
              <option value="Technical Issue">Technical Issue</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="subject">Subject</label>
            <input
              type="text"
              name="subject"
              value={subject}
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="content">Message</label>
            <textarea
              type="text"
              name="content"
              value={content}
              onChange={onChange}
              rows={10}
            />
          </div>

          <input type="submit" value="Submit" className="btn btn-primary" />
        </form>
      </div>
    );
  else
    return (
      <div className="not-allowed">
        Sorry, you are not Logged In .Kindly Login In to access this page.
      </div>
    );
};

export default Contact;
