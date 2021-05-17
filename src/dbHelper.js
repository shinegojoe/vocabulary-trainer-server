const Database = require('better-sqlite3')
const db_path  = process.env.DB_PATH


const connect = () => {
  const db = new Database(db_path, { verbose: console.log })
  return db
}

module.exports = connect
