const express = require("express");

const router = express.Router();

const authMiddleware =
  require("../middleware/authMiddleware");

const roleMiddleware =
  require("../middleware/roleMiddleware");

const {
  createUser,
  getUsers,
  deleteUser,
} = require("../controllers/adminController");

router.post(
  "/users",
  authMiddleware,
  roleMiddleware(
    "Admin",
    "Super Admin"
  ),
  createUser
);

router.get(
  "/users",
  authMiddleware,
  roleMiddleware(
    "Admin",
    "Super Admin"
  ),
  getUsers
);

router.delete(
  "/users/:id",
  authMiddleware,
  roleMiddleware(
    "Admin",
    "Super Admin"
  ),
  deleteUser
);

module.exports = router;