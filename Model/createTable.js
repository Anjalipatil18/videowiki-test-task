const knex=require("./knex")
knex.schema.createTable('register', (table) => {
    table.increments('id')
    table.string('image')
    table.string('').unique()
    table.string('password')
})
    .then(() => {
        console.log("table created")
    })

.catch((err) => { console.log(err); throw err 
})

