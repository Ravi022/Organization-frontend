// src/SignUp.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

const SignUp = () => {
  const navigate = useNavigate();

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  console.log("whatisLoggedIn:", isLoggedIn);
  if (isLoggedIn === true) {
    navigate("/");
  }

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Form validation
    if (
      formData.username === "" ||
      formData.email === "" ||
      formData.password === "" ||
      formData.confirmPassword === ""
    ) {
      alert("All fields are required");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const payload = {
      username: formData.username,
      email: formData.email,
      password: formData.password,
    };

    try {
      const response = await axios.post(
        // `${import.meta.env.VITE_API_KEY}api/v1/sign-in`,
        `${import.meta.env.VITE_API_URL}api/v1/sign-in`,
        payload
      );
      alert(response.data.message);
      setFormData({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      navigate("/login"); // Redirect to login after successful sign up
    } catch (error) {
      console.log("Error:", error);
      alert("An error occurred during sign-up. Please try again.");
    }
  };

  return (
    <div className="bg-gray-900 text-white p-2">
      <div className="h-[98vh] flex items-center justify-center">
        <div className="p-8 w-2/6 rounded bg-gray-800">
          <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-white">Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="bg-gray-700 px-3 py-2 my-3 w-full rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-white">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
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
            <div className="mb-4">
              <label className="block text-white">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="bg-gray-700 px-3 py-2 my-3 w-full rounded"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200"
            >
              Sign Up
            </button>
          </form>
          <div className="mt-4 text-center">
            <span>Already have an account? </span>
            <button
              onClick={() => navigate("/login")}
              className="text-blue-500 hover:underline"
            >
              Log In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
