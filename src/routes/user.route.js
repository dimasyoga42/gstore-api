import express from "express";
import { checkauth, login, logout, singup } from "../controller/user.controller.js";
import { userProtection } from "../middleware/user.middleware.js";

const user = express.Router()

user.post("/register", singup)
user.post("/login", login)
user.post("/logout", logout)
user.get("/checkauth", userProtection, checkauth)

export default user;