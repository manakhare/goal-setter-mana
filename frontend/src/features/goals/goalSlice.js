import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import goalService from "./goalService";

const initialState = {
  goals: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

// Create new Goal -- thunk fn
// createAsyncThunk( 'Action name', async fn) //--here the said async function takes in the goalData, that just contains the text
// thunkAPI - has a getState() method that can get anything we want from any part of the state (including the auth)
// We need a token
export const createGoal = createAsyncThunk(
  "goals/create",
  async (goalData, thunkAPI) => {
    // console.log(thunkAPI.getState().auth.user);
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await goalService.createGoal(goalData, token);
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

//Get user goals
//Since all of these are protected, we need the user id and the token
export const getGoals = createAsyncThunk(
  "goals/getAll",
  async (_, thunkAPI) => {
    // console.log(thunkAPI.getState().auth.user);
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await goalService.getGoals(token);
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

// Delete user goal
export const deleteGoal = createAsyncThunk(
  "goals/delete",
  async (id, thunkAPI) => {
    console.log(thunkAPI.getState().auth.user);
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await goalService.deleteGoal(id, token);
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

export const goalSlice = createSlice({
  name: "goal",
  initialState,
  reducers: {
    reset: (state) => initialState, //We don't reset the goals or user, we just reset the isLoading etc
  },
  extraReducers: (builder) => {
    builder
      .addCase(createGoal.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createGoal.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.goals.push(action.payload); //pushes the goal in the goals
      })
      .addCase(createGoal.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload; //the error message
      })

      .addCase(getGoals.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getGoals.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.goals = action.payload; //pushes the goal in the goals
      })
      .addCase(getGoals.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload; //the error message
      })

      .addCase(deleteGoal.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteGoal.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.goals = state.goals.filter(
          (goal) => goal._id !== action.payload.id
        );
        console.log(state.goals);
        //filter returns a new list of all the goals that don't have the deleted id -- This leads to reloading of the UI
      })
      .addCase(deleteGoal.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload; //the error message
      });
  },
});

export const { reset } = goalSlice.actions;
export default goalSlice.reducer;
