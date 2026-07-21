const mongoose=require('mongoose')

const userSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        minLength:4,
        maxLength:20,
        trim:true
    },
    lastName:{
        type:String
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        min:18
    },
    gender:{
        type:String,
        enum:["Male","Female","Other"]
    },
    photoUrl:{
        type:String
    },
    skills:{
        type:[String]    
    },
    about:{
        type:String,
        default:"This is the default about"
    }
})

const dbModel=mongoose.model("User",userSchema)

module.exports=dbModel;