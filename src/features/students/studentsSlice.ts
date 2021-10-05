import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Error, Status, Student } from "../../types";
// const URL = process.env.REACT_APP_API_URI || "http://localhost:8080";

const initialState: StudentsState = {
  students: [],
  status: "idle",
  error: null,
};

export const fetchStudents = createAsyncThunk(
  "students/fetchStudents",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get<Student[]>("/students");
      return response.data;
    } catch (error: any) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const createStudent = createAsyncThunk(
  "students/createStudent",
  async (newStudent: Student, { rejectWithValue }) => {
    try {
      const response = await axios.post<Student>("/students", newStudent);
      console.log(response.data);
      return response.data;
    } catch (error: any) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateStudent = createAsyncThunk(
  "students/updateStudent",
  async (editingStudent: Student, { rejectWithValue }) => {
    try {
      const response = await axios.put<Student>(
        `/students/${editingStudent.Id}`,
        editingStudent
      );
      console.log(response.data);
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
    [fetchStudents.pending.toString()]: (state) => {
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

    [createStudent.pending.toString()]: (state) => {
      state.status = "loading";
    },
    [createStudent.fulfilled.toString()]: (state, action) => {
      state.status = "succeeded";
      state.students.unshift(action.payload);
      state.error = null;
    },
    [createStudent.rejected.toString()]: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },

    [updateStudent.pending.toString()]: (state) => {
      state.status = "loading";
    },
    [updateStudent.fulfilled.toString()]: (state, action) => {
      state.status = "succeeded";
      for (let i = 0; i < state.students.length; i++) {
        if (action.payload.Id === state.students[i].Id) {
          state.students[i] = action.payload;
        }
      }
      state.error = null;
    },
    [updateStudent.rejected.toString()]: (state, action) => {
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
