const knex=require("./knex")

// knex.schema.createTable('post_likes', (table) => {
//     table.increments('id')
//     table.integer('user_id').unsigned();
//     table.foreign('user_id').references('register.id')
//     table.integer('post_id').unsigned();
//     table.foreign('post_id').references('createPost.post_id')
//     table.boolean('likes')
//     table.string('comment')
// })
knex.schema.createTable('userInformation',(table)=>{
    table.increments('id')
    table.string('Name')
    table.integer('Birthday')
    table.integer('Mobile')
    table.string('Gender')
    table.string('')
})
    .then(() => {
        console.log("table created")
    })
.catch((err) => { console.log(err); throw err 
})

