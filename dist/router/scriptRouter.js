var express = require('express')
var router = express.Router()
const connect = require('../dbHelper')

const Database = require('better-sqlite3')
const apiString = '/script'

router.get(apiString, (req, res, next)=> {
    let db
    try {
        console.log(req.query)
        // db = new Database('vocabulary.db', { verbose: console.log })
        db = connect()

        // const sql = `SELECT * from vocabulary WHERE text LIKE '%${req.query.word}' AND name = $name`
        const sql = `SELECT * from script WHERE instr(text, $word)>1 AND name = $name LIMIT 3`

        // const sql = `SELECT * from vocabulary`

        const stmt = db.prepare(sql);
        const resp = stmt.all(req.query)
        res.json({
            res: resp
        })
    } catch(e) {
        console.log(e)
    } finally {
        db.close()
    }
   
})

router.post(apiString, (req, res, next)=> {
    let db
    try {
        console.log(req.body)
        console.log(req.query)
        console.log(req.params)
        // db = new Database('vocabulary.db', { verbose: console.log })
        db = connect()

        const sql = `INSERT OR IGNORE INTO script(name, text) VALUES ($name, $text)`
        const stmt =db.prepare(sql)
        const resp = stmt.run(req.body)
        res.json({
            res: resp
        })
    } catch(e) {
        console.log(e)
    } finally {
        db.close()
    }
})

module.exports = router