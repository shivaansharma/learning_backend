import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
const {Schema}= mongoose;

const userSchema = new Schema({
    username : {
        type : String,
        required : true,
        unique : true,
        lowercase : true,
        trim : true,
        index : true//is done for the ease of searching
    },
    email : {
        type : String,
        required : true,
        unique : true,
        lowercase : true,
        trim : true,
    },
    fullname : {
        type : String,
        required : true,
        trim : true,
        index : true
    },
    avatar : {
        type : String,
        required : true
    },
    coverimage : {
        type : String
    },
    watchHistory : [
        {
            type : Schema.Types.ObjectId,
            ref : "Video"
        }
    ],
    type : {
        type : String,
        required : true,
    },
    refreshToken : {
        type :String,
    }
},
{
    timestamps : true,
}

)
    //pre is a hook in mongoose used to do somthing before something
    userSchema.pre("save", async function(next){
        if(!this.isModified("password")) return next()
        this.password = await bcrypt.hash(this.password,10)
        next()
    })

    userSchema.methods.isPasswordCorrect = async function (password){
       return await bcrypt.compare(password,this.password);
    }

    userSchema.methods.generateAccessToken = function (){

      return  jwt.sign(
            {
                _id : this._id,
                email : this.email,
                username : this.username,
                fullname : this.fullname
            },
            process.env.ACCESS_TOKEN_SECRET,
            {
                expiresIn : process.env.ACCESS_TOKEN_EXPIRY
            }
        )
    }

    userSchema.methods.generateRefreshToken =function(){
      return  jwt.sign(
            {
                //payload
                _id:this._id,
            },
            //RefreshToken secret
            process.env.REFRESH_TOKEN_SECRET
            ,
            {
                expiresIn : process.env.REFRESH_TOKEN_EXPIRY
            }

        )
    }

export const User = mongoose.model("User",userSchema)