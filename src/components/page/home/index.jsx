import { useEffect, useState } from "react";

import {
  addTask,
  deleteTask,
  editTask,
  fetchAllTasks,
  // toggleTask,
} from "../../../services";

export const App = () => {
  const [task, setTask] = useState({ title: "", completed: false });
  const [list, setList] = useState([]);

  const fetchAllTasksHandler = () => {
    fetchAllTasks(setList);
  };

  const addTaskHandler = (e) => {
    e.preventDefault();
    if (!task?.title) window.alert("Please enter title!");
    //
    addTask(fetchAllTasksHandler, {
      title: task?.title,
      completed: task?.completed,
    });
    setTask({ title: "", completed: false });
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

  useEffect(() => {
    fetchAllTasksHandler();
  }, []);

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
        <div className="flex flex-col bg-slate-300 rounded mb-4">
          {list.length ? (
            list.map((item) => (
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
      </div>
    </>
  );
};
