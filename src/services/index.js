import axios from "axios";

import { BASEURI, PORT, PROTOCOL } from "./host";

const baseURL = `${PROTOCOL}://${BASEURI}:${PORT}`;

axios.defaults.timeout = 10000;

export const fetchAllTasks = (okCB = null) => {
  axios
    .get(`${baseURL}/tasks`)
    .then((res) => {
      if (res?.data?.resultCode === 1) {
        okCB && okCB(res?.data?.info);
      }
    })
    .catch((err) => console.log(err));
};

export const addTask = (okCB = null, { title, completed }) => {
  axios
    .post(`${baseURL}/tasks`, { title, completed })
    .then((res) => {
      if (res?.data?.resultCode === 1) {
        okCB && okCB();
      }
    })
    .catch((err) => console.log(err));
};

export const editTask = (okCB = null, { taskId, title, completed }) => {
  axios
    .put(`${baseURL}/tasks/${taskId}`, { title, completed })
    .then((res) => {
      if (res?.data?.resultCode === 1) {
        okCB && okCB();
      }
    })
    .catch((err) => console.log(err));
};

export const deleteTask = (okCB = null, { id }) => {
  console.log(id);
  axios
    .delete(`${baseURL}/tasks/${id}`)
    .then((res) => {
      if (res?.data?.resultCode === 1) {
        okCB && okCB();
      }
    })
    .catch((err) => console.log(err));
};
