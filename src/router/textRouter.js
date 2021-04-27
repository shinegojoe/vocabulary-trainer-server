var express = require('express')
var router = express.Router()

const Database = require('better-sqlite3')

router.get('/', (req, res, next)=> {
  let db
  db = new Database('vocabulary.db', { verbose: console.log })
  try {
    const sql = `SELECT * from text WHERE vid=$vid`
    const stmt =db.prepare(sql)
    const resp = stmt.all(req.query)
    res.json(resp)
  } catch(e) {
    console.log(e)
  } finally {
    db.close()
  }
})


router.post('/', (req, res, next)=> {
    let db
    db = new Database('vocabulary.db', { verbose: console.log })
    try {
      
      const sql = `INSERT OR IGNORE INTO text(vid, text) VALUES ($vid, $text)`
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


router.delete('/:id', (req, res, next)=> {
  //vid
  let db
  console.log('del', req.params)
  db = new Database('vocabulary.db', { verbose: console.log })
  try {
    const sql = `DELETE from text WHERE id=$id`
    const stmt =db.prepare(sql)
    const resp = stmt.run({
      id: req.params.id
    })

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