import bcrypt from "bcryptjs";
import { prisma } from "../lib/prisma.js";
import jwt from "jsonwebtoken";
import type { Request, Response } from "express";

type signup = {
  username: string;
  email: string;
  password: string;
};

//get user details from frontend
//validation - not empty
//check if user already exists: username , email
//check for images , check for avatar
//upload them to cloudinary,avatar
//create user objectc- create entry db
//remove password and refresh token field from response
//check for user creation
//return res

export async function signup(req: Request, res: Response) {
  try {
    const { username, email, password } = req.body as signup;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    const existingUser = await prisma.user.findUnique({
      where: { email: email },
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "user already exist",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    return res
      .status(201)
      .json({ success: true, message: "user created successfully" });
  } catch (error) {
    console.log(error);

    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

export async function signin(req: Request, res: Response) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "all fields required" });
    }

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isPasswordvalid = await bcrypt.compare(password, user.password);

    if (!isPasswordvalid) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    if (!process.env.JWT_SECRET) {                     //checks secret token is there or not
      throw new Error("JWT_SECRET not defined");
    }

    const generateToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {      //generates token
      expiresIn: "7d",
    });

    res.cookie("token", generateToken, {                                //sends token in cookie to browser
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({ success: true, message: "Login successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}
