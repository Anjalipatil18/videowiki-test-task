const knex=require("./knex")

// knex.schema.createTable('register', (table) => {
//     table.increments('user_id')
//     table.string('username'),
//     table.string('email').unique(), 
//     table.string('password')
// })

// knex.schema.createTable('createPost', (table) => {
//     table.increments('post_id')
//     table.integer('user_id').unsigned();
//     table.foreign('user_id').references('register.user_id')    
//     table.string('post')
//     table.string('caption')
// })

// knex.schema.createTable('post_likes', (table) => {
//     table.increments('id')
//     table.string('username')
//     table.integer('user_id').unsigned();
//     table.foreign('user_id').references('register.user_id')
//     table.integer('post_id').unsigned();
//     table.foreign('post_id').references('createPost.post_id')
//     table.boolean('likes')
//     table.string('comment')
// })

// knex.schema.createTable('userInformation',(table)=>{
//     table.increments('id')
//     table.string('Name')
//     table.integer('Birthday')
//     table.integer('Mobile')
//     table.string('Gender')
//     table.string('location')
//     table.string('education')
//     table.string('experience')
// })

knex.schema.createTable('userInformation',(table)=>{
        table.increments('id')
        table.integer('account')
        table.integer('status')
    })

    .then(() => {
        console.log("table created")
    })
.catch((err) => { console.log(err); throw err 
})

