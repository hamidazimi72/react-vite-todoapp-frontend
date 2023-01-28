import { useEffect, useState } from "react";

import {
  addTask,
  deleteTask,
  editTask,
  fetchAllTasks,
} from "../../../services";

export const App = () => {
  let [task, setTask] = useState({ title: "", completed: false });
  let [data, setData] = useState({ list: [], totalCount: 0 });
  let [search, setSearch] = useState("");
  let [limit, setLimit] = useState(4);
  let [status, setStatus] = useState("all");
  let [page, setPage] = useState(1);

  const limitValues = [1, 2, 3, 4, 5, 10, 20, 50, 100];

  const fetchAllTasksHandler = () => {
    fetchAllTasks({ page, limit, status, search }, { okCB: setData });
  };

  const filteredTasks = (e) => {
    if (e) e.preventDefault();
    fetchAllTasks({ page, limit, status, search }, { okCB: setData });
  };

  const addTaskHandler = (e) => {
    e.preventDefault();
    if (!task?.title) window.alert("Please enter title!");
    else {
      addTask(fetchAllTasksHandler, {
        title: task?.title,
        completed: task?.completed,
      });
      setTask({ title: "", completed: false });
    }
  };

  const editTaskHandler = (item) => {
    const newTitle = window.prompt("Enter new title:", item?.title);
    if (!newTitle) return;

    editTask(fetchAllTasksHandler, {
      taskId: item?.id,
      title: newTitle,
      completed: item?.completed,
    });
  };

  const toggleTaskHandler = (item) => {
    editTask(fetchAllTasksHandler, {
      taskId: item?.id,
      title: item?.title,
      completed: !item?.completed,
    });
  };

  const deleteTaskHandler = (item) => {
    if (window.confirm("Are you sure?")) {
      deleteTask(fetchAllTasksHandler, {
        id: item?.id,
      });
    }
  };

  const prevPageHandler = () => setPage(page - 1);
  const nextPageHandler = () => setPage(page + 1);

  useEffect(() => {
    fetchAllTasksHandler();
  }, [limit, status, page]);

  return (
    <>
      <h1 className="text-5xl font-bold text-center text-sky-700 mb-8">
        Task Manager App
      </h1>
      <div>
        <form
          className="bg-slate-300 rounded p-4 mb-6"
          onSubmit={(e) => addTaskHandler(e)}
        >
          <div className="flex mb-1">
            <input
              value={task?.title}
              onChange={(e) => setTask({ ...task, title: e?.target?.value })}
              className="h-10 px-4 text-lg grow border border-r-0 rounded-tl-md rounded-bl-md"
            />
            <button className="h-10 px-4 rounded-tr-md rounded-br-md bg-sky-500 text-white">
              Add Task
            </button>
          </div>
          <div className="flex items-center gap-1">
            <input
              id="completed"
              type="checkbox"
              checked={task?.completed}
              onChange={(e) =>
                setTask({ ...task, completed: e.target.checked })
              }
            />
            <label htmlFor="completed" className="select-none cursor-pointer">
              The task is completed.
            </label>
          </div>
        </form>
        {/*  */}
        <div className="flex gap-2 justify-between items-center mb-6">
          <div className="flex gap-2">
            <span className="inline-flex items-center gap-1">
              <label htmlFor="allSelected">All</label>
              <input
                type="radio"
                id="allSelected"
                value="all"
                onChange={() => {
                  setStatus("all");
                  setPage(1);
                }}
                checked={status === "all"}
              />
            </span>
            <span className="inline-flex items-center gap-1">
              <label htmlFor="completedSelected">Completed</label>
              <input
                type="radio"
                id="completedSelected"
                value="true"
                onChange={() => {
                  setStatus("true");
                  setPage(1);
                }}
                checked={status === "true"}
              />
            </span>
            <span className="inline-flex items-center gap-1">
              <label htmlFor="inProgressSelected">In progress</label>
              <input
                type="radio"
                id="inProgressSelected"
                value="false"
                onChange={() => {
                  setStatus("false");
                  setPage(1);
                }}
                checked={status === "false"}
              />
            </span>
          </div>
          {/*  */}
          <div>
            <select
              onChange={(e) => {
                setLimit(e.target.value);
                setPage(1);
              }}
              value={limit}
            >
              {limitValues.map((item, i) => (
                <option key={i} defaultValue={limit}>
                  {item}
                </option>
              ))}
            </select>
          </div>
        </div>
        {/*  */}
        <form
          className="bg-slate-300 rounded p-4 mb-6"
          onSubmit={(e) => filteredTasks(e)}
        >
          <div className="flex mb-1">
            <input
              value={search}
              onChange={(e) => setSearch(e?.target?.value)}
              className="h-10 px-4 text-lg grow border border-r-0 rounded-tl-md rounded-bl-md"
            />
            <button className="h-10 px-4 rounded-tr-md rounded-br-md bg-sky-500 text-white">
              Filter
            </button>
          </div>
        </form>
        {/*  */}
        <div className="flex flex-col bg-slate-300 rounded mb-4">
          {data?.list.length ? (
            data?.list.map((item) => (
              <div
                className="flex flex-grow items-center p-4 border-b border-slate-400 last:border-none"
                key={item?.id}
              >
                <span className="text-lg font-semibold w-full">
                  {item?.title}
                </span>
                <div className="flex">
                  <button
                    className={`w-24 ${
                      item?.completed ? `bg-emerald-500` : `bg-slate-400`
                    } text-white rounded-tl-md rounded-bl-md p-2`}
                    onClick={() => toggleTaskHandler(item)}
                  >
                    Toggle
                  </button>
                  <button
                    className="w-24 bg-yellow-400 text-white p-2"
                    onClick={() => editTaskHandler(item)}
                  >
                    Edit
                  </button>
                  <button
                    className="w-24 bg-red-500 text-white rounded-tr-md rounded-br-md p-2"
                    onClick={() => deleteTaskHandler(item)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <h2 className="text-center py-6 px-1 text-2xl text-slate-400">
              the list is empty!
            </h2>
          )}
        </div>
        {/*  */}
        {data?.totalCount ? (
          <div className="flex justify-center items-center gap-2">
            <button
              className={`w-12 h-12 bg-purple-500 text-white flex justify-center items-center rounded ${
                page === 1 ? `cursor-not-allowed` : `cursor-pointer`
              } disabled:bg-purple-300`}
              disabled={page === 1}
              onClick={prevPageHandler}
            >
              prev
            </button>
            <div>
              page {page} of {Math.ceil(data?.totalCount / limit)}
            </div>
            <button
              className={`w-12 h-12 bg-purple-500 text-white flex justify-center items-center rounded ${
                page === Math.ceil(data?.totalCount / limit)
                  ? `cursor-not-allowed`
                  : `cursor-pointer`
              } disabled:bg-purple-300`}
              disabled={page === Math.ceil(data?.totalCount / limit)}
              onClick={nextPageHandler}
            >
              next
            </button>
          </div>
        ) : null}
      </div>
    </>
  );
};
