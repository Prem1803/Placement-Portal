import React, { useState } from "react";

const Contact = () => {
  //Contact us page component
  const [message, setMessage] = useState({
    name: "",
    email: "",
    subject: "",
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
  const { name, email, subject, content } = message;
  return (
    //returns the contact form
    <div className="form-container">
      <h1>
        <span className="text-primary">Contact US</span>
      </h1>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="Name">Name</label>
          <input type="text" name="name" value={name} onChange={onChange} />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="text" name="email" value={email} onChange={onChange} />
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
