const knex=require("./knex")
knex.schema.createTable('register', (table) => {
    table.increments('id')
    table.string('Username')
    table.string('email').unique()
    table.string('password')
})
    .then(() => {
        console.log("table created")
    })

.catch((err) => { console.log(err); throw err })
.finally(() => {
    knex.destroy();
});