import userModel from "../models/User.js";

export const verifyApiKey = async (req, res, next) => {
   const {apiKey} = req.query;
   if (!apiKey) {
    return res.status(401).json({error: "API key is required"});
   }

   const parts = apiKey.split("-", 4);
   if (parts.length !== 4 || parts[0] !== "mern") {
    return res.status(401).json({error: "Invalid API key"});
   }

   const userId = parts [1];
   const email = parts[2];
   const user = await userModel.findOne({_id: userId, email, apiKey});
   if (!user) {return res.status(401).json({error: "Invalid API key"})};

   req.user=user;
   next();
}