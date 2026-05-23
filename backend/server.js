require("dotenv").config();
const express = require("express");
const cors = require("cors");

const connectDB = async () => {
  const db = require("./config/db");
  await db();
};

const app = express();

app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(express.json());

connectDB();

const seedAdmin = async () => {
  const User = require("./models/User")
  const bcrypt = require("bcryptjs")
  const existing = await User.findOne({email:"admin@taskflow.com"})
  if(!existing){
    const hashed = await bcrypt.hash("admin123",10)
    await User.create({
      name:"Admin", email:"admin@taskflow.com",
      password:hashed, role:"admin",
      profileImageUrl:"https://ui-avatars.com/api/?name=Admin&background=0052CC&color=fff"
    })
    console.log("Admin seeded: admin@taskflow.com / admin123")
  }
}
seedAdmin()

app.use("/uploads", express.static("uploads"));

app.use("/api/auth", require("./routes/authRoutes"))
app.use("/api/tasks", require("./routes/taskRoutes"))
app.use("/api/users", require("./routes/userRoutes"))

app.get("/", (req, res) => {
  res.json({ message: "TaskFlow API is running..." });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: err.message || "Internal Server Error",
    stack: process.env.NODE_ENV === "production" ? null : err.stack
  });
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
