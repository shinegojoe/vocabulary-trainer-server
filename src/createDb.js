const Database = require('better-sqlite3')
const db = new Database('vocabulary.db', { verbose: console.log })

const createScript = (db) => {
    const sql = `CREATE TABLE script (
        id INTEGER PRIMARY KEY AUTOINCREMENT,  
        name TEXT NOT NULL,
        text TEXT NOT NULL UNIQUE
    );`
    const stmt = db.prepare(sql)
    const res = stmt.run()
    console.log('script table', res)
  }

const createVocabulary = (db) => {
  const sql = `CREATE TABLE vocabulary (
    id INTEGER PRIMARY KEY AUTOINCREMENT,  
    vocabulary TEXT NOT NULL UNIQUE,
    checked INTEGER DEFAULT 0
  );`
  const stmt = db.prepare(sql)
  const res = stmt.run()
  console.log('vocabulary table', res)
}

const createText = (db) => {
  const sql = `CREATE TABLE text (
    id INTEGER PRIMARY KEY AUTOINCREMENT,  
    vid INTEGER NOT NULL,
    text TEXT NOT NULL UNIQUE,
    FOREIGN KEY("vid") REFERENCES "vocabulary"("id")
  );`
  const stmt = db.prepare(sql)
  const res = stmt.run()
  console.log('text table', res)
}

// createTab(db)
createVocabulary(db)
createText(db)