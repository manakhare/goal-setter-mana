// Strictly for making the HTTP request, and sending the data back and setting data in local storage

import axios from "axios";

// const API_URL = process.env.API_URL + "/api/users/";
const API_URL = `${process.env.BACKEND_API_URL}/api/users`;
console.log(API_URL);

// Register user
const register = async (userData) => {
  //User gets passed in the userData
  console.log(API_URL);
  const response = await axios.post(API_URL, userData); //This will make the request and put the response in the response variable

  if (response.data) {
    // Axios inputs the data into the object data
    localStorage.setItem("user", JSON.stringify(response.data)); // this will include our token

    return response.data;
  }
};

// login user
const login = async (userData) => {
  //User gets passed in the userData
  console.log(API_URL + "login");

  const response = await axios.post(API_URL + "login", userData); //This will make the request and put the response in the response variable
  if (response.data) {
    // Axios inputs the data into the object data
    localStorage.setItem("user", JSON.stringify(response.data)); // this will include our token
    return response.data;
  }
};

//Logout user
const logout = () => {
  localStorage.removeItem("user");
  // we can also do this using http server and cookie... this is just the basic way to do it
};

// Delete user
const deleteUser = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  localStorage.removeItem("user");
  const response = await axios.delete(API_URL + "me", config);
  // return response.data;
};

const authService = {
  register,
  login,
  logout,
  deleteUser,
};

export default authService;
