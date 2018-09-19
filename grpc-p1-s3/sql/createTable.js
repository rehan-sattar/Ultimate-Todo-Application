const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('todo.db')

try {
    db.serialize(function () {
        db.run(`CREATE TABLE IF NOT EXISTS Todos (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, description TEXT)`)
    })

} catch (error) {
    console.log(error)
}

db.close()