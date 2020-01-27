const knex=require("../Model/knex")

let insertDetails=(userDetails)=>{
    return knex.from("userInformation").insert(userDetails)
}

module.exports={insertDetails}