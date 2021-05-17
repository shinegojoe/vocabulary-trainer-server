var express = require('express')
const connect = require('../dbHelper')
var router = express.Router()


// const Database = require('better-sqlite3')
const apiString = '/vocabulary'

router.get(apiString, (req, res, next) => {
  let db
  try {
    // db = new Database('vocabulary.db', { verbose: console.log })
    db = connect()
    const sql = `SELECT * from vocabulary`
    const stmt = db.prepare(sql);
    const resp = stmt.all(req.query)
    res.json(resp)

  } catch(e) {
    console.log(e)
  } finally {
    db.close()
  }
})

router.post(apiString, (req, res, next) => {
  let db
  // db = new Database('vocabulary.db', { verbose: console.log })
  db = connect()

  try {

    const sql = `INSERT OR IGNORE INTO vocabulary(vocabulary) VALUES ($vocabulary)`
    const stmt = db.prepare(sql)
    const resp = stmt.run(req.body)

    res.json({
      res: resp
    })
  } catch (e) {
    console.log(e)
  } finally {
    db.close()
  }
})

router.patch(`${apiString}/checked`, (req, res, next) => {
  let db
  // db = new Database('vocabulary.db', { verbose: console.log })
  db = connect()

  try {

    const sql = `UPDATE vocabulary SET checked = $checked WHERE id = $id`
    const stmt = db.prepare(sql)
    const resp = stmt.run(req.body)

    res.json({
      res: resp
    })
  } catch (e) {
    console.log(e)
  } finally {
    db.close()
  }
})

router.delete(`${apiString}/:id`, (req, res, next) => {
  //vid
  let db
  console.log('del', req.params)
  // db = new Database('vocabulary.db', { verbose: console.log })
  db = connect()

  try {
    const sql2 = `DELETE from text WHERE vid=$vid`
    const stmt2 = db.prepare(sql2)
    const _ = stmt2.run({
      vid: req.params.id
    })

    const sql = `DELETE from vocabulary WHERE id=$id`
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