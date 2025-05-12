import express from "express"
import { userProtection } from "../middleware/user.middleware.js" //middleware auth
import { addProduct, getOrder, getProduct, productDelete, productEdit } from "../controller/admin.controller.js"

const admin = express.Router()

admin.get('/admin/product', userProtection, getProduct)
admin.post('/admin/addproduct', userProtection, addProduct)
admin.patch('/admin/editproduct/:id', userProtection, productEdit)
admin.delete('/admin/deleteproduct/:id', userProtection, productDelete)

//route order
admin.get('/admin/order', userProtection, getOrder) //untuk memunculkan daftar order
admin.patch('/admin/editorder', userProtection) //untuk mengedit status order


export default admin