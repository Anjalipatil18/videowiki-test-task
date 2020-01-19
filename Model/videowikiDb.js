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

module.exports={insertDetails,login,createPost}