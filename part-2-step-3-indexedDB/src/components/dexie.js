import Dexie from "dexie";

const database = new Dexie('ultimateTodoApplication');

// creating a store for the db. id is set to incriment as AUTO_INC
database.version(1).stores({ todos: '++id' })

// Open the database
database.open().catch((e) => {
    console.error("Open failed: " + e);
});

export default database;