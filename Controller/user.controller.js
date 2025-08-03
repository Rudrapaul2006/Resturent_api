import User from "../Models/user.model.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


//User Register :
export let userRegister = async (req, res) => {
    try {
        let { name, email, password, adress, phoneno, role } = req.body;
        if (!name || !email || !password || !adress || !phoneno || !role) {
            res.json({
                massage: "All Fields Are Required ..",
                success: true
            })
        }

        if (role != "user" && role != "admin") {
            return res.json({
                massage: "Role value must be admin or user ..",
                success: true
            })
        }

        let user = await User.findOne({ email });
        if (user) {
            return res.json({
                massage: "user already exists ..",
                success: false
            })
        }

        let hashpassword = await bcrypt.hash(password, 10);

        user = await User.create({
            name,
            email,
            password: hashpassword,
            adress,
            phoneno,
            role
        })

        let token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7D" });
        res.cookie("token", token);

        return res.json({
            massage: "User Created ..",
            user: user,
            success: true
        })
    } catch (error) {
        console.error(error);
        return res.json({
            massage: "User Not Created Something Error..",
            success: false
        })
    }
}


//User Login : 
export let userLogin = async (req, res) => {
    try {
        let { email, password } = req.body;
        if (!email || !password) {
            return res.json({
                massage: "All fields are required ..",
                success: false
            })
        }

        let user = await User.findOne({ email });
        if (!user) {
            return res.json({
                massage: "User not database ..",
                success: false
            })
        }

        let matchpass = bcrypt.compare(password, user.password);
        if (!matchpass) {
            return res.json({
                massage: "Password does not match ..",
                success: false
            })
        }

        let token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7D" });
        res.cookie("token", token);

        return res.json({
            massage: "User login successfully ..",
            user: { name: user.name, email: user.email, role: user.role },
            success: true
        })

    } catch (error) {
        console.error(error);
        return res.json({
            massage: "User Not Created Something Error..",
            success: false
        })
    }

}


//Get user profile :
export let userProfile = async (req, res) => {
    try {
        let token = req.cookies.token;
        if (!token) {
            return res.json({
                massage: "Token got expired or token not available .. (login first) ..",
                success: false
            })
        }

        let decoded = jwt.verify(token, process.env.JWT_SECRET);
        let user = await User.findById(decoded.id).select("-password");
        if (!user) {
            return res.json({
                massage: "User not available..",
                success: false
            })
        }

        return res.json({
            massage: "User profile fetched successfully..",
            user: user,
            success: false
        })

    } catch (error) {
        console.error(error);
        return res.json({
            massage: "User Not Created Something Error..",
            success: false
        })
    }
}


//User profile update :
export let updateProfile = async (req, res) => {
    try {
        let token = req.cookies.token;
        if (!token) {
            return res.json({
                massage: "Token not available or token got expired (login first)",
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

        let { name, adress, phoneno } = req.body;
        if (name) user.name = name;
        if (adress) user.adress = adress;
        if (phoneno) user.phoneno = phoneno;
        user.save();

        return res.json({
            massage: "User updated successfully (you cant change email,password or role)..",
            newuser: {name : user.name , adress : user.adress , phno : user.phoneno , role : user.role},
            success: false
        })

    } catch (error) {
        console.error(error);
        return res.json({
            massage: "User Not Updated Something Error..",
            success: false
        })
    }
}


//Logout User Profile :
export let logoutUser = async(req , res) => {

        try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(400).json({
                message: "User already logged out or token not found",
                success: false
            });
        }

        let decoded = jwt.verify(token, process.env.JWT_SECRET);
        let user = await User.findById(decoded.id);
        if (!user) {
            return res.json({
                massage: "User not found ..",
                success: false
            })
        }

        res.clearCookie("token");

        return res.status(200).json({
            message: "User logged out successfully",
            logout_user: {name : user.name , email : user.email , role : user.role},
            success: true
        });

    } 
    catch (error) {
        console.error("Logout error:", error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }

}


//Delete user profile :
export let userDelete  = async (req , res ) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(400).json({
                message: "User already logged out or token not found",
                success: false
            });
        }

        let decoded = jwt.verify(token, process.env.JWT_SECRET);
        let user = await User.findByIdAndDelete(decoded.id);
        if (!user) {
            return res.json({
                massage: "User not found ..",
                success: false
            })
        }

        return res.json({
            massage : "User's profile deleted ...",
            deleted_user: {name : user.name , email : user.email , role : user.role},
            success : false,
        })

    } catch (error) {
        console.error("Logout error:", error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
}


//Get all user Profile :
export let getallUser = async (req , res) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(400).json({
                message: "User already logged out or token not found",
                success: false
            });
        }

        let decoded = jwt.verify(token, process.env.JWT_SECRET);
        let user = await User.findById(decoded.id);
        if (!user) {
            return res.json({
                massage: "User not found ..",
                success: false
            })
        }

        let users = await User.find().select("-password");
        if(!users){
            return res.json({
                massage : "Profile not fetched successfully ...",
                success : false
            })
        }

        return res.json({
            massage: "User's profile's fetched successfully ...",
            users : users,
            success: true
        })

    } catch (error) {
        console.error("Logout error:", error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
}