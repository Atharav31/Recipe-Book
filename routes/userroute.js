const express = require("express");
const {
  handleCreateUser,
  handleDeleteUser,
  handleUpdateUser,
  handleGetuser,
  handleGetByuserId,
  handleLogin,
} = require("../controller/user");

const userrouter = express.Router();

userrouter.post("/signup", handleCreateUser);
userrouter.delete("/delete/:id", handleDeleteUser);
userrouter.patch("/update/:id", handleUpdateUser);
userrouter.get("/alluser", handleGetuser);
userrouter.get("/alluser/:id", handleGetByuserId);
userrouter.post("/login", handleLogin);

module.exports = { userrouter };
