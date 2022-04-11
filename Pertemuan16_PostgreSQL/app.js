// memanggil express module
const express = require('express')
// memanggil express library
const app = express()
// memanggil database
const pool = require("./db")

app.use(express.json()) //req.body

// port untuk server
const port = 3000

// insert database
app.get('/addasync', async (req,res) => {
    try{
        const name = "Theodore"
        const mobile = "08789555468"
        const email = "theodore@gmail.com"
        const newContact = await pool.query(`INSERT INTO contacts VALUES ('${name}','${mobile}','${email}') RETURNING *`)
        res.json(newContact)
    } catch(err){
        console.error(err.message)
    }
})

// list data
app.get('/list', async(req,res) => {
    try {
        const listContact = await pool.query('SELECT * FROM contacts')
        res.json(listContact.rows)
    } catch (err){
        console.error(err.message)
    }
})

// memanggil server
app.listen(port, () => {        // server pada port yang ditentukan
    console.log(`Example app listening on port ${port}`)  // menampilkan ke client melalui console
  })
