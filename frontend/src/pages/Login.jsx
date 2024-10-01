import React from "react";
import { useState, useEffect } from "react";
import { FaSignInAlt } from "react-icons/fa";
// useSelector - used to select something from the state. Like isLoading, isError etc
// useDispatch - to dispatch a function like register, the asynch thunk function... or reset fn of our reducer
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify"; // we need to make some changes in app.js to make that work
import { login, reset } from "../features/auth/authSlice";
import Spinner from "../components/Spinner";

function Login() {
  const [formData, setFormData] = useState({
    //these are the states that we get from the form
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const { email, password } = formData;

  // Initialize
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Select what we want from our STATE by destructuring
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth // we are looking at auth part of the STATE
  );

  // It takes a dependencies array that will fire off user effect if any of them changes
  useEffect(() => {
    if (isError) {
      setError("Please register first!");
      toast.error(message);
    }

    if (isSuccess || user) {
      //if the process is successful and the user is logged in, we will redirect them to the dashboard
      setError("");
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

  const onSubmit = (e) => {
    e.preventDefault();

    const userData = {
      email,
      password,
    };

    dispatch(login(userData)); //fires off login function in authSlice
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <section className="heading">
        <h1>
          <FaSignInAlt /> Login
        </h1>
        <p>Login to your account and start setting goals</p>
      </section>

      <section className="form">
        <form onSubmit={onSubmit}>
          {error.length > 0 ? <div className="error-msg">{error}</div> : <></>}
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
            <button type="submit" className="btn btn-block">
              Login
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export default Login;
