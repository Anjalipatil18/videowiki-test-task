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
        post:req.body.post,
        like:req.body.like,
        comment:req.body.comment
    }
    let response = postvideowiki.createPost(createPost)
    let selectPost=postvideowiki.selctData()
    // console.log(selectPost)
    selectPost.then((posts)=>{
        console.log(posts)
    //     for(var i = posts.length-1; i >= 0; i--) {
    //         if(posts[i].post_likes.length > 0) { 
    //            for(var j = 0; j < posts[i].post_likes.length; j++) { 
    //                 if(posts[i].post_likes[j].like == true) { 
    //                     counter = counter + 1 
    //                 } 
    //                 else if(posts[i].post_likes[j].like == false) { 
    //                     counter = counter - 1 
    //                 } 
    //             } 
    //         } 
    //    }
        return res.json(result);
    }).catch((err)=>{
        res.send(err)
    });
})

module.exports=videowiki