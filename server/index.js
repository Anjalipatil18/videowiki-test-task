const express = require('express')
const app = express()
app.use(express.json())

const videowiki = require('../Route/videowiki')
app.use("/videowiki",videowiki);

const userInformation = require('../Route/userInformation')
app.use("/",userInformation);

app.listen(8081,()=>{
    console.log("server is listening port number 8081.....")
})
