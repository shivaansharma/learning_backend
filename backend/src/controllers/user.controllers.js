import { json } from 'express';
import {User} from '../models /user.model.js'
import { uplodeOnCloudinary } from '../utils/cloudinary.js';
const registerUser = async (req,res)=>{
    /*
     steps:
     1. get the user data from the frontend
     2. check if the incoming data is valid
     3. get extract the data
     4. check if the user exists : (userName , email)
         4.1 check for cover image and avatar(as they are compulsory fields)
             4.1.1 if image and avatar exist upload them to cloudinary
     5. if the user exists return a message that the user exists
     6. if the user does not exist return
     */

    const {username,email,fullname,avatar,password} = req.body;
    console.log("username : ",username)
    if(username===""){
         res.status(400).json({Error : "name not found"})
    }
    if(email==""){
        res.status(400).json({Error : "email not found"})
    }
    if(fullname==""){
        res.status(400).json({Error : "Fullname not found"})
    }
      if(avatar==""){
        res.status(400).json({Error:"avatar not found"})
    }
      if(password==""){
         res.status(400).json({Error:"password not found"})
    }
  const existedUser =   User.findOne({
        $or :[{username},{email}]
    })
    if(existedUser) res.status(400).json({Error:"user already exists"})
    const avatarLocalPath = req.files?.avatar[0]?.path
   const coverImageLocalPath = req.files?.coverImage[0]?.path
   if(!avatarLocalPath){
    res.status(409).json({Error:"avatar not found"})
   }
   const avatarCloudinary = await uplodeOnCloudinary(avatarLocalPath)
   const coverCloudinary = await uplodeOnCloudinary(coverImageLocalPath)

   if(!avatarCloudinary){
    res.status(400).json({Error:"avatar not uploaded "})
   }
 const user = await User.create({
    fullname,
    avatar : avatarCloudinary.url,
    email,
    username:username.toLowerCase(),
    password,
    coverImage : coverCloudinary?.url||""
   })
   const createdUser = User.findOne(user._id).select(
    "--password --refreshToken"
   )
   if(!createdUser){
    res.status(500).json({Error:"something went wrong"})
   }
   res.status(200).json({message :"user created succesfully"})
}
const loginUser = async (req,res)=>{
   res.status(200).send("hello")
}
export {registerUser,loginUser}