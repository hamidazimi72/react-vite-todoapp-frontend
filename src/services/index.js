import axios from "axios";

import { BASEURI, PORT, PROTOCOL } from "./host";

const baseURL = `${PROTOCOL}://${BASEURI}:${PORT}`;

axios.defaults.timeout = 10000;
axios.defaults.baseURL = baseURL;

export const fetchAllTasks = (
  { page, limit, status, search },
  { okCB = null }
) => {
  axios
    .get(
      `/tasks?page=${page}&limit=${limit}&iscompleted=${status}${
        search ? `&search=${search}` : ``
      }`
    )
    .then((res) => {
      if (res?.data?.resultCode === 1) {
        okCB &&
          okCB({
            list: res?.data?.info?.tasks,
            totalCount: res?.data?.info?.totalCount,
          });
      }
    })
    .catch((err) => console.log(err));
};

export const addTask = (okCB = null, { title, completed }) => {
  axios
    .post(`/tasks`, { title, completed })
    .then((res) => {
      if (res?.data?.resultCode === 1) {
        okCB && okCB();
      }
    })
    .catch((err) => console.log(err));
};

export const editTask = (okCB = null, { taskId, title, completed }) => {
  axios
    .put(`/tasks/${taskId}`, { title, completed })
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
    .delete(`/tasks/${id}`)
    .then((res) => {
      if (res?.data?.resultCode === 1) {
        okCB && okCB();
      }
    })
    .catch((err) => console.log(err));
};
