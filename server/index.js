const socketIO = require('socket.io'); 
const express = require('express')
const app =express()
app.use(express.json())

app.listen(3000,()=>{
    console.log("server is listening port number 3000.....")
})