import axios from "axios";

import { BASEURI, PORT, PROTOCOL } from "./host";

const baseURL = `${PROTOCOL}://${BASEURI}:${PORT}`;

axios.defaults.timeout = 10000;

export const fetchAllTasks = (okCB = null) => {
  axios
    .get(`${baseURL}/fetch/all`)
    .then((res) => {
      if (res?.data?.resultCode === 1) {
        okCB && okCB(res?.data?.info);
      }
    })
    .catch((err) => console.log(err));
};

export const addTask = (okCB = null, { title, completed }) => {
  axios
    .post(`${baseURL}/task/save`, { title, completed })
    .then((res) => {
      if (res?.data?.resultCode === 1) {
        okCB && okCB();
      }
    })
    .catch((err) => console.log(err));
};

export const editTask = (okCB = null, { taskId, title }) => {
  axios
    .post(`${baseURL}/task/update`, { taskId, title })
    .then((res) => {
      if (res?.data?.resultCode === 1) {
        okCB && okCB();
      }
    })
    .catch((err) => console.log(err));
};

export const toggleTask = (okCB = null, { taskId }) => {
  axios
    .post(`${baseURL}/task/toggle`, { taskId })
    .then((res) => {
      if (res?.data?.resultCode === 1) {
        okCB && okCB();
      }
    })
    .catch((err) => console.log(err));
};

export const deleteTask = (okCB = null, { taskId }) => {
  axios
    .post(`${baseURL}/task/delete`, { taskId })
    .then((res) => {
      if (res?.data?.resultCode === 1) {
        okCB && okCB();
      }
    })
    .catch((err) => console.log(err));
};
