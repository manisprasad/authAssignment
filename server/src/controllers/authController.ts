import { Request, Response } from "express";
import { UserModel, Iuser } from "../models/userModel";  // Assuming Iuser interface is properly defined
import { generateToken } from "../utils/jwtUtils";
import { comparePassword, hashPassword } from "../utils/hashUtils";

// interface of Register
interface RegisterBody {
    fullName: string;
    email: string;
    phone: string;
    dob: string;
    password: string;
}

//interface of Login
interface LoginBody {
    email: string;
    password: string;
}

// Register user function
export const registerUser = async (req: Request<{}, {}, RegisterBody>, res: Response): Promise<Response> => {
    try {
        const { fullName, email, phone, dob, password } = req.body;

        // Validate the user data
        if (!email || !fullName || !phone || !dob || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required: email, fullName, phone, dob, password.",
            });
        }

        // Check if user already exists
        const isUserExist = await UserModel.findOne({
            $or: [{ email }, { phone }],
        });

        if (isUserExist) {
            let message = "";
            if (isUserExist.email === email && isUserExist.phone === phone) {
                message = "Email and phone number already exist";
            } else if (isUserExist.email === email) {
                message = "Email already exists";
            } else {
                message = "Phone number already exists";
            }

            return res.status(409).json({
                success: false,
                message,
            });
        }

        // Hash the password
        const hashedPassword = await hashPassword(password);

        // Create a new user instance
        const newUser: Iuser = new UserModel({
            email,
            fullName,
            phone,
            dob,
            password: hashedPassword, // Use hashed password here
        });

        // Save the user to the database
        const savedUser = await newUser.save();
        console.log(savedUser?._id);

        // Generate JWT token
        const token = generateToken(savedUser._id as string);

        // Send the token in a secure cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 3600000, // 1 hour
            sameSite: 'strict',
        });

        return res.status(201).json({
            success: true,
            message: "User registered successfully",
        });

    } catch (error) {
        console.log("Error in register user", error);

        return res.status(500).json({
            success: false,
            message: "An error occurred while registering the user. Please try again later",
        });
    }
};

// Login user function
export const loginUser = async (req: Request<{}, {}, LoginBody>, res: Response) => {
    const { email, password } = req.body;

    // Validate the input
    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: "Both email and password are required.",
        });
    }

    // Find user by email
    const isUserExist: Iuser | null = await UserModel.findOne({ email });
    console.log(isUserExist?._id);
    if (!isUserExist) {
        return res.status(400).json({
            success: false,
            message: "User not found. Please check your email and try again.",
        });
    }

    // Compare the password
    const isPasswordValid = await comparePassword(password, isUserExist.password);

    if (!isPasswordValid) {
        return res.status(400).json({
            success: false,
            message: "Invalid password. Please try again.",
        });
    }

    // Generate JWT token
    const token = generateToken(isUserExist._id as string);

    // Send the token in a secure cookie
    res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 3600000, // 1 hour
        sameSite: 'strict',
    });

    return res.status(200).json({
        success: true,
        message: "Login successful",
    });
};
