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

// videowiki.post('/login',(req,res)=>{
//     let email=req.body.email 
//     let password=req.body.password 
//     let response = postvideowiki.login()
//     response.then((result)=>{
//         for(let i=0; i<result.length; i++){
//             if((result[i]["email"]==email) && (result[i]["password"]==password)){
//                 let token=jwt.sign({"user":result},'Anjali')
//                 res.cookie(token)
//                 jwt.verify(token, 'Anjali', (err,data) => {
//                     res.send(data)
//                 })
//             }
//         }
//     })  
// });


videowiki.post("/login",(req,res)=>{
    const user={
        email:req.body.email ,
        password:req.body.password 
    }
    let response = postvideowiki.login()
    response.then((result)=>{
        for(let i=0; i<result.length; i++){
            if((result[i]["email"]==user.email)&&(result[i]["password"]==user.password)){
                jwt.sign(user,"SECRET_KEY",(err,token)=>{
                    res.cookie(token)
                    res.json({
                        token:token
                    })
                })
            }else{
                res.json({"status":"wrong","massage":"Your password Or Email wrong"})
            }
        }
    })
    
})

// Token verification function.
videowiki.post('/api/posts',(req,res)=>{
    const bearerHeader = req.headers.authorization;
    console.log(bearerHeader)
    const bearerToken = bearerHeader.split();
    // console.log(bearerToken)
    req.token=bearerToken; 
    jwt.verify((req.token),"SECRET_KEY",(authData,err)=>{
       if(authData){
            res.json({
            message:"post created....",authData
        });
       }
    else {
        res.sendStatus(403);
    }
    })
});

module.exports=videowiki