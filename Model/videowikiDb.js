const knex=require("../Model/knex")

let insertDetails=(userDetails)=>{
    return knex.from("register").insert(userDetails)
}
let login = (user)=>{
    return knex.select("email","password").from('register').havingIn("email",user.email)
}

module.exports={insertDetails,login}