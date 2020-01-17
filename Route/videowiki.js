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

videowiki.get("/login",(req,res)=>{
    const user={
                email:req.body.email ,
                password:req.body.password 
            }
    let response=postvideowiki.login()
    response.then((result)=>{
        for(let i=0; i<result.length; i++){
            if((result[i]["email"]==user.email) && (result[i]["password"]==user.password)){
                jwt.sign(user,"SECRET_KEY",(err,token)=>{
                        res.json({
                            token:"Bearer "+token
                        })
                    })
            }
        }


    })
    
})

///Token verification function.
videowiki.get('/verification',(req,res)=>{
    const bearerHeader = req.headers.authorization;
    const bearerToken = bearerHeader.split(' ')[1];
    jwt.verify((bearerToken),"SECRET_KEY",(err,authData)=>{
       if(err){
           res.sendStatus(403);
       }
    else {
        res.json({
        message:"get created....",
        authData
    });
    }
    })
});

module.exports=videowiki