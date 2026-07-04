# TaskFlow — MERN Task Manager

A full-stack task management application built with the MERN stack, inspired by Atlassian Jira. Features a Kanban board, role-based access (Admin/User), and real-time task tracking.

---

## 🚀 Features

### Admin Panel
- Dashboard with task stats, donut chart, priority bar chart
- Kanban board — manage all tasks across Pending / In Progress / Completed
- Create, update, and delete tasks
- Assign tasks to team members with due dates, priority, and checklists
- Team Members page with per-user task stats
- Download team report

### User Panel
- Personal dashboard with own task stats and charts
- Kanban board — view and update assigned tasks
- Check off TODO items inside tasks
- Update task status by dragging or via modal

### Auth
- JWT-based authentication
- Role-based routing (admin vs user)
- Protected routes — unauthorized access auto-redirects
- Password hashing with bcryptjs

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, Vite, Tailwind CSS |
| Backend | Node.js, Express.js |
| Database | MongoDB, Mongoose |
| Auth | JWT, bcryptjs |
| Charts | Recharts |
| Icons | Lucide React |
| HTTP Client | Axios |

---

## 📁 Project Structure

```
taskflow/
├── backend/
│   ├── config/
│   │   └── db.js               # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js   # Register, Login, Profile
│   │   ├── taskController.js   # CRUD + Dashboard data
│   │   └── userController.js   # Team member management
│   ├── middleware/
│   │   └── authMiddleware.js   # JWT protect + adminOnly
│   ├── models/
│   │   ├── User.js             # User schema
│   │   └── Task.js             # Task schema
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── taskRoutes.js
│   │   └── userRoutes.js
│   ├── .env
│   └── server.js
│
└── frontend/Task-Flow/
    └── src/
        ├── components/
        │   ├── dashboard/      # Charts
        │   ├── layout/         # Sidebar, Layout
        │   ├── tasks/          # TaskCard
        │   └── ui/             # Modal, Badges, AvatarGroup
        ├── context/
        │   ├── AuthContext.jsx
        │   └── TaskContext.jsx
        ├── pages/
        │   ├── Admin/          # Dashboard, ManageTask, CreateTask, ManageUser
        │   ├── Auth/           # Login, Register
        │   └── Users/          # Dashboard, MyTasks
        ├── routes/
        │   └── PrivateRoutes.jsx
        └── utils/
            ├── ApiPaths.js
            └── axiosInstance.js
```

---

## ⚙️ Setup & Installation

### Prerequisites
- Node.js v18+
- MongoDB (local) or MongoDB Atlas
- npm

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/taskflow.git
cd taskflow
```

### 2. Backend setup
```bash
cd backend
npm install
```

Create a `.env` file in the backend folder:
```env
PORT=8000
MONGO_URI=mongodb://localhost:27017/taskflow
JWT_SECRET=your_super_secret_key_here
```

Start the backend:
```bash
node server.js
```

Expected output:
```
MongoDB Connected: 127.0.0.1
Server running on port 8000
Admin seeded: admin@taskflow.com / admin123
```

### 3. Frontend setup
```bash
cd frontend/Task-Flow
npm install
npm run dev
```

Frontend runs at: `http://localhost:5174`

---

## 🔐 Default Credentials

| Role | Email | Password |
|---|---|---|
| Admin | admin@taskflow.com | admin123 |
| User | Register a new account | — |

---

## 🌐 API Endpoints

### Auth
| Method | Endpoint | Access |
|---|---|---|
| POST | /api/auth/register | Public |
| POST | /api/auth/login | Public |
| GET | /api/auth/profile | Protected |

### Tasks
| Method | Endpoint | Access |
|---|---|---|
| GET | /api/tasks | Admin (all) / User (own) |
| GET | /api/tasks/dashboard-data | Admin only |
| GET | /api/tasks/user-dashboard-data | Authenticated |
| GET | /api/tasks/:id | Authenticated |
| POST | /api/tasks | Admin only |
| PUT | /api/tasks/:id | Admin only |
| DELETE | /api/tasks/:id | Admin only |
| PATCH | /api/tasks/:id/status | Authenticated |
| PATCH | /api/tasks/:id/todo | Authenticated |

### Users
| Method | Endpoint | Access |
|---|---|---|
| GET | /api/users | Admin only |
| GET | /api/users/:id | Admin only |

---

## 🗂️ Task Model

```json
{
  "title": "Design Homepage",
  "description": "Create a clean homepage layout...",
  "priority": "high",
  "status": "pending",
  "assignedTo": ["userId1", "userId2"],
  "dueDate": "2025-06-01",
  "todoChecklist": [
    { "text": "Create wireframe", "completed": false },
    { "text": "Build component", "completed": true }
  ],
  "attachments": ["https://figma.com/design/..."]
}
```

---

## 🔒 Auth Flow

1. User registers or logs in → receives JWT token
2. Token stored in `localStorage`
3. Every API request attaches `Authorization: Bearer <token>` header
4. On 401 response → token cleared + redirect to `/login`
5. Role-based routing:
   - `admin` → `/admin/dashboard`
   - `user` → `/user/dashboard`

---

## 📸 Screenshots

| Admin Dashboard | Kanban Board | Team Members |
|---|---|---|
| Stats + Charts | Drag & drop tasks | Per-user task counts |

---

## 🚧 Known Issues & Future Improvements

- [ ] Add drag-and-drop between Kanban columns
- [ ] Email notifications on task assignment
- [ ] File upload support for attachments
- [ ] Dark mode
- [ ] Mobile responsive sidebar

---

## 👨‍💻 Author

Built by **Netraj** — MERN Stack Developer

---

## 📄 License

MIT License — free to use and modify.
