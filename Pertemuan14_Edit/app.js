const express = require('express')  //module express
const expressLayouts = require('express-ejs-layouts')
const app = express()           // menjadikan module express jadi function
const port = 3000               // port untuk server
const path = require('path')    // module path
const morgan = require('morgan') // module morgan
const contacts = require('./views/contacts'); // call contacts.js

const {body, check, validationResult} = require('express-validator')

app.use(morgan('dev'))

app.use(express.urlencoded({extended: true}))

// informasi menggunakan ejs
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

// templating engine
app.use(expressLayouts)
app.use('/public',express.static(path.join(__dirname, 'public')))
app.set('layout', './layouts/full-width')


// menampilkan waktu dari 1 januari 1970 sampai sekarang
app.use((req, res, next) => {
    console.log('Time:', Date.now())
    next()
  })

app.get('/', (req, res) => {    // routing page

    const author = "Albert Afriadi Sigiro"

    res.locals.title = "Home"       // menampilkan title
    res.render('index', {
        author: author,
    })      // response untuk dikembalikan ke client
})


app.get('/about', (req, res) => {   // routing page
    res.locals.title = "About"      // menampilkan title
    res.render('about')   // response untuk dikembalikan ke client
})

app.get('/contact', (req, res) => {     // routing page
    
    // mengambil data json
    const cont = contacts.loadContact()

    res.locals.title = "Contact"        // menampilkan title
    res.render('contact', {
        cont,
    })     // response untuk dikembalikan ke client
})

app.get('/detail/:name', (req, res) => {
    
    // memanggil fungsi detail kontak berdasarkan nama
    const det = contacts.detailContact(req.params.name)

    res.locals.title = "Detail Contact"
    res.render('detail', {
        det,
    })
})

app.get('/contact/edit/:name', (req,res)=> {
   const det = contacts.detailContact(req.params.name)
   
   res.locals.title = "Edit Data"
   res.render('editContact', {
       det,
   })
})

app.post('/contact/edit', [
    // validasi cek nama apakah ada yang sama atau tidak
    body('name').custom((value, { req }) => {
        const duplicateName = contacts.duplicate(value)
        if(value !== req.body.oldData && duplicateName){
            throw new Error('Nama kontak sudah ada!')
        } else {
            return true
        }
    }),

    // validasi untuk email dan mobile
   check('email', 'Format email yang dimasukkan salah!').isEmail(),
   check('mobile', 'Nomor yang dimasukkan salah!' ).isMobilePhone(),
], (req, res) => {
    // mencari validasi error
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        res.locals.title = "Form Edit Data"
        res.render('editContact', {
            errors: errors.array(),
            det: req.body,
        })
    } else {        
        contacts.updateContact(req.body)
        // console.log(req.body)
        res.redirect('/contact')
    }
})

app.get('/addContact', (req, res) => {
    res.locals.title = 'Tambah Data'
    res.render('addContact')
})

app.get('/contact/delete/:name', (req,res) => {
    
    // fungsi delete
    const det = contacts.detailContact(req.params.name)

    if (!det) {
        res.status(404)
        res.send('404 ||| ERROR!!!')
    } else {
        contacts.deleteContact(req.params.name)
        res.redirect('/contact')
    }
})

app.post('/contact', [
    // validasi cek nama apakah ada yang sama atau tidak
    body('name').custom((value) => {
        const duplicateName = contacts.duplicate(value)
        if(duplicateName){
            throw new Error('Nama kontak sudah ada!')
        } else {
            return true
        }
    }),

    // validasi untuk email dan mobile
   check('email', 'Format email yang dimasukkan salah!').isEmail(),
   check('mobile', 'Nomor yang dimasukkan salah!' ).isMobilePhone(),
], (req, res) => {
    // mencari validasi error
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        res.locals.title = "Form Tambah Data"
        res.render('addContact', {
            errors: errors.array()
        })
    } else {        
        contacts.addContact(req.body)
        res.redirect('/contact')
    }
})

app.use('/', (req, res) => {    // routing page
    res.status(404)             // menentukan status page
    res.send('Page not found')  // response untuk dikembalikan ke client
})

app.listen(port, () => {        // server pada port yang ditentukan
  console.log(`Example app listening on port ${port}`)  // menampilkan ke client melalui console
})