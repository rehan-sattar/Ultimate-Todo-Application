
const { Client } = require('pg')
const connectionString = 'postgresql://root:root@localhost:5432/todo'
const db = new Client({
    connectionString: connectionString,
})
db.connect((err) => {
    if (err) {
        console.error('connection error', err.stack)
    } else {
        console.log('Postgres Connected')
    }
})


// insert into db
try{
db.query('INSERT INTO Todos (title, description, date) VALUES ($1, $2, $3)', ["Kam karna hai", "Kam kar k Paisa Kamana hai", new Date()], (err) => {
  if (err) throw err;
  console.log("Insert Query Passed")
})
}catch (err){if(!err){  console.log("Get One Query Passed")
}}


// select all todos
try{
  db.query(`SELECT * FROM Todos`, (err, res) => {
    if (err) throw err;
    console.log("Get All Query Passed")
})
}catch (err){if(!err){  console.log("Get One Query Passed")
}}

// get one record
try{
const query = {
  name: 'fetch-todo',
  text: 'SELECT * FROM Todos WHERE id = $1',
  values: [2]
}
db.query(query, (err, res) => {
  if (err) throw err;
})
}catch (err){if(!err){  console.log("Get One Query Passed")
}}


