var sqlite3 = require('sqlite3').verbose()
var db = new sqlite3.Database('todo.db')

var data = [];
db.serialize(function () {


  db.run(`INSERT INTO Todos (title, description) VALUES ("hello", "world")`, function (err, data) {
  })

  // db.each(`SELECT * FROM Todos WHERE id = 2`, function (err, row) {
  //   data.push(row);
  // }, function (err, rowCount) {
  //   console.log(data);
  // });

  db.each(`SELECT * FROM Todos`, function (err, row) {
    data.push(row);
  }, function (err, rowCount) {
    console.log(data);
  });

});




db.close

