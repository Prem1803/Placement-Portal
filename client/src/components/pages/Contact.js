import React, { useState } from "react";

const Contact = ({ token, user, userDetails }) => {
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
  const onSubmit = (e) => {
    //submitting the contact form
    e.preventDefault();
  };
  const { name, email, category, subject, content } = message;
  if (token === null || token === "null" || token === "")
    return <div className="not-allowed">Sorry. You are not logged In</div>;
  else
    return (
      //returns the contact form
      <div className="form-container">
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
};

export default Contact;
