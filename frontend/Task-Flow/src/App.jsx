import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import PrivateRoutes from "./routes/PrivateRoutes";
import Layout from "./components/layout/Layout";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import AdminDashboard from "./pages/Admin/Dashboard";
import CreateTask from "./pages/Admin/CreateTask";
import UserDashboard from "./pages/Users/Dashboard";
import MyTasks from "./pages/Users/MyTasks";

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route element={<PrivateRoutes requiredRole="admin" />}>
        <Route element={<Layout />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/tasks" element={<CreateTask />} />
        </Route>
      </Route>

      <Route element={<PrivateRoutes requiredRole="user" />}>
        <Route element={<Layout />}>
          <Route path="/user/dashboard" element={<UserDashboard />} />
          <Route path="/user/tasks" element={<MyTasks />} />
        </Route>
      </Route>

      <Route path="/" element={<Navigate to="/login" />} />
    </Routes>
  );
};

export default App;