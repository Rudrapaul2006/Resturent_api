import User from "../Models/user.model.js";
import jwt from 'jsonwebtoken';

export let isAdmin = async (req, res, next) => {
    try {
        let token = req.cookies.token;
        if (!token) {
            return res.json({
                massage: "Token got expired or token not available (login first) ..",
                success: false
            })
        }

        let decoded = jwt.verify(token, process.env.JWT_SECRET);
        let user = await User.findById(decoded.id);
        if (!user) {
            return res.json({
                massage: "User not found ..",
                success: false
            })
        }

        if (user.role === "user"){
            return res.json({
                massage : "User can't fetched profile's .. (Only Admin's can)",
                success : false 
            })
        }
        
        // if ( user.role !== "admin") {
        //     res.json({
        //         massage: "user not found ..",
        //         success: false
        //     })
        // } 

        req.user = user;
        next();

    } catch (error) {
        console.error("Logout error:", error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
} 