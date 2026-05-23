const express = require("express");
const router = express.Router();
const {
  register,
  login,
  getProfile,
  updateProfilePhoto
} = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");
const { upload } = require("../middleware/upload");

router.post("/register", register);
router.post("/login", login);
router.get("/profile", protect, getProfile);
router.patch("/profile/photo", protect, upload.single("photo"), updateProfilePhoto);

module.exports = router;
