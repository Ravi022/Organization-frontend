import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import axios from "axios";

export default function InputData({ popUp, setPopUp, fetchAllTasks }) {
  const [Data, setData] = useState({ title: "", desc: "" });

  const handleOnClick = () => {
    setPopUp("hidden");
  };

  const change = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const submitData = async () => {
    const payload = {
      title: Data.title,
      desc: Data.desc,
    };
    try {
      if (Data.title === "") {
        alert("All fields are required");
      } else {
        const response = await axios.post(
          `https://babaorgbackend-q2yk-git-main-102op.vercel.app/api/v2/create-task`,
          payload, // Correct payload structure
          { headers }
        );
        if (response.status === 200) {
          console.log("Response:", response.data);
          fetchAllTasks();
          setPopUp("hidden");
          setData({ title: "", desc: "" });
        }
      }
    } catch (error) {
      console.log("Error:", error);
      // Optionally, handle error (e.g., show an error message to the user)
    }
  };

  return (
    <>
      <div
        className={`${popUp} top-0 left-0 bg-gray-800 opacity-80 h-screen w-full`}
      ></div>
      <div
        className={`${popUp} top-0 left-0 bg-gray-700 bg-opacity-70 h-screen w-full flex flex-col justify-center items-center`}
      >
        <div className="w-2/6 bg-gray-900 p-4 rounded">
          <div
            className="flex flex-row justify-end w-full"
            onClick={handleOnClick}
          >
            <RxCross2 className="text-2xl fill-gray-500" />
          </div>
          <input
            type="text"
            placeholder="Title"
            name="title"
            className="px-3 py-2 rounded w-full bg-gray-700 my-3"
            value={Data.title}
            onChange={change}
          />
          <textarea
            name="desc"
            cols="30"
            rows="10"
            placeholder="Description.."
            className="px-3 py-2 rounded w-full bg-gray-950 mt-4"
            value={Data.desc}
            onChange={change}
          ></textarea>
          <button
            onClick={submitData}
            className="px-3 py-2 bg-blue-400 rounded text-black font-semibold text-xl flex flex-row justify-start item-end"
          >
            Submit
          </button>
        </div>
      </div>
    </>
  );
}
