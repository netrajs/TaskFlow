import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Layout from "./components/layout/Layout";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import AdminDashboard from "./pages/Admin/Dashboard";
import ManageTask from "./pages/Admin/ManageTask";
import CreateTask from "./pages/Admin/CreateTask";
import ManageUser from "./pages/Admin/ManageUser";
import UserDashboard from "./pages/Users/Dashboard";
import MyTasks from "./pages/Users/MyTasks";
import PrivateRoutes from "./routes/PrivateRoutes";
import { AuthProvider } from "./context/AuthContext";
import { TaskProvider } from "./context/TaskContext";

function App() {
  return (
    <AuthProvider>
      <TaskProvider>
        <div className="min-h-screen bg-[#f8fafc]">
          <Toaster
            position="top-right"
            toastOptions={{
              className: "font-sans text-sm font-medium",
              duration: 3000
            }}
          />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Navigate to="/login" replace />} />

            <Route element={<PrivateRoutes requiredRole="admin" />}>
              <Route path="/admin" element={<Layout />}>
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route path="tasks" element={<ManageTask />} />
                <Route path="create-task" element={<CreateTask />} />
                <Route path="task/:id" element={<CreateTask />} />
                <Route path="users" element={<ManageUser />} />
              </Route>
            </Route>

            <Route element={<PrivateRoutes requiredRole="user" />}>
              <Route path="/user" element={<Layout />}>
                <Route path="dashboard" element={<UserDashboard />} />
                <Route path="tasks" element={<MyTasks />} />
                <Route path="task/:id" element={<MyTasks />} />
              </Route>
            </Route>

            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </div>
      </TaskProvider>
    </AuthProvider>
  );
}

export default App;