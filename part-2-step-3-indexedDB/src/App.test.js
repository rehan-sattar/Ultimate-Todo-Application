const Dexie = require('dexie')

Dexie.dependencies.indexedDB = require('fake-indexeddb')
Dexie.dependencies.IDBKeyRange = require('fake-indexeddb/lib/FDBKeyRange')
const db = new Dexie("test");
db.version(1).stores({ testTodos: '++id' })
test('should add one item to database', (done) => {
  // expect.assertions(1);
  return db.table('testTodos')
    .add({
      title: 'test',
      description: 'something'
    }).then(id => {
      expect(id).toBe(1);
      done()
    })
});


  // it returns the response => undefined if successfull deleted!
test('should delete a record database', async (done) => {
  await db.table('testTodos')
    .delete(1)
    .then((res) => {
      expect(res).toBe(undefined);
      done()
    })
})


// update test

test('should delete a record database', async (done) => {
  await db.table('testTodos')
    .update(1, {
      title: 'test update',
      description: 'something updated'
    })
    .then((res) => {
      expect(res).toEqual(1);
      done()
    })
})

