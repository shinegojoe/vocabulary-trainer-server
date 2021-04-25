var express = require('express')
var router = express.Router()

const Database = require('better-sqlite3')


router.get('/xxx', (req, res, next)=> {
    let db
    try {
        console.log(req.query)
        db = new Database('vocabulary.db', { verbose: console.log })
        // const sql = `SELECT * from vocabulary WHERE text LIKE '%${req.query.word}' AND name = $name`
        const sql = `SELECT * from vocabulary WHERE instr(text, $word)>1 AND name = $name`

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

router.post('/add', (req, res, next)=> {
    let db
    try {
        console.log(req.body)
        console.log(req.query)
        console.log(req.params)
        db = new Database('vocabulary.db', { verbose: console.log })
        const sql = `INSERT OR IGNORE INTO vocabulary(name, text) VALUES ($name, $text)`
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