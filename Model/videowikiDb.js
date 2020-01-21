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

let createLikes =(likes)=>{
    return knex.from("post_likes").insert(likes)
}

let dataByUserId=(post_id)=>{
    return knex.select('*').from("post_likes").where('post_id',post_id)
}

module.exports={insertDetails,login,createPost,createLikes,dataByUserId}