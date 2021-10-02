import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Error, Status, Student } from "../../types";
// const URL = process.env.REACT_APP_API_URI;

const initialState: StudentsState = {
  students: [],
  status: "idle",
  error: null,
};

export const fetchStudents = createAsyncThunk(
  "students/fetchStudents",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://localhost:8080/students`);
      return response.data;
    } catch (error: any) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

const studentsSlice = createSlice({
  name: "students",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchStudents.pending.toString()]: (state, action) => {
      state.status = "loading";
    },
    [fetchStudents.fulfilled.toString()]: (state, action) => {
      state.status = "succeeded";
      state.students = action.payload;
      state.error = null;
    },
    [fetchStudents.rejected.toString()]: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
  },
});

interface StudentsState {
  students: Student[];
  status: Status;
  error: Error;
}

export default studentsSlice.reducer;
