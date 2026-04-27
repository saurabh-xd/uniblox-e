import bcrypt from "bcryptjs"
import { prisma } from "../lib/prisma.js"
import jwt from 'jsonwebtoken'

type signup = {
    username: string,
    email: string,
    password: string
}

//get user details from frontend
//validation - not empty
//check if user already exists: username , email
//check for images , check for avatar
//upload them to cloudinary,avatar
//create user objectc- create entry db
//remove password and refresh token field from response
//check for user creation
//return res

export async function signup(req: Request,res: Response){

     try {
      const {username, email, password} = req.body as unknown as signup
 
      if(!username || !email || !password){
           return res.status(400).json({ message: "All fields required" })
      }
 
      const existingUser = await prisma.user.findUnique({
         where: {email: email},
      })
 
      if(existingUser){
         return res.json("user already exist")
      }
 
 
      const hashedPassword = await bcrypt.hash(password, 10);
 
      const user = await prisma.user.create({
         data: {
             username,
             email,
             password: hashedPassword
         }
      })

      if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET not defined")
}
 
      const generateToken  = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: '7d'});
 
      res.cookie('token', generateToken ,  {
             httpOnly:  true,
             secure: process.env.NODE_ENV === 'production',
             sameSite:  process.env.NODE_ENV === 'production'? 'none' : 'strict',
             maxAge: 7 * 24 * 60 * 60 * 1000
         })

         return res.json({success: true, message: "user created successfully"})
 
     } catch (error) {

      res.json({success: false, message: error.message})
      
     }
      


}

export async function signin(req: Request, res: Response){

  try {
    const {email, password} = req.body;
 
    if(!email || !password){
       return res.status(400).json({message: "all fields required"})
    }
 
    const user = await prisma.user.findUnique({
       where: {
          email
       }
    })

if(!user){
   return res.status(409).json({ message: "User already exists" })
}

const isPasswordvalid = await bcrypt.compare(password, user.password)

if(!isPasswordvalid){
   return res.json({message: "password is incorrect"})
}

if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET not defined")
}

 const generateToken  = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: '7d'});

  res.cookie('token', generateToken ,  {
             httpOnly:  true,
             secure: process.env.NODE_ENV === 'production',
             sameSite:  process.env.NODE_ENV === 'production'? 'none' : 'strict',
             maxAge: 7 * 24 * 60 * 60 * 1000
         })

  return res.json({success: true, message: "user created successfully"})
 
     } catch (error) {

      res.status(500).json({ message: "Internal server error" })
      
     }





}