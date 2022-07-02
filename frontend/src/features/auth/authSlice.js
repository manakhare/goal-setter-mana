//This is where our reducers, our initial state etc and things related to authentication will come

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";
//thunk package helps in updating our state (by what we get back from our server) using asynchronous functions -- redux toolkit makes this easier

//When we register, we get back some basic data and a JWT(jsonwebtoken), which is needed to access protected routes
// Get user from localStorage (that can only have strings)
const user = JSON.parse(localStorage.getItem("user"));

//This is an objext that pertains to the user part of the state and the aunthentication
const initialState = {
  user: user ? user : null,
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

//Directly deals with async functions and the backend
//Register user
export const register = createAsyncThunk(
  "auth/register",
  async (user, thunkAPI) => {
    // user is the user from the register page
    try {
      return await authService.register(user); //returns the payload that comes back to the register function (in addCase isfulfilled)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      // sets the error message payload in the message, and this is returned to the async thunk function, extraReducers, in register.rejected
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Login user
export const login = createAsyncThunk("auth/login", async (user, thunkAPI) => {
  // user is the user from the register page
  // console.log(user);
  try {
    return await authService.login(user); //returns the payload that comes back to the register function (in addCase isfulfilled)
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();

    // sets the error message payload in the message, and this is returned to the async thunk function, extraReducers, in register.rejected
    return thunkAPI.rejectWithValue(message);
  }
});

// Logout
export const logout = createAsyncThunk("auth/logout", async () => {
  await authService.logout();
});

// Delete user
export const deleteUser = createAsyncThunk(
  "auth/delete",
  async (user, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await authService.deleteUser(token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      // sets the error message payload in the message, and this is returned to the async thunk function, extraReducers, in register.rejected
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    //these don't go in thunk function and aren't asynchronous
    reset: (state) => {
      //resets the state to the initial value (after users have registered or logged in)
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    //takes in the reducers(is a async thunk fn)  && deals with the pending, rejected and fulfilled state while registering a user
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = false;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false; // is loaded
        state.isSuccess = true; // is successful
        state.user = action.payload; // gets payload data from authService.register(user)
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload; //gets payload data from register function (thinkAPI.rejectWithValue(message))
        state.user = null;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false; // is loaded
        state.isSuccess = true; // is successful
        state.user = action.payload; // gets payload data from authService.register(user)  ----- the backend
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload; //gets payload data from register function (thinkAPI.rejectWithValue(message)) --- error message
        state.user = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.isLoading = false; // is loaded
        state.isSuccess = true; // is successful
        state.user = null; //
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload; //gets payload data from register function (thinkAPI.rejectWithValue(message)) --- error message
      })
      .addCase(deleteUser.pending, (state) => {
        state.isLoading = true;
      });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
