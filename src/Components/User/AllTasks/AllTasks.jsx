import React, { useEffect, useState } from "react";
import { IoAddCircleSharp } from "react-icons/io5";
import Cards from "../../Cards/Cards";
import InputData from "../../InputData/InputData";
import axios from "axios";

export default function AllTasks() {
  const [Data, setData] = useState();
  const [popUp, setPopUp] = useState("hidden");

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const fetchAllTasks = async () => {
    try {
      const response = await axios.get(
        `https://babaorgbackend-q2yk-git-main-102op.vercel.app/api/v2/getAllTasks`,
        { headers }
      );
      setData(response.data.data);
      console.log(response);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    fetchAllTasks();
  }, []);

  return (
    <>
      <div>
        <div
          className="w-full flex items-end justify-end p-4"
          onClick={() => setPopUp("fixed")}
        >
          <IoAddCircleSharp className="fill-gray-400 text-2xl hover:scale-105 hover:cursor-pointer transition-all duration-300 ease-in-out hover:text-4xl" />
        </div>
        {Data && (
          <Cards
            home={"true"}
            popUp={popUp}
            setPopUp={setPopUp}
            data={Data}
            fetchAllTasks={fetchAllTasks}
          />
        )}
      </div>
      <div>
        <InputData
          popUp={popUp}
          setPopUp={setPopUp}
          fetchAllTasks={fetchAllTasks}
        />
      </div>
    </>
  );
}
