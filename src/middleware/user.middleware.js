import jwt from "jsonwebtoken";
import user from "../model/user.model.js";
export const userProtection = async (req, res, next) => {
    const token = req.cookies.jwt;

    if(!token) {
         return res.status(401).json({ message: "Unauthorized - No Token Provided" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized - Invalid Token" });
    }
     const users = await user.findById(decoded.userId).select("-password");
    if (!users) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = users;

    next();
}