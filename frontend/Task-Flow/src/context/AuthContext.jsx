import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import ApiPaths from "../utils/ApiPaths";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const initializeAuth = async () => {
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        try {
          const response = await axiosInstance.get(ApiPaths.AUTH.GET_PROFILE);
          setUser(response.data);
          setToken(storedToken);
        } catch (error) {
          localStorage.removeItem("token");
        }
      }
      setLoading(false);
    };
    initializeAuth();
  }, []);

  const login = async (email, password) => {
    const res = await axiosInstance.post(ApiPaths.AUTH.LOGIN, { email, password });
    localStorage.setItem("token", res.data.token);
    setUser(res.data.user);
    setToken(res.data.token);
    return res.data.user;
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setToken(null);
    navigate("/login");
  };

  const register = async (name, email, password) => {
    const res = await axiosInstance.post(ApiPaths.AUTH.REGISTER, { name, email, password });
    localStorage.setItem("token", res.data.token);
    setUser(res.data.user);
    setToken(res.data.token);
    return res.data.user;
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
