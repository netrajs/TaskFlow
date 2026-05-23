const mongoose = require("mongoose");
const User = require("../models/User");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    
    // Seed initial users if none exist
    await seedUsers();
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

const seedUsers = async () => {
  try {
    const userCount = await User.countDocuments();
    if (userCount === 0) {
      console.log("No users found in database. Seeding default Admin and Regular User...");
      
      // Creating users (passwords will be hashed automatically by the pre-save middleware in User.js)
      await User.create([
        {
          name: "Admin User",
          email: "admin@taskflow.com",
          password: "admin123",
          role: "admin",
          profileImageUrl: "https://ui-avatars.com/api/?name=Admin+User&background=0052CC&color=fff",
        },
        {
          name: "Regular User",
          email: "user@taskflow.com",
          password: "user123",
          role: "user",
          profileImageUrl: "https://ui-avatars.com/api/?name=Regular+User&background=0065FF&color=fff",
        }
      ]);
      
      console.log("Database seeded successfully!");
      console.log("Default Admin: admin@taskflow.com / admin123");
      console.log("Default User:  user@taskflow.com / user123");
    }
  } catch (error) {
    console.error(`Error seeding database: ${error.message}`);
  }
};

module.exports = connectDB;
