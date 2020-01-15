const knex=require("./knex")

let insertDetails=(userDetails)=>{
    return knex.from("register").insert(userDetails)
}

module.exports={insertDetails}