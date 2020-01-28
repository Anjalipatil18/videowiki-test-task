const express = require('express')
const videowiki = express.Router()
var cors = require('cors')
videowiki.use(cors())
videowiki.use(express.json())
const jwt = require('jsonwebtoken')
const postvideowiki = require('../Model/videowikiDb')

videowiki.post('/register',(req,res)=>{
    var userDetails = {
        username:req.body.username,
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
            res.json({"massage":'Your password is invalid'})
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
        user_id:req.body.user_id,
        post:req.body.post,
        caption:req.body.caption
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
        like:req.body.like,
        dislike:req.body.dislike,
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
    let selectPost=postvideowiki.getdataById(post_id)
    selectPost.then((result)=>{
        let counter=0
        for(let i = 0; i<result.length; i++) {
            counter+=result[i]["like"]
       }
        return res.json({"massage":"likes_count","like":counter});
    }).catch((err)=>{
        res.send(err)
    });
})

videowiki.put("/update/:post_id",(req,res)=>{
    let post_id=req.params.post_id;
    let updateData={post:req.body.post};
    let response=postvideowiki.updatePost(updateData,post_id);
    response.then((result)=>{
        res.send("data updated")
    }).catch((err)=>{
        res.send(err)
    })
})

videowiki.get("/get/:")

videowiki.delete("/delete/:post_id",(req,res)=>{
    let post_id=req.params.post_id;
    let deleteData ={
        post:req.body.post
    }
    let response = postvideowiki.deleteByPostId(deleteData,post_id)
    response.then((result)=>{
        res.send("delete data!")
    }).catch((err)=>{
        res.send(err)
    })
})

module.exports=videowiki