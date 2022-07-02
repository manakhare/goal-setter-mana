import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom"; //To redirect the user
import { useSelector, useDispatch } from "react-redux"; // To get user from the STATE to check whether we are logged in or not
// useDispatch -- to dispatch getGoals
import GoalForm from "../components/GoalForm";
import GoalItem from "../components/GoalItem";
import Spinner from "../components/Spinner";
import { getGoals, reset } from "../features/goals/goalSlice";

function Dashboard() {
  //Initialize
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector(
    (state) => state.auth //The user is coming from state.auth i.e. the auth part of the state
  );

  const { goals, isLoading, isError, message } = useSelector(
    (state) => state.goals // These are coming from the goals part of the State
  );

  //useEffect takes in a function and a dependency array
  useEffect(() => {
    if (isError) {
      console.error(message);
    }

    if (!user) {
      navigate("/login");
    }

    dispatch(getGoals());

    //To reset or unmount when we leave the page.. ie. it will realize the initial state
    return () => {
      dispatch(reset);
    };
  }, [user, navigate, isError, dispatch, message]);

  if (isLoading) return <Spinner />;

  return (
    <>
      <section className="heading">
        <h1>Welcome {user && user.name}</h1>
        <p>Goals Dashboard</p>
      </section>

      <GoalForm />

      <section className="content">
        {goals.length > 0 ? (
          <div className="goals">
            {goals.map((goal) => (
              <GoalItem key={goal._id} goal={goal} />
            ))}
          </div>
        ) : (
          <h3>You have not set any goals yet</h3>
        )}
      </section>
    </>
  );
}

export default Dashboard;
