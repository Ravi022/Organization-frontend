import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./Components/Authentication/Login/Login.jsx";
import SignUp from "./Components/Authentication/SignUp/SignUp.jsx";
import Layout from "./Layout.jsx";
import Admin from "./Components/Admin/Admin.jsx";
import AdminLayout from "./Components/Admin/AdminLayout.jsx";
import AllTasks from "./Components/User/AllTasks/AllTasks.jsx";
import CompletedTasks from "./Components/User/CompletedTasks/CompletedTasks.jsx";
import ImportantTasks from "./Components/User/ImportantTasks/ImportantTasks.jsx";
import IncompletedTasks from "./Components/User/IncompletedTasks/IncompletedTasks.jsx";
import { Provider } from "react-redux";
import store from "./store/index.js";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "/",
        element: <AllTasks />,
      },
      {
        path: "/completedTasks",
        element: <CompletedTasks />,
      },
      {
        path: "/importantTasks",
        element: <ImportantTasks />,
      },
      {
        path: "/incompleteTasks",
        element: <IncompletedTasks />,
      },
    ],
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute>
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "/admin",
        element: <Admin />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signUp",
    element: <SignUp />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
