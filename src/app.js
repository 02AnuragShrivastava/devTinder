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


app.get("/user",async(req,res)=>{
    try{
        const users= await dbModel.find({})
        res.status(200).json({
            message:"User fetched successfully",
            users
        })
    }
    catch(err){
        res.status(400).json({
            message:"Something went wrong",
            err
        })
    }
})

//Get user by email

app.get("/userEmail",async (req,res)=>{
    try {
        //const user=await dbModel.findOne({email:"02anurag.com"}).exec()
        const user=await dbModel.findById({_id:"6a5bd63b5f1d4d8bf88a0aa9"}).exec()

        if(user.length===0){
            res.status(404).json({
                message:"User not found"
            })

        }
        res.status(200).json({
            message:"User found successfully",
            user
        })
    } catch (error) {
        res.status(400).json({
            message: "Something went wrong",error
        })
    }
})

app.delete("/deleteUser", async (req,res)=>{
    const userId=req.body.userId
    console.log(userId)
    try {
        const user=await dbModel.findByIdAndDelete(userId)
        //const user=await dbModel.findByIdAndDelete({_id:userId})

        //But we can't do const user = await dbModel.findByIdAndDelete({ userId })
        res.status(200).json({
            message:"User Deleted Successfully",
            user
        })
    } catch (error) {
        res.status(400).json({
            message:"Something went wrong",error
        })
    }
})


//Update the data of the user 
app.patch("/updateUser/:userId", async (req, res) => {

    const userId = req.params.userId;
    const data = req.body;

    try {

        const ALLOWED_UPDATE = [
            "firstName",
            "lastName",
            "password",
            "age",
            "gender",
            "photoUrl"
        ];

        const userAllowed = Object.keys(data).every((k) =>
            ALLOWED_UPDATE.includes(k)
        );

        if (!userAllowed) {
            return res.status(400).json({
                message: "Entry is not allowed to update"
            });
        }

        const user = await dbModel.findByIdAndUpdate(
            userId,
            data,
            {
                returnDocument: "after",
                runValidators: true
            }
        );

        return res.status(200).json({
            message: "User updated Successfully",
            user
        });

    } catch (error) {
        return res.status(400).json({
            message: "Something went wrong",
            error
        });
    }

});

connectDB().then(()=>{
    console.log("DataBase is connected successfully")
    app.listen(7777,()=>{
    console.log("Server is runnning on port 7777")
})
    
}).catch((err)=>{
    console.error("Failed to connect to a database")
})


