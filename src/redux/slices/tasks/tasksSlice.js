import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  $list: [],
};

export const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    fetchAll: (state, action) => {
      return { ...state, list: action.payload };
    },
  },
});

export const { fetchAll } = tasksSlice.actions;

export const fetchAllThunk = async (data) => {
  return (dispatch, getState) => {
    // await dispatch(fetchAll(data))
  };
};
