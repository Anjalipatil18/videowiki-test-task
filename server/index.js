const express = require('express')
const app = express()
app.use(express.json())


const videowiki = require('../Route/videowiki')
app.use("/",videowiki);

app.listen(3000,()=>{
    console.log("server is listening port number 3000.....")
})
