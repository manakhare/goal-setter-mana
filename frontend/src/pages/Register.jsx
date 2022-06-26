import React from "react";
import { useState, useEffect } from "react";
import { FaUser } from "react-icons/fa";

function Register() {
  const [formData, setFormData] = useState({
    //these are the states that we get from the form
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  //Destruct the formData
  const { name, email, password, password2 } = formData;

  //As something happens in the form, the onChange function in the input fires off, and we need to change the state of react
  //We do that by updating the values in the setFormData
  const onChange = (e) => {
    //We set hte setFormData as an object
    setFormData((prevState) => ({    
        ...prevState,               //We get all the other fields here
        [e.target.name]: e.target.value        //The name field in our form input is our key, and we set it to the value
    }))
  };

  const onSubmit = (e) => {
    e.preventDefault()
  };

  return (
    <>
      <section className="heading">
        <h1>
          <FaUser /> Register
        </h1>
        <p>Please create an account</p>
      </section>

      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={name}
              placeholder="Enter your full name"
              onChange={onChange}
            ></input>
          </div>
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={email}
              placeholder="Enter your email"
              onChange={onChange}
            ></input>
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={password}
              placeholder="Enter password"
              onChange={onChange}
            ></input>
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="password2"
              name="password2"
              value={password2}
              placeholder="Confirm password"
              onChange={onChange}
            ></input>
          </div>

          <div className="form-group">
            <button type="submit" className="btn btn-block"></button>
          </div>
        </form>
      </section>
    </>
  );
}

export default Register;
