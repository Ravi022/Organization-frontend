import { useEffect, useState } from "react";
import React from "react";
import { CgNotes } from "react-icons/cg";
import { MdLabelImportant } from "react-icons/md";
import { FaCheckDouble } from "react-icons/fa";
import { TbNotebookOff } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/auth";
import axios from "axios";

export default function Sidebar() {
  const [loading, setLoading] = useState(true); // State to manage loading status
  const [Data, setData] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const data = [
    {
      title: "All tasks",
      icon: <CgNotes />,
      path: "/",
    },
    {
      title: "Important tasks",
      icon: <MdLabelImportant />,
      path: "/importantTasks",
    },
    {
      title: "Completed tasks",
      icon: <FaCheckDouble />,
      path: "/completedTasks",
    },
    {
      title: "In Completed tasks",
      icon: <TbNotebookOff />,
      path: "/incompleteTasks",
    },
  ];

  const handleLogOut = () => {
    dispatch(authActions.logout());
    localStorage.clear("id");
    localStorage.clear("token");
  };

  useEffect(() => {
    const fetchAllTasks = async () => {
      try {
        const headers = {
          id: localStorage.getItem("id"),
          authorization: `Bearer ${localStorage.getItem("token")}`,
        };
        const response = await axios.get(
          "https://babaorgbackend-q2yk-git-main-102op.vercel.app/api/v2/getAllTasks",
          { headers }
        );
        console.log(response);
        setData(response.data.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      } finally {
        setLoading(false); // Set loading to false once data is fetched or an error occurs
      }
    };
    fetchAllTasks();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="loader"></div> {/* Replace with your loading spinner */}
      </div>
    );
  }

  return (
    <>
      <div>
        <div>{Data?.username}</div>
        <div>{Data?.email}</div>
        <hr className="my-2 border border-gray-500" />
      </div>
      <div className="py-2">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex flex-row gap-4 items-center hover:bg-gray-600 p-2 hover:rounded hover:border hover:border-gray-500 transition-all duration-300 cursor-pointer"
            onClick={() => navigate(item.path)}
          >
            {item.icon}
            {item.title}
          </div>
        ))}
      </div>
      <div>
        <button
          className="w-full rounded bg-gray-500 p-2 hover:border hover:border-gray-500 hover:bg-gray-600 transition duration-300"
          onClick={handleLogOut}
        >
          Log Out
        </button>
      </div>
    </>
  );
}
