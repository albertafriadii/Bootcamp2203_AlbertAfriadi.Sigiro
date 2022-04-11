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
        const name = "Asep"
        const mobile = "08789555468"
        const email = "asep@gmail.com"
        const newContact = await pool.query(`INSERT INTO contacts VALUES ('${name}','${mobile}','${email}') RETURNING *`)
        res.json(newContact.rows)
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

// detail data
app.get('/detail/:name', async(req,res) => {
    
    // menentukan paramater untuk url
    const name = (req.params.name)
    
    try {
        const detailContact = await pool.query(`SELECT * FROM contacts WHERE name = '${name}'`)
        res.json(detailContact.rows)
    } catch (err){
        console.error(err.message)
    }
})

// delete data
app.get('/delete/:name', async(req,res) => {
    
    // menentukan paramater untuk url
    const name = (req.params.name)
    
    try {
        const deleteContact = await pool.query(`DELETE FROM contacts WHERE name = '${name}'`)
        res.redirect('/list')
    } catch (err){
        console.error(err.message)
    }
})

// function update data
// const updateContact = async (name, mobile, email) => {
//     const updateQuery = `UPDATE contacts 
//              SET mobile = '${mobile}', email = '${email}' 
//              WHERE name = '${name}'`

//     try {
//         await pool.query(updateQuery, [name, mobile, email])
//     } catch(err) {
//         console.error(err.message)
//     }
// }

// update data
app.get('/update/:name', async (req,res) => {
    try{
        const name = "Theodore"
        const mobile = "089888790663"
        const email = "theo@gmail.com"
        const updateContact = await pool.query
        (`UPDATE contacts 
            SET mobile = '${mobile}', email = '${email}' 
            WHERE name = '${name}'`)
        // res.json(updateContact.rows)
        res.redirect('/list')
    } catch(err){
        console.error(err.message)
    }
})

// memanggil server
app.listen(port, () => {        // server pada port yang ditentukan
    console.log(`Example app listening on port ${port}`)  // menampilkan ke client melalui console
  })
