import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { createGoal } from "../features/goals/goalSlice";

function GoalForm() {
  //piece of STATE of form
  const [text, setText] = useState(""); // with default of empty string

  //Initialize
  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();

    dispatch(createGoal({ text })); //Goal is created-- the function is dispatched
    setText(""); // Clears the form
  };

  //Value in input field is from useState
  //When we click on 'ADD GOAL' button, we will dispatch a thunk fn from our slice or redux
  return (
    <section className="form">
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="text">Goal</label>
          <input
            type="text"
            name="text"
            id="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>

        <div className="form=group">
          <button className="btn btn-block" type="submit">
            Add Goal
          </button>
        </div>
      </form>
    </section>
  );
}

export default GoalForm;
