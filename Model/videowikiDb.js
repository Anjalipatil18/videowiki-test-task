const knex=require("../Model/knex")

let insertDetails=(userDetails)=>{
    return knex.from("register").insert(userDetails)
}

let login = (user)=>{
    return knex.select("email","password").from('register').havingIn("email",user.email)
}

let createPost=(userDetails)=>{
    return knex.from("createPost").insert(userDetails)
}

let postbyuser=(user_id)=>{
    return knex.select('user_id','post','caption').from("createPost").where('user_id',user_id)
}

let createLikes =(likes)=>{
    return knex.from("post_likes").insert(likes)
}

let dataByUserId=(post_id)=>{
    return knex.select('*').from("post_likes").where('post_id',post_id)
}

let getHomepageData=()=>{
    return knex.select('createPost.user_id','').from("register").innerJoin('createPost').innerJoin('post_likes')
}

let updatePost=(post,post_id)=>{
    return knex('createPost').update(post).where('post_id',post_id)
}

let deleteByPostId=(post_id)=>{
    return knex('createPost').where('post_id',post_id).del()
}


module.exports={insertDetails,login,createPost,createLikes,dataByUserId,getHomepageData,updatePost,deleteByPostId,postbyuser}