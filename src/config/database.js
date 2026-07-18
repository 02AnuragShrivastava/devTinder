const mongoose=require('mongoose')


const connectDB=async ()=>{
 await mongoose.connect("mongodb+srv://Anurag_02:UZzkPqVVoso3maOB@cluster0.9ccog.mongodb.net/devTinder")
}

module.exports=connectDB;