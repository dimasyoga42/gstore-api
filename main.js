import express from "express"
import dotenv from "dotenv"
import { IsConnect } from "./src/lib/db.js"
import user from "./src/routes/user.route.js";
import cookieParser from "cookie-parser";
import serverless from "serverless-http";
import cors from "cors"
import topup from "./src/routes/topup.routes.js";
import admin from "./src/routes/admin.route.js";
import helmet from "helmet";
dotenv.config();
const app  = express();
const port = 3000

app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.use(helmet())

app.use("/api", user)
app.use("/api/store", topup)
app.use("/api/dashboard", admin)
IsConnect()
app.listen(port, () => {
    console.log("server is running on port:" + port);
    //IsConnect()
}) 