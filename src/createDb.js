const Database = require('better-sqlite3')
const db = new Database('vocabulary.db', { verbose: console.log })

const createTab = (db) => {
    const sql = `CREATE TABLE vocabulary (
        id INTEGER PRIMARY KEY AUTOINCREMENT,  
        name TEXT NOT NULL,
        text TEXT NOT NULL UNIQUE
    );`
    const stmt = db.prepare(sql)
    const res = stmt.run()
    console.log('vocabulary table', res)
  }

createTab(db)