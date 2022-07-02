import React from "react";
import { useState, useEffect } from "react";
// useSelector - used to select something from the state. Like isLoading, isError etc
// useDispatch - to dispatch a function like register, the asynch thunk function... or reset fn of our reducer
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify"; // we need to make some changes in app.js to make that work
import { FaUser } from "react-icons/fa";
import { register, reset } from "../features/auth/authSlice";
import Spinner from "../components/Spinner";

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

  // Intitalize navigate and dispatch
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Select what we want from our STATE by destructuring
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth // we are looking at auth part of the STATE
  );

  // It takes a dependencies array that will fire off user effect if any of them changes
  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || user) {
      //if the process is successful and the user is logged in, we will redirect them to the dashboard
      navigate("/");
    }

    dispatch(reset()); //reset fn that's in authSlice, as we want the initial state back
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  //As something happens in the form, the onChange function in the input fires off, and we need to change the state of react
  //We do that by updating the values in the setFormData
  const onChange = (e) => {
    //We set hte setFormData as an object
    setFormData((prevState) => ({
      ...prevState, //We get all the other fields here
      [e.target.name]: e.target.value, //The name field in our form input is our key, and we set it to the value
    }));
  };

  // When we submit, we want to dispatch our register function
  const onSubmit = (e) => {
    e.preventDefault();

    // Check for passwords
    if (password !== password2) {
      toast.error("Passwords do not match! Please try again.");
    } else {
      // We here register the user
      // The register function takes in the user data
      const userData = {
        //object that contains the data coming from the form
        name,
        email,
        password,
      };

      dispatch(register(userData));
      // What we have dispatched is passed in the authSlice -> register -> createAsyncThunk -> async -> user
    }
  };

  //We play the spinner if isLoading is true
  if (isLoading) {
    return <Spinner />;
  }

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
            <button type="submit" className="btn btn-block">
              Register
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export default Register;
