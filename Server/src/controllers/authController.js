import admin from "../config/firebaseConfig.js"; // Firebase admin config
import userModel from "../models/userModel.js"; // Mongoose model for users
import bcrypt from "bcrypt"; // For password hashing
import jwt from "jsonwebtoken"; // For generating JWT tokens

// Register user
export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if the user already exists in MongoDB
    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists!!" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }

    // Create the user in Firebase Authentication
    const firebaseUser = await admin.auth().createUser({
      email,
      password,
      displayName: name,
    });

    // Create a new user in MongoDB
    const newUser = new userModel({
      name,
      email,
      password: bcrypt.hashSync(password, 10), // Hash password before saving
      cartData: {}, // Default empty cart data
      role: "user", // Default role is 'user'
    });

    await newUser.save();

    // Send response with the new user's details
    res.status(201).json({
      message: "User created successfully",
      user: { name: newUser.name, email: newUser.email },
    });
  } catch (error) {
    console.error("Error during user registration:", error);
    res.status(500).json({ message: "Error creating user", error });
  }
};

// Login user
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // First, verify the user through Firebase Authentication
    const firebaseUser = await admin.auth().getUserByEmail(email);

    // Find the user in MongoDB to get additional user details (name, hashed password, etc.)
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare the provided password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate a custom Firebase token for the user
    const firebaseToken = await admin.auth().createCustomToken(firebaseUser.uid);

    // Generate a JWT token for the user (this is used in your app for authentication purposes)
    const token = jwt.sign(
      { userId: user._id},
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Send back the token and user info in the response
    res.status(200).json({
      message: "Login successful",
      token,
      firebaseToken, // Optional: You can send the Firebase token to the client for Firebase-specific operations
      user: { name: user.name, email: user.email},
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Something went wrong", error });
  }
};
// Admin login
export const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  try {

    if (email !== process.env.ADMIN_EMAIL) {
      return res.status(403).json({ message: "Unauthorized email address" });
    }
    if (password !== process.env.ADMIN_PASSWORD) {
      return res.status(400).json({ message: "Invalid admin credentials" });
    }


  

    // Generate JWT token for the admin user
    const token = jwt.sign(
     email+password,
      process.env.JWT_SECRET
    );

    // Send back the token and user info in the response
    res.status(200).json({
      success: true,
      message: "Admin login successful",
      token
    });
  } catch (error) {
    console.error("Invalid Credentials", error);
    res.status(500).json({ success: "false", message: "Invalid Credentials" });
  }
};