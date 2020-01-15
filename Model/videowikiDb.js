const knex=require("../Model/knex")

let insertDetails=(userDetails)=>{
    return knex.from("register").insert(userDetails)
}
let login = ()=>{
    return knex.select('*').from('register')
}

module.exports={insertDetails,login}