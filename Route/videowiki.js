const express = require('express')
const videowiki = express.Router()
videowiki.use(express.json())
const jwt = require('jsonwebtoken')
const postvideowiki = require('../Model/videowikiDb')

videowiki.post('/register',(req,res)=>{
    var userDetails = {
        Username:req.body.Username,
        email:req.body.email, 
        password:req.body.password
    }
    let response = postvideowiki.insertDetails(userDetails)
    response.then((result)=>{
        console.log(result)
        let token=jwt.sign({"user":result},'Anjali')
        res.cookie(token)
        return res.json(result);
    }).catch((err)=>{
        res.send(err)
    });
});

videowiki.post('/login',(req,res)=>{
    let email=req.body.email 
    let password=req.body.password 
    let response = postvideowiki.login()
    console.log(response)
    response.then((result)=>{
        console.log(result)
        for(let i=0; i<result.length; i++){
            if((result[i]["email"]==email) && (result[i]["password"]==password)){
                let token=jwt.sign({"user":result},'Anjali')
                res.cookie(token)
                res.send("It's correct!")
            }
        }
    })  
});

module.exports=videowiki
