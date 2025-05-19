import bcrypt from "bcrypt";
import userModel from "../models/User.js";
import { v4 as uuidv4 } from 'uuid';

//Register
export const registerUser = async (req, res) => {
    const { userName, email, password } = req.body;
    //External Error
    try {
        if (!userName || !email || !password) {
            return res.status(400).json({ error: "All fields must be filled" });
        }
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ error: "Email already exists" });
        }
        //Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new userModel({ userName, email, password: hashedPassword });
        //Success
        await newUser.save();
        res.status(201).json({ message: "User has been successfully created"});
    } 
    //Internal Error
    catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

//Login
export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    //External Error
    try {
    if (!user || !password) {
        return res.status(400).json({ error: "All fields must be filled" });
    }
    const user = await userModel.findOne({ email });
    if (!user) {
        return res.status(404).json({ error: "User not found" });
    };
    const verifyPassword = await bcrypt.compare(password, user.password);
    if (!verifyPassword) {
        return res.status(401).json({error:"Invalid input"})
    }
    //Modify Random String
    const randomString = uuidv4();
    const apiKey = `mern-${user._id}-${email}-${randomString}`;
    user.apiKey = apiKey;
    //Success
    await user.save();
    res.status(200).json({ message: "User has been successfully logged in", apiKey });
} 
//Internal Error
catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Internal Server Error" });
}
}