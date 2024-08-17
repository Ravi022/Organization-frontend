import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom
import axios from "axios";
import { authActions } from "../../../store/auth";
import { useDispatch } from "react-redux";
const LogIn = () => {
  const [formData, setFormData] = useState({
    username: "", // Changed 'email' to 'username'
    password: "",
  });
  const dispatch = useDispatch();

  const navigate = useNavigate(); // Define navigate using useNavigate hook

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.username === "" || formData.password === "") {
      alert("All fields are required");
      return;
    }

    const payload = {
      username: formData.username,
      password: formData.password,
    };

    try {
      const response = await axios.post(
        // `${import.meta.env.VITE_API_URL}api/v1/log-in`,
        "https://babaorgbackend-q2yk-git-main-102op.vercel.app/api/v1/log-in",
        payload
      );
      console.log(response.data.id, response.data.token);
      localStorage.setItem("id", response.data.id);
      localStorage.setItem("token", response.data.token);
      dispatch(authActions.login());
      navigate("/");
      setFormData({
        username: "",
        password: "",
      });
    } catch (error) {
      if (error.response) {
        console.log("Response data:", error.response.data);
        console.log("Response status:", error.response.status);
        console.log("Response headers:", error.response.headers);
      } else if (error.request) {
        console.log("Request data:", error.request);
      } else {
        console.log("Error message:", error.message);
      }
      alert("An error occurred during log-in. Please try again.");
    }
  };

  return (
    <div className="bg-gray-900 text-white p-2">
      <div className="h-[98vh] flex items-center justify-center">
        <div className="p-8 w-full max-w-md rounded bg-gray-800">
          <h2 className="text-2xl font-bold mb-6 text-center">Log In</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-white">Username</label>
              <input
                type="text"
                name="username"
                value={formData.username} // Use 'username' instead of 'email'
                onChange={handleChange}
                className="bg-gray-700 px-3 py-2 my-3 w-full rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-white">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="bg-gray-700 px-3 py-2 my-3 w-full rounded"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200"
            >
              Log In
            </button>
          </form>
          <div className="mt-4 text-center">
            <span>Don’t have an account? </span>
            <button
              onClick={() => navigate("/signUp")}
              className="text-blue-500 hover:underline"
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
