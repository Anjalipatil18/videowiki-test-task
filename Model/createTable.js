const knex=require("./knex")
knex.schema.createTable('createPost', (table) => {
    table.increments('id')
    table.string('post')
    table.integer('like/dislike')
    table.string('comment')
})
    .then(() => {
        console.log("table created")
    })
.catch((err) => { console.log(err); throw err 
})

