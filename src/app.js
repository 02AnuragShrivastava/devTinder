const express=require('express')
const connectDB=require('./config/database')
const dbModel=require('./models/dataModel')


const app=express()


app.use(express.json())


app.post("/signUp",async (req,res)=>{
    // const User= new dbModel({
    //     firstName:"Anurag",
    //     lastName:"Shrivastava",
    //     email:"02anurag.com",
    //     password:"12345",
    //     age:25,
    //     gender:"Male"
    // })

    // try {
    //     await User.save()
    // res.status(201).json({
    //     message:"Data added successfully",User
    // })
    // } catch (error) {
    //     res.status(400).json({
    //         message:"Database not able to connect"
    //     })
        
    // }


    const User =new dbModel(req.body)
    try{

        await User.save()
        res.status(200).json({
            message:"Data fetched successfully",
            User
        })

    }catch(err){
        res.status(400).json({
            message:"Data not fetched ",err
        })

    }
})

connectDB().then(()=>{
    console.log("DataBase is connected successfully")
    app.listen(7777,()=>{
    console.log("Server is runnning on port 7777")
})
    
}).catch((err)=>{
    console.error("Failed to connect to a database")
})


