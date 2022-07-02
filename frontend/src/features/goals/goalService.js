import axios from "axios";

const API_URL = "/api/goals/";

//Create new goals
const createGoal = async (goalData, token) => {
  // console.log(token);
  const config = {
    //object with our headers
    headers: {
      //We wanna send it as an authorization with the token
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, goalData, config); // (url, data we need to send, authentication data)

  return response.data;
};

// Get user goals
const getGoals = async (token) => {
  // console.log(token);
  const config = {
    //object with our headers
    headers: {
      //We wanna send it as an authorization with the token
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config); //We don't need to send any data, but the authentication is necessary

  console.log(response);
  return response.data;
};

// Delete user goal
const deleteGoal = async (goalId, token) => {
  // console.log(goalId);
  console.log(token);
  // console.log(API_URL + goalId);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  console.log(config);
  const response = await axios
    .delete(API_URL + goalId, config )
    .catch((err) => console.error(err));
  console.log(response);
  return response.data; //returns the array;
};

const goalService = {
  createGoal,
  getGoals,
  deleteGoal,
};

export default goalService;
