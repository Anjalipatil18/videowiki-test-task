// const socketIO = require('socket.io')(http); 
// console.log(socketIO)
const express = require('express')
const app = express()
app.use(express.json())

app.listen(3000,()=>{
    console.log("server is listening port number 3000.....")
})
// console.log("server is listening port number 3000.....")