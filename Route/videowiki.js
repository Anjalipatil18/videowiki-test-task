const express = require('express')
const videowiki = express.Router()
var cors = require('cors')
videowiki.use(cors())
videowiki.use(express.json())
const jwt = require('jsonwebtoken')
const postvideowiki = require('../Model/videowikiDb')

videowiki.get('/register',(req,res)=>{
    var userDetails = {
        username:req.query.username,
        email:req.query.email, 
        password:req.query.password
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
                email:req.query.email ,
                password:req.query.password 
            }
    let response=postvideowiki.login(user)
    response.then((result)=>{
        if(result.length==0){
            res.json({"massage":'your email is invalid'})
        }
        else if(result[0]["password"]==user.password){
            jwt.sign(user,"SECRET_KEY",(err,token)=>{
                res.cookie(token)
                res.json({
                    token:token
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
    const Header = req.headers.cookie;
    let splitToken=Header.split("=undefined; ")
    let Token = splitToken[splitToken.length -2]
    jwt.verify((Token),"SECRET_KEY",(err,authData)=>{
       if(err){
           res.sendStatus(403);
       }
    else {
        res.json({
        message:"get created....",
        authData,                   

    });

    }
    })
});

videowiki.get('/createPost',(req,res)=>{
    const createPost={
        user_id:req.query.user_id,
        post:req.query.post,
        caption:req.query.caption
    }
    let response = postvideowiki.createPost(createPost)
    response.then((result)=>{
        return res.json(result);
    }).catch((err)=>{
        res.send(err)
    });
})

videowiki.get('/getpost/:user_id',(req,res)=>{
    let user_id=req.params.user_id;
    let response=postvideowiki.postbyuser(user_id);
    response.then((result)=>{
        return res.json(result);
    }).catch((err)=>{
        res.send(err);
    })
})


videowiki.get('/createLikes',(req,res)=>{
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

videowiki.get("/get/:user_id/:post_id",(req,res)=>{
    let user_id=req.params.user_id;
    let post_id=req.params.post_id;
    let selectPost=postvideowiki.dataByUserId(post_id)
    let counter=0
    selectPost.then((result)=>{
        for(let i = 0; i<result.length; i++) {
            counter+=result[i]["like"]
       }
        return res.json({"massage":"likes_count","like":counter});
    }).catch((err)=>{
        res.send(err)
    });
})

// videowiki.get("/post",(req,res)=>{
//     let user={
//             account:req.query.account,
//             status:req.query.status
//         }
//     let response=postvideowiki.postdata(user);
//     response.then((result)=>{
//         res.send(result)
//     }).catch((err)=>{
//         res.send(err)
//     })
//     })

// videowiki.get("/get",(req,res)=>{
//     let response=postvideowiki.selectData();
//     response.then((result)=>{
//         let sum=0
//         let sum1=0
//         for(let i=0; i<result.length; i++){
//             if(result[i]['status']==1){
//                 console.log(result[i]['account'])
//                 sum=sum+result[i]['account']
//             }else if(result[i]['status']==0){
//                 sum1=sum1+result[i]['account']
//             }
//         }
//         console.log(sum,sum1)
//         // res.send(sum)        
//     }).catch((err)=>{
//         res.send(err)
//     })
//     })
    

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