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
        return res.json(result);
    }).catch((err)=>{
        res.send(err)
    });
});

videowiki.post("/error",(req,res,next)=>{
    const user={
                email:req.body.email ,
                password:req.body.password 
            }
    jwt.sign(user,"SECRET_KEY",(err,token)=>{
        res.json({
            token:"Bearer " + token
        })
    })
})

///Token verification function.
function verifyToken(req,res,next){
    const bearerHeader = req.headers.authorization;

    if(typeof bearerHeader !== 'undefined'){
        const bearerToken = bearerHeader.split(' ')[1];
        req.token=bearerToken; 
        next();

    }else{
       res.sendStatus(403);
    }
}

videowiki.post('/api/posts',verifyToken,(req,res,next)=>{
    jwt.verify((req.token),"SECRET_KEY",(err,authData)=>{
       if(err){
           res.sendStatus(403);
       }
    else {
        res.json({
        message:"post created....",
        authData
    });
    }
    })
});

module.exports=videowiki