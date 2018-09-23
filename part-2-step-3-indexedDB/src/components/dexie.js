import Dexie from "dexie";

const database = new Dexie('ultimateTodoApplication');

// creating a store for the db. id is set to incriment as AUTO_INC
database.version(1).stores({ todos: '++id' })

export default database;