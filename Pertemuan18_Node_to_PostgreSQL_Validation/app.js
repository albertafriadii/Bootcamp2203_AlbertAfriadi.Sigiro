const express = require('express') //module express
const expressLayouts = require('express-ejs-layouts') //module express layouts
const path = require('path')    // module path

const app = express() // memanggil fungsi express
const port = 3000
const pool = require('./db')

const {checkDelete} = require('./model/contacts')

// module express-validator
const {body, check, validationResult} = require('express-validator')

// Setup EJS
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(expressLayouts)
app.use('/public',express.static(path.join(__dirname, 'public')))
app.set('layout', './layouts/full-width')
app.use(express.urlencoded({extended: true}))

// halaman home
app.get('/', (req, res) => {    // routing page

    const author = "Albert Afriadi Sigiro"

    res.locals.title = "Home"       // menampilkan title
    res.render('index', {
        author: author,
    })      // response untuk dikembalikan ke client
})

// halaman about
app.get('/about', (req, res) => {   // routing page
    res.locals.title = "About"      // menampilkan title
    res.render('about')   // response untuk dikembalikan ke client
})

// halaman contact
app.get('/contact', async(req,res) => {
    try{
        const listContact = await pool.query('SELECT * FROM contacts')
        // res.json(listContact.rows)
        res.render('contact', {
            title: "Contact",
            cont: listContact.rows,
            listContact,
        })
    } catch (err){
        console.error(err.message)
    }
})

// tambah contact
app.get('/addContact', async(req,res) => {
    res.render('addContact', {
        title: "Tambah Contact",
    })
})

app.post('/contact', [
    // validasi cek nama apakah ada yang sama atau tidak
    body('name').custom(async(value) => {
        const duplicateName = await pool.query(`SELECT * FROM contacts WHERE name = '${value}'`)
        if(duplicateName.rowCount > 0){
            throw new Error('Nama kontak sudah ada!')
        } else {
            return true
        }
    }),
    // validasi untuk email dan mobile
   check('email', 'Format email yang dimasukkan salah!').isEmail(),
   check('mobile', 'Nomor yang dimasukkan salah!' ).isMobilePhone('id-ID'),
],async(req,res) => {
    const errors = validationResult(req)
    // mencari validasi error
    if(!errors.isEmpty()){
    res.render('addContact', {
        errors: errors.array(),
        title: "Form Tambah Data",
    })
    } else {
        const {name, mobile, email} = req.body
        await pool.query(`INSERT INTO contacts VALUES ('${name}','${mobile}','${email}') RETURNING *`)
        res.redirect('/contact')
    }
})

// detail contact
app.get('/detail/:name', async(req,res) => {
    try{
        const name = req.params.name
        const {rows: detailContact} = await pool.query(`SELECT * FROM contacts WHERE name = '${name}'`)
        detailContact.map(det => {
            res.render('detail', {
                title: "Detail Contact",
                detailContact,
                det,
            })
        })
    } catch (err){
        console.error(err.message)
    }
})

// delete contact
app.get('/contact/delete/:name', async(req,res) => {
    try {
        const name = req.params.name
        await pool.query(`DELETE FROM contacts WHERE name = '${name}'`)
        res.redirect('/contact')
    } catch (err) {
        console.error(err.message)
    }
})

// update contact
app.get('/contact/edit/:name', async(req,res) => {
    try{
        const name = req.params.name
        const {rows: detailContact} = await pool.query(`SELECT * FROM contacts WHERE name = '${name}'`)
        detailContact.map(det => {
            res.render('editContact', {
                title: "Edit Contact",
                detailContact,
                det,
            })
        })
    } catch (err){
        console.error(err.message)
    }
})

app.post('/contact/edit',[
    // validasi cek nama apakah ada yang sama atau tidak
    body('name').custom(async(value, {req}) => {
        const duplicateName = await pool.query(`SELECT * FROM contacts WHERE name = '${value}'`)
        if(value === req.body.oldData){
            return true
        } else if(duplicateName.rowCount > 0) {
            throw new Error('Nama kontak sudah ada!')
        } else {
            return true
        }
    }),
    // validasi untuk email dan mobile
   check('email', 'Format email yang dimasukkan salah!').isEmail(),
   check('mobile', 'Nomor yang dimasukkan salah!' ).isMobilePhone('id-ID'),
],async(req,res) => {
    const errors = validationResult(req)
    // mencari validasi error
    if(!errors.isEmpty()){
    res.render('editContact', {
        errors: errors.array(),
        title: "Edit Contact",
        det: req.body,
    })
    } else {
        const {oldData, name, mobile, email} = req.body
        await pool.query(`UPDATE contacts 
        SET name = '${name}', mobile = '${mobile}', email = '${email}' 
        WHERE name = '${oldData}'`)
        res.redirect('/contact')
    }
})

// multiple delete
app.post('/contact/checkbox',(req,res) => {
    const { checkboxDelete } = req.body

    if (Array.isArray(checkboxDelete)) {
        checkboxDelete.forEach(contact => {
            checkDelete(contact)
            res.redirect('/contact')
        })
    } else {
        checkDelete(contact)
        res.redirect('/contact')
    }
})

// listening port / port yang digunakan sebagai server
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
