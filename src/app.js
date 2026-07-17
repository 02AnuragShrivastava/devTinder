const express=require('express')


const app =express()

app.use("/",(req,res)=>{
    res.send("Welcome to the server")
})


app.listen(4500,()=>
{
    console.log("Server running on port 4500")
})