//v2
export const BASE_URL = "https://taskflow-qbqy.onrender.com";

const ApiPaths = {
  AUTH: {
    LOGIN: "/api/auth/login",
    REGISTER: "/api/auth/register",
    GET_PROFILE: "/api/auth/profile",
  },
  TASKS: {
    GET_ALL: "/api/tasks",
    GET_BY_ID: (id) => `/api/tasks/${id}`,
    CREATE: "/api/tasks",
    UPDATE: (id) => `/api/tasks/${id}`,
    DELETE: (id) => `/api/tasks/${id}`,
    GET_DASHBOARD_DATA: "/api/tasks/dashboard-data",
    GET_USER_DASHBOARD_DATA: "/api/tasks/user-dashboard-data",
  },
  USERS: {
    GET_ALL: "/api/users",
    GET_BY_ID: (id) => `/api/users/${id}`,
  },
};

export default ApiPaths;
