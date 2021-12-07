const express = require('express')
const https = require('https')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const mysql = require('mysql')
const cors = require('cors')

const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

//----------------------------------------MySql---------------------------------------------
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'my_diary',
})

db.connect((err) => {
  if (err) {
    throw err
  }
  console.log('Mysql connected')
})
//----------------------------------------Register---------------------------------------------
app.post('/register', async (req, res) => {
  try {
    const { name, email } = req.body
    let userIdentity = {
      name: name,
      email: email,
      password: Math.floor(100000 + Math.random() * 900000),
    }
    if (!name || !email) {
      console.log('fill data')
      res.status(422).send({ error: 'Please Fill the data', status: 422 })
    } else {
      let sql = 'SELECT * FROM user where email=?'
      db.query(sql, email, async (err, result) => {
        if (err) throw err
        if (result.length > 0) {
          res.status(400).send({ error: 'Email Already Exists', status: 400 })
        } else {
          let sql = 'INSERT INTO user SET ?'
          db.query(sql, userIdentity, async (err, result) => {
            if (err) throw err
            res.status(200).send({ status: 200 })
          })
        }
      })
    }
  } catch (error) {
    //throw error
    res.status(502).send({ error: 'Failed To Register', status: 502 })
  }
})
//----------------------------------------LogIn---------------------------------------------
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body
    if (!email || !password) {
      res.status(422).send({ status: 422, error: 'Please Fill the data' })
    } else {
      let sql = 'SELECT * From user WHERE email = ? and password = ?'
      db.query(sql, [email, password], async (err, result) => {
        if (err) {
          res.status(400).send({ status: 400, error: 'Invalid Credentials' })
        }
        if (result.length > 0) {
          let data = JSON.stringify(result[0].id)
          const secret = 'MYNAMEISSULAGNAGHOSH'
          let now = Math.floor(Date.now() / 1000),
            iat = now - 10,
            expiresIn = 36000,
            //expr = now + expiresIn,
            jwtId = Math.random().toString(36).substring(7)

          let payload = {
            iat: iat,
            jwtid: jwtId,
            audience: 'TEST',
            data: data,
          }
          jwt.sign(
            payload,
            secret,
            { algorithm: 'HS256', expiresIn: expiresIn },
            async (err, token) => {
              if (err) throw err
              else {
                res.status(200).send({ status: 200, jwt: token })
              }
            }
          )
        } else {
          res.status(400).send({ status: 400, error: 'Invalid Credentials' })
        }
      })
    }
  } catch (error) {
    res.status(502).send({ error: 'Failed To Login', status: 502 })
  }
})

//----------------------------------------Authentication---------------------------------------------
let userData = ''
let isowner = ''
const auth = async (req, res, next) => {
  try {
    console.log('auth part')
    console.log(req.headers.authorization)
    const authToken = req.headers.authorization
    const verifyUser = jwt.verify(authToken, 'MYNAMEISSULAGNAGHOSH')
    isowner = true
    userData = verifyUser.data
    console.log(userData)
    next()
  } catch (error) {
    isowner = false
    res.status(400).send({ error: error, status: 400 })
  }
}
//----------------------------------------Calender Validation---------------------------------------------
let date = ''
app.get('/Calender', auth, async (req, res) => {
  try {
    let sql =
      'SELECT diary.date,diary.note, diaryuser.userid, diaryuser.isowner FROM diaryuser INNER JOIN diary ON diary.id=diaryuser.tableid WHERE userid=? and isowner=1'
    db.query(sql, userData, (err, result) => {
      if (err) throw err
      console.log(result)
      res.status(200).send({ status: 200, data: JSON.stringify(result) })
    })
    // })
  } catch (error) {
    console.log('error block')
    res.status(400).send({ status: 400, error: error })
  }
})
app.post('/Calender', auth, async (req, res) => {
  try {
    date = req.body.today
    res.status(200).send({ status: 200, data: date })
  } catch (error) {
    res.status(400).send({ status: 400, error: error })
  }
})
//----------------------------------------Diary Validation---------------------------------------------

app.get('/Diary/:date', auth, async (req, res) => {
  try {
    console.log('Entered')
    console.log(date)
    let sql =
      'SELECT diary.date,diary.note, diaryuser.tableid, diaryuser.userid, diaryuser.isowner FROM diaryuser INNER JOIN diary ON diary.id=diaryuser.tableid WHERE userid=? and isowner=1 and date=?'
    db.query(sql, [userData, date], (err, result) => {
      if (err) throw err
      console.log(result)
      res
        .status(200)
        .send({ status: 200, data: JSON.stringify(result), date: date })
    })
  } catch (error) {
    res.status(400).send({ error: err, status: 400 })
  }
})

let tableid1 = ''
let userid1 = ''
app.post('/Diary/:date', auth, async (req, res) => {
  try {
    const { note, date } = req.body

    let diaryNote = {
      note: note,
      date: date,
    }

    if (!note || !date) {
      res.status(422).send({ status: 422, error: 'Please Fill the data' })
    } else {
      let sql = 'INSERT INTO diary SET ? '
      db.query(sql, diaryNote, (err, result) => {
        if (err) throw err
        let diaryuser = {
          tableid: result.insertId,
          userid: userData,
          isowner: isowner,
        }
        let sql = 'INSERT INTO diaryuser SET ?'

        db.query(sql, diaryuser, (err, result) => {
          console.log(result)
          if (err) throw err
          let sql =
            'SELECT diary.date,diary.note,diaryuser.tableid, diaryuser.userid, diaryuser.isowner FROM diaryuser INNER JOIN diary ON diary.id=diaryuser.tableid WHERE userid = ? and isowner=?'
          db.query(sql, [userData, 1], (err, result) => {
            if (err) throw err

            console.log('result is ' + result)
            res.status(200).send({
              status: 200,
              data: JSON.stringify(result),
              error: 'Data Inserted',
            })
          })
        })
      })
    }
  } catch (error) {
    res.status(400).send({ error: error, status: 400 })
  }
})
app.post('/Diary/:date/email', auth, (req, res) => {
  try {
    let sql = 'SELECT email FROM user'
    db.query(sql, (err, result) => {
      if (err) {
        res.status(404).send({
          status: 404,
          error: 'Email Not Found',
        })
      } else {
        res.status(200).send({
          status: 200,
          data: result,
        })
      }
    })
  } catch (error) {
    res.status(400).send({ error: error, status: 400 })
  }
})
app.post('/Diary/:date/delete', auth, async (req, res) => {
  try {
    const { note, date } = req.body
    let sql = 'DELETE FROM diary WHERE date=? and note=?'
    db.query(sql, [date, note], (err, result) => {
      if (err) throw err
      res.status(200).send({
        status: 200,
        error: 'Data Deleted',
      })
    })
  } catch (error) {
    res.status(400).send({ error: error, status: 400 })
  }
})
app.get('/Diary/:date/update', auth, async (req, res) => {
  console.log('before share')
  try {
    let sql = 'SELECT * from diaryuser where isowner=0 and userid=?'
    db.query(sql, userData, (err, result) => {
      console.log('share part')
      if (err) {
        console.log(err)
        res.status(201).send({ data: 'No Data', status: 201 })
      }
      let sql =
        'SELECT date,note,name FROM diaryuser A, diaryuser B INNER JOIN diary ON diary.id=B.tableid INNER JOIN user ON user.id=B.userid Where A.tableid=B.tableid and A.isowner=0 and A.userid=? and B.isowner=1 '
      db.query(sql, userData, (err, result) => {
        console.log('self join part')
        console.log(result)
        res.status(200).send({
          data: JSON.stringify(result),
          status: 200,
        })
        console.log('sharing info')
      })
    })
  } catch (error) {
    res.status(400).send({ error: error, status: 400 })
  }
})
app.post('/Diary/:date/share', auth, async (req, res) => {
  try {
    console.log(req.body)
    const { note, date, tableid, userid, isowner, shareperson } = req.body

    if (!shareperson) {
      res.status(422).send({ status: 422, error: 'Please Fill the data' })
    } else {
      let sql = 'SELECT * from user where email=?'
      db.query(sql, shareperson, (err, result) => {
        if (err) {
          res.status(404).send({ status: 404, error: 'Email Not Found' })
        }
        console.log('share info')

        console.log(result)
        let shareinfo = {
          tableid: tableid,
          userid: result[0].id,
          isowner: false,
        }
        let sql = 'INSERT INTO diaryuser SET ? '
        db.query(sql, shareinfo, (err, result) => {
          if (err) throw err
          res.status(200).send({ status: 200, error: 'Shared' })
        })
      })
    }
  } catch (error) {
    res.status(400).send({ error: error, status: 400 })
  }
})
//----------------------------------------Listen---------------------------------------------
app.listen(5000, () => {
  console.log('server is listening on port 5000...')
})
