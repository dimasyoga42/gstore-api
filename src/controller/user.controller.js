import { generateToken } from "../lib/token.js";
import bcrypt from "bcryptjs"
import user from "../model/user.model.js";
export const singup = async (req, res) => {
    const { email, password } = req.body;

    try {
        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be more than 6 characters" });
        }

        const users = await user.findOne({ email });
        if (users) {
            return res.status(400).json({ message: "Email already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        const newUser = new user({
            email: email,
            password: hashPassword,
        });
        if(newUser) {
            await newUser.save();     
            generateToken(newUser._id, res);
        

        res.status(201).json({
            email: newUser.email,
            //password: newUser.password,
        });
        }
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }

}
export const login = async (req, res) => {
    const {email, password} = req.body;
    const userValid = await user.findOne({email})
    if(!userValid) {
        return res.status(401).json({
            message: "email or password invalid"
        })
    }
    const passwordValidation = await bcrypt.compare(password, userValid.password)
    if(!passwordValidation) {
        return res.status(401).json({
            message: "email or password invalid"
        })
    }
    generateToken(userValid._id, res)
    res.status(200).json({
        message: "login sucses",
        id: userValid._id,
        email: userValid.email,
    })
    
}
export const logout = async (req, res) => {
     try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("Error in logout controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
export const checkauth = (req, res) => {
    try {
        res.status(200).json(req.user)
    } catch (error) {
        console.log("Error in checkAuth controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}