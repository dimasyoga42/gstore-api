import express from "express"
import { product, statusOrder, topUp } from "../controller/topup.controller.js"
const topup = express.Router()

topup.get("/product", product)
topup.post("/topup", topUp)
topup.get("/topup/:id", statusOrder)


export default topup;