import React, { useState } from "react";
import { CiHeart } from "react-icons/ci";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { IoAddCircleSharp } from "react-icons/io5";
import axios from "axios";

export default function Cards({ home, setPopUp, data, fetchAllTasks }) {
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const handleOnClick = () => {
    setPopUp("fixed");
  };

  const handleCompleteTask = async (id) => {
    console.log(id);
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}api/v2/updateCompleteTask/${id}`,
        {},
        { headers }
      );
      if (response.status === 200) {
        console.log("Task updated:", response.data);
        fetchAllTasks(); // Refresh tasks after completion
      }
    } catch (error) {
      console.log("updateCompleteTask error:", error);
    }
  };

  const handleDeleteTask = async (id) => {
    console.log(id);
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL}api/v2/deleteTasks/${id}`,
        { headers }
      );
      if (response.status === 200) {
        console.log("Task deleted:", response.data);
        fetchAllTasks(); // Refresh tasks after deletion
      }
    } catch (error) {
      console.log("delete error:", error);
    }
  };

  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      {data?.tasks?.map((items, i) => (
        <div
          className="bg-gray-800 rounded-sm p-4 flex flex-col justify-between"
          key={i}
        >
          <div>
            <h3 className="text-xl font-bold">{items.title}</h3>
            <p className="text-left">{items.desc}</p>
          </div>
          <div className="mt-4 w-full flex flex-row justify-around items-center">
            <button
              className={`${
                items.complete
                  ? "bg-green-700 hover:bg-green-800"
                  : "bg-red-600 hover:bg-red-800"
              } px-2 py-1 rounded w-3/6`}
              onClick={() => handleCompleteTask(items._id)}
            >
              {items.complete ? "Completed" : "Incomplete"}
            </button>
            <div>
              <CiHeart className="text-2xl" />
            </div>
            <div>
              <FaEdit className="text-xl" />
            </div>
            <div
              onClick={() => {
                handleDeleteTask(items._id);
              }}
            >
              <MdDelete className="text-2xl" />
            </div>
          </div>
        </div>
      ))}
      {home && (
        <div
          className="flex flex-col justify-center items-center bg-gray-800 rounded-sm p-6 text-gray-300 hover:scale-105 hover:cursor-pointer transition-all duration-300 ease-in-out"
          onClick={handleOnClick}
        >
          <IoAddCircleSharp className="text-5xl fill-gray-400 hover:scale-105 transition-all duration-300 ease-in-out hover:text-6xl" />
          <h2 className="text-2xl mt-4">Add tasks</h2>
        </div>
      )}
    </div>
  );
}
