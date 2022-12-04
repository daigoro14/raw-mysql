const express = require('express')
const mysql = require('mysql2');
const cors = require('cors')

const app = express()
const PORT = process.env.PORT || 8080;


const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'impl-mysql'
  });


app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use(cors())

app.post('/inputValue', (req, res) => {
    const inputValue = req.body.valueInput
    const sqlInsert = "INSERT INTO Messages (message) VALUES (?)"

    db.query(sqlInsert, inputValue, (err, result) => {
        console.log(err)
    })
})

app.get('/messages', function (req, res) {
    const sqlSelect = "SELECT * FROM Messages"
    db.query(sqlSelect)
  })

app.listen(PORT, console.log(`Server started on port ${PORT}`));