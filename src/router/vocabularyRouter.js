var express = require('express')
var router = express.Router()

const Database = require('better-sqlite3')


router.get('/', (req, res, next) => {
  let db
  try {
    db = new Database('vocabulary.db', { verbose: console.log })
    const sql = `SELECT * from vocabulary`
    const stmt = db.prepare(sql);
    const resp = stmt.all(req.query)
    res.json(resp)

  } catch(e) {
    console.log(e)
  } finally {
    db.close()
  }
  // try {
  //   const data = new Map()
  //   console.log(req.query)
  //   db = new Database('vocabulary.db', { verbose: console.log })
  //   // const sql = `SELECT * from vocabulary WHERE text LIKE '%${req.query.word}' AND name = $name`
  //   const sql = `SELECT * from vocabulary INNER JOIN text ON vocabulary.id=text.vid`
  //   const stmt = db.prepare(sql);
  //   const resp = stmt.all(req.query)
    
  //   for(const item of resp) {
  //     console.log(item)
  //     const x = data.get(item.vocabulary)
  //     console.log(x)
  //     if(x === undefined) {
  //       data.set(item.vocabulary, [{
  //         text: item.text,
  //         id: item.id
  //       }])
  //     } else {
  //       const qq = data.get(item.vocabulary)
  //       console.log('qq', qq)
  //       qq.push({
  //         text: item.text,
  //         id: item.id
  //       })
  //     }
  //   }
  //   console.log('data', data)
  //   // const obj = Object.fromEntries(data);
  //   resList = []
  //   for (var [key, value] of data.entries()) {
  //     const item = {
  //       vocabulary: key,
  //       textList: value
  //     }
  //     resList.push(item)
  //   }



  //   res.json({
  //     res: resList
  //   })

  // } catch (e) {
  //   console.log(e)
  // } finally {
  //   db.close()
  // }

})

router.post('/', (req, res, next) => {
  let db
  db = new Database('vocabulary.db', { verbose: console.log })
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

router.patch('/updateChecked', (req, res, next) => {
  let db
  db = new Database('vocabulary.db', { verbose: console.log })
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

router.delete('/:id', (req, res, next) => {
  //vid
  let db
  console.log('del', req.params)
  db = new Database('vocabulary.db', { verbose: console.log })
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