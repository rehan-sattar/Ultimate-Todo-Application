const pg = require('pg');
var connectionString = process.env.DATABASE_URL || "postgres://root:root@localhost:5432/Todo";

const client = new pg.Client(connectionString);
client.connect();
const query = client.query(
    'CREATE TABLE IF NOT EXISTS Todos(id serial NOT NULL,title varchar(40) NOT NULL,description  varchar(255) NOT NULL,active boolean DEFAULT false, date date)');
query.on('end', () => { client.end(); });
