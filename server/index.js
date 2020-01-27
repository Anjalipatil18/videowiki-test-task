const express = require('express')
// console.log(express)
const app = express()
// console.log(app)
app.use(express.json())
// console.log(app.use(express.json()))

const videowiki = require('../Route/videowiki')
app.use("/videowiki",videowiki);

app.listen(8081,()=>{
    console.log("server is listening port number 8081.....")
})
