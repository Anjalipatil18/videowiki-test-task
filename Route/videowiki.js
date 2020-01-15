const express = require('express')
const videowiki = express.Router()
videowiki.use(express.json())
const postvideowiki = require('../Model/videowikiDb')

videowiki.post('/videowiki',(req,res)=>{
    var userDetails = {
        username:req.body.username,
        email:req.body.email, 
        password:req.body.password
    }
    let response = postvideowiki.insertDetails(userDetails)
    response.then((result)=>{
        return res.json(result);
    }).catch((err)=>{
        res.send(err)
    });
});

module.exports=videowiki
