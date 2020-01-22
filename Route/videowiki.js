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
        jwt.sign(userDetails,"SECRET_KEY",(err,token)=>{
            res.json({
                token:"Bearer "+token
            })  
        })
        return res.json(token);
    }).catch((err)=>{
        res.send("your email is already exits use another email")
    });
});

videowiki.get("/login",(req,res)=>{
    const user={
                email:req.body.email ,
                password:req.body.password 
            }
    let response=postvideowiki.login(user)
    response.then((result)=>{
        if(result.length==0){
            res.json({"massage":'your email is invalid'})
        }
        else if(result[0]["password"]==user.password){
            jwt.sign(user,"SECRET_KEY",(err,token)=>{
                res.json({
                    token:"Bearer "+token
                })  
            })
        }
        else {
            res.json('wrong  password')
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

videowiki.post('/createPost',(req,res)=>{
    const createPost={
        post:req.body.post
    }
    let response = postvideowiki.createPost(createPost)
    response.then((result)=>{
        return res.json(result);
    }).catch((err)=>{
        res.send(err)
    });
})

videowiki.post('/createLikes',(req,res)=>{
    const createLikes={
        likes:req.body.likes,
        comment:req.body.comment,
        user_id:req.body.user_id,
        post_id:req.body.post_id
    }
    let response = postvideowiki.createLikes(createLikes)
    response.then((result)=>{
        return res.json(result);
    }).catch((err)=>{
        res.send(err)
    });
})

videowiki.get("/get/:post_id",(req,res)=>{
    let post_id=req.params.post_id;
    let selectPost=postvideowiki.dataByUserId(post_id)
    selectPost.then((result)=>{
        let counter=0
        for(let i = 0; i<result.length; i++) {
            if(result[i]["likes"]==1){
                counter+=1
            }
       }
        return res.json({"massage":"likes_count","like":counter});
    }).catch((err)=>{
        res.send(err)
    });
})

module.exports=videowiki